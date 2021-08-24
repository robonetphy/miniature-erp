import requiredParam from "../../helpers/required-param";
//include the merchant validations
export default function createMerchant(
  merchantInfo = requiredParam("merchantInfo")
) {
  const validMerchant = validate(merchantInfo);
  return Object.freeze(validMerchant);

  function validate({
    merchantName = requiredParam("merchantName"),
    merchantAddress = requiredParam("merchantAddress"),
    merchantPhoneNo1 = requiredParam("merchantPhoneNo1"),
    merchantPhoneNo2 = requiredParam("merchantPhoneNo2"),
    email = requiredParam("email"),
    panNo = requiredParam("panNo"),
    state = requiredParam("state"),
    gstIn = requiredParam("gstIn"),
    ...otherInfo
  } = {}) {
    return {
      merchantName,
      merchantAddress,
      merchantPhoneNo1,
      merchantPhoneNo2,
      email,
      panNo,
      state,
      gstIn,
      ...otherInfo,
    };
  }
}
