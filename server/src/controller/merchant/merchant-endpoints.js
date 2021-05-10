import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} from "../../helpers/errors";
import generateHttpError from "../../helpers/http-error";
import createMerchant from "./merchant";

export default function createMerchantEndpointHandler({ merchantOperations }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postMerchant(httpRequest);

      case "GET":
        return getMerchant(httpRequest);

      case "DELETE":
        return deleteMerchant(httpRequest);

      case "PATCH":
        return patchMerchant(httpRequest);

      default:
        return generateHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getMerchant(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = id
      ? await merchantOperations.findById({ merchantId: id })
      : await merchantOperations.getItems();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postMerchant(httpRequest) {
    let merchantInfo = httpRequest.body;
    if (!merchantInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        merchantInfo = JSON.parse(merchantInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const merchant = createMerchant(merchantInfo);
      const result = await merchantOperations.add(merchant);
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

  async function deleteMerchant(httpRequest) {
    let merchantInfo = httpRequest.body;
    if (!merchantInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No DELETE body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        merchantInfo = JSON.parse(merchantInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. DELETE body must be valid JSON.",
        });
      }
    }
    if (!merchantInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. DELETE body must have valid key.",
      });
    }
    const result = await merchantOperations.remove(merchantInfo);
    console.log(result);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }

  async function patchMerchant(httpRequest) {
    let merchantInfo = httpRequest.body;
    if (!merchantInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PATCH body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        merchantInfo = JSON.parse(merchantInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PATCH body must be valid JSON.",
        });
      }
    }

    if (!merchantInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. PATCH body must have valid key.",
      });
    }
    const merchant = createMerchant(merchantInfo);
    const result = await merchantOperations.update(merchant);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }
}
