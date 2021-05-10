import requiredParam from "../../helpers/required-param";
//include the company validations
export default function createCompany(
  companyInfo = requiredParam("companyInfo")
) {
  const validCompany = validate(companyInfo);
  return Object.freeze(validCompany);

  function validate({
    companyName = requiredParam("companyName"),
    companyAddress = requiredParam("companyAddress"),
    companyPhoneNo = requiredParam("companyPhoneNo"),
    ...otherInfo
  } = {}) {
    return {
      companyName,
      companyAddress,
      companyPhoneNo,
      ...otherInfo,
    };
  }
}
