import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} from "../../helpers/errors";
import generateHttpError from "../../helpers/http-error";
import createStock from "./stock";

export default function createStockEndpointHandler({ stockOperations }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postStock(httpRequest);

      case "GET":
        return getStock(httpRequest);

      case "DELETE":
        return deleteStock(httpRequest);

      case "PATCH":
        return patchStock(httpRequest);

      default:
        return generateHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getStock(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = id
      ? await stockOperations.findById({ stockId: id })
      : await stockOperations.getItems();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postStock(httpRequest) {
    let stockInfo = httpRequest.body;
    if (!stockInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        stockInfo = JSON.parse(stockInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const stock = createStock({ ...stockInfo, qty: 0 });
      const result = await stockOperations.add(stock);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return generateHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }

  async function deleteStock(httpRequest) {
    let stockInfo = httpRequest.body;
    if (!stockInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No DELETE body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        stockInfo = JSON.parse(stockInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. DELETE body must be valid JSON.",
        });
      }
    }
    if (!stockInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. DELETE body must have valid key.",
      });
    }
    const result = await stockOperations.remove(stockInfo);
    console.log(result);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }

  async function patchStock(httpRequest) {
    let stockInfo = httpRequest.body;
    if (!stockInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PATCH body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        stockInfo = JSON.parse(stockInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PATCH body must be valid JSON.",
        });
      }
    }

    if (!stockInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. PATCH body must have valid key.",
      });
    }
    const stock = createStock(stockInfo);
    const result = await stockOperations.update(stock);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }
}
