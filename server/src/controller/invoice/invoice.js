import requiredParam from "../../helpers/required-param";
//include the invoice validations
export default function createInvoice(
  invoiceInfo = requiredParam("invoiceInfo")
) {
  const validInvoice = validate(invoiceInfo);
  return Object.freeze(validInvoice);

  function validate({
    date = requiredParam("date"),
    title = requiredParam("title"),
    remarks = requiredParam("remarks"),
    totalQty = requiredParam("totalQty"),
    totalAmount = requiredParam("totalAmount"),
    totalItems = requiredParam("totalItems"),
    tableRows = requiredParam("tableRows"),
    merchantName = requiredParam("merchantName"),
    merchantAddress = requiredParam("merchantAddress"),
    merchantPhoneNo1 = requiredParam("merchantPhoneNo1"),
    merchantPhoneNo2 = requiredParam("merchantPhoneNo2"),
    state = requiredParam("state"),
    gstIn = requiredParam("gstIn"),
    paymentType = requiredParam("paymentType"),
    weight = requiredParam("weight"),
    transport = requiredParam("transport"),
    transportDetails = requiredParam("transportDetails"),
    shippedTo = requiredParam("shippedTo"),
    ...otherInfo
  } = {}) {
    return {
      date,
      title,
      remarks,
      totalQty,
      totalAmount,
      totalItems,
      tableRows,
      merchantName,
      merchantAddress,
      merchantPhoneNo1,
      merchantPhoneNo2,
      state,
      gstIn,
      paymentType,
      weight,
      transport,
      transportDetails,
      shippedTo,
      ...otherInfo,
    };
  }
}
