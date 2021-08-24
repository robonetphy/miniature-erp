import requiredParam from "../../helpers/required-param";
//include the stock validations
export default function createStock(
  stockInfo = requiredParam("stockInfo")
) {
  const validStock = validate(stockInfo);
  return Object.freeze(validStock);

  function validate({
    size = requiredParam("size"),
    type = requiredParam("type"),
    hsn = requiredParam("hsn"),
    tileName = requiredParam("tileName"),
    rate = requiredParam("rate"),
    companyName = requiredParam("companyName"),
    qty = requiredParam("qty"),
    ...otherInfo
  } = {}) {
    return {
      size,
      type,
      hsn,
      tileName,
      rate,
      companyName,
      qty,
      ...otherInfo,
    };
  }
}
