import requiredParam from "../../helpers/required-param";
//include the purchase validations
export default function createPurchase(
  purchaseInfo = requiredParam("purchaseInfo")
) {
  const validPurchase = validate(purchaseInfo);
  return Object.freeze(validPurchase);

  function validate({
    date = requiredParam("date"),
    title = requiredParam("title"),
    remarks = requiredParam("remarks"),
    totalQty = requiredParam("totalQty"),
    totalAmount = requiredParam("totalAmount"),
    totalItems = requiredParam("totalItems"),
    tableRows = requiredParam("tableRows"),
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
      ...otherInfo,
    };
  }
}
