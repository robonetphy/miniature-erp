import React from "react";
import CustomModal from "../modal";
import CustomTable from "../table";
const dataGenerator = (data, length) => {
  var dummy = [];
  for (var i = 0; i < length; i++) {
    dummy.push(data);
  }
  return dummy;
};
const CompanyTable = (props) => {
  const callBack = (data) => {
    props.onCompanyDataSelect(data);
  };
  return (
    <CustomModal
      showModal={props.showCompanyTable}
      closeModal={props.closeModal}
      modalTitle="Company Table"
      ModalType={(props) => (
        <CustomTable
          {...{
            columns: ["Company", "Address", "Phone No1"],
            data: [
              ...dataGenerator(["ABC", "asdasfasddasdas", "+912123123123"], 56),
            ],
            title: "Company",
            isSearchEnable: true,
            fixedHeader: true,
            tableBodyHeight: "450px",
            editCallback: callBack,
          }}
        />
      )}
      modalWidth="60vw"
      modalHeight="70vh"
    ></CustomModal>
  );
};
export default CompanyTable;
