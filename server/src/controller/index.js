import createDb from "../db";

import createPurchaseOperations from "./purchase/purchase-operations";
import createPurchaseEndpointHandler from "./purchase/purchase-endpoints";

import createBreakageOperations from "./breakage/breakage-operations";
import createBreakageEndpointHandler from "./breakage/breakage-endpoints";

import createCompanyOperations from "./company/company-operations";
import createCompanyEndpointHandler from "./company/company-endpoints";

import createMerchantOperations from "./merchant/merchant-operations";
import createMerchantEndpointHandler from "./merchant/merchant-endpoints";

import createStockOperations from "./stock/stock-operations";
import createStockEndpointHandler from "./stock/stock-endpoints";

import createReturnOperations from "./return/return-operations";
import createReturnEndpointHandler from "./return/return-endpoints";

import createInvoiceOperations from "./invoice/invoice-operations";
import createInvoiceEndpointHandler from "./invoice/invoice-endpoints";

const database = createDb();

const purchaseOperations = createPurchaseOperations({ database });
const purchaseEndpointHandler = createPurchaseEndpointHandler({
  purchaseOperations,
});

const breakageOperations = createBreakageOperations({ database });
const breakageEndpointHandler = createBreakageEndpointHandler({
  breakageOperations,
});

const companyOperations = createCompanyOperations({ database });
const companyEndpointHandler = createCompanyEndpointHandler({
  companyOperations,
});

const merchantOperations = createMerchantOperations({ database });
const merchantEndpointHandler = createMerchantEndpointHandler({
  merchantOperations,
});

const stockOperations = createStockOperations({ database });
const stockEndpointHandler = createStockEndpointHandler({
  stockOperations,
});

const returnOperations = createReturnOperations({ database });
const returnEndpointHandler = createReturnEndpointHandler({
  returnOperations,
});

const invoiceOperations = createInvoiceOperations({ database });
const invoiceEndpointHandler = createInvoiceEndpointHandler({
  invoiceOperations,
});

export {
  purchaseEndpointHandler,
  breakageEndpointHandler,
  companyEndpointHandler,
  merchantEndpointHandler,
  stockEndpointHandler,
  returnEndpointHandler,
  invoiceEndpointHandler,
};
