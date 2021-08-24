import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} from "../../helpers/errors";
import generateHttpError from "../../helpers/http-error";
import createReturn from "./return";

export default function createReturnEndpointHandler({ returnOperations }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postReturn(httpRequest);

      case "GET":
        return getReturn(httpRequest);

      case "DELETE":
        return deleteReturn(httpRequest);

      case "PATCH":
        return patchReturn(httpRequest);

      default:
        return generateHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getReturn(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = id
      ? await returnOperations.findById({ returnId: id })
      : await returnOperations.getItems();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postReturn(httpRequest) {
    let returnInfo = httpRequest.body;
    if (!returnInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        returnInfo = JSON.parse(returnInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const returnIn = createReturn(returnInfo);
      const result = await returnOperations.add(returnIn);
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

  async function deleteReturn(httpRequest) {
    let returnInfo = httpRequest.body;
    if (!returnInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No DELETE body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        returnInfo = JSON.parse(returnInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. DELETE body must be valid JSON.",
        });
      }
    }
    if (!returnInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. DELETE body must have valid key.",
      });
    }
    const result = await returnOperations.remove(returnInfo);
    console.log(result);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }

  async function patchReturn(httpRequest) {
    let returnInfo = httpRequest.body;
    if (!returnInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PATCH body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        returnInfo = JSON.parse(returnInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PATCH body must be valid JSON.",
        });
      }
    }

    if (!returnInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. PATCH body must have valid key.",
      });
    }
    const returnIn = createReturn(returnInfo);
    const result = await returnOperations.update(returnIn);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }
}
