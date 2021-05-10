import requiredParam from "../../helpers/required-param";
//include the return validations
export default function createReturn(
  returnInfo = requiredParam("returnInfo")
) {
  const validReturn = validate(returnInfo);
  return Object.freeze(validReturn);

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
      ...otherInfo,
    };
  }
}
