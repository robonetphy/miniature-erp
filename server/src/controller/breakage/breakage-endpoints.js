import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} from "../../helpers/errors";
import generateHttpError from "../../helpers/http-error";
import createBreakage from "./breakage";

export default function createBreakageEndpointHandler({ breakageOperations }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postBreakage(httpRequest);

      case "GET":
        return getBreakage(httpRequest);

      case "DELETE":
        return deleteBreakage(httpRequest);

      case "PATCH":
        return patchBreakage(httpRequest);

      default:
        return generateHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getBreakage(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = id
      ? await breakageOperations.findById({ breakageId: id })
      : await breakageOperations.getItems();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postBreakage(httpRequest) {
    let breakageInfo = httpRequest.body;
    if (!breakageInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        breakageInfo = JSON.parse(breakageInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const breakage = createBreakage(breakageInfo);
      const result = await breakageOperations.add(breakage);
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

  async function deleteBreakage(httpRequest) {
    let breakageInfo = httpRequest.body;
    if (!breakageInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No DELETE body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        breakageInfo = JSON.parse(breakageInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. DELETE body must be valid JSON.",
        });
      }
    }

    if (!breakageInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. DELETE body must have valid key.",
      });
    }

    const result = await breakageOperations.remove(breakageInfo);
    console.log(result);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }

  async function patchBreakage(httpRequest) {
    let breakageInfo = httpRequest.body;
    if (!breakageInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PATCH body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        breakageInfo = JSON.parse(breakageInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PATCH body must be valid JSON.",
        });
      }
    }

    if (!breakageInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. PATCH body must have valid key.",
      });
    }

    const breakage = createBreakage(breakageInfo);
    const result = await breakageOperations.update(breakage);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }
}
