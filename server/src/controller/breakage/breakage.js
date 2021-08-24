import requiredParam from "../../helpers/required-param";
export default function createBreakage(
  breakageInfo = requiredParam("breakageInfo")
) {
  const validBreakage = validate(breakageInfo);
  return Object.freeze(validBreakage);

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
      tableRows,
      totalItems,
      ...otherInfo,
    };
  }
}
