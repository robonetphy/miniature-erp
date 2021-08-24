import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} from "../../helpers/errors";
import generateHttpError from "../../helpers/http-error";
import createInvoice from "./invoice";

export default function createInvoiceEndpointHandler({ invoiceOperations }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postInvoice(httpRequest);

      case "GET":
        return getInvoice(httpRequest);

      case "DELETE":
        return deleteInvoice(httpRequest);

      case "PATCH":
        return patchInvoice(httpRequest);

      default:
        return generateHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getInvoice(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = id
      ? await invoiceOperations.findById({ invoiceId: id })
      : await invoiceOperations.getItems();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postInvoice(httpRequest) {
    let invoiceInfo = httpRequest.body;
    if (!invoiceInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        invoiceInfo = JSON.parse(invoiceInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const invoice = createInvoice(invoiceInfo);
      const result = await invoiceOperations.add(invoice);
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

  async function deleteInvoice(httpRequest) {
    let invoiceInfo = httpRequest.body;
    if (!invoiceInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No DELETE body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        invoiceInfo = JSON.parse(invoiceInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. DELETE body must be valid JSON.",
        });
      }
    }
    if (!invoiceInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. DELETE body must have valid key.",
      });
    }
    const result = await invoiceOperations.remove(invoiceInfo);
    console.log(result);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }

  async function patchInvoice(httpRequest) {
    let invoiceInfo = httpRequest.body;
    if (!invoiceInfo) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PATCH body.",
      });
    }

    if (typeof httpRequest.body === "string") {
      try {
        invoiceInfo = JSON.parse(invoiceInfo);
      } catch {
        return generateHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PATCH body must be valid JSON.",
        });
      }
    }

    if (!invoiceInfo.key) {
      return generateHttpError({
        statusCode: 400,
        errorMessage: "Bad request. PATCH body must have valid key.",
      });
    }
    const invoice = createInvoice(invoiceInfo);
    const result = await invoiceOperations.update(invoice);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  }
}
