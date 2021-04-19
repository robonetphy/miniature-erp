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
const MerchantTable = (props) => {
  const callBack = (data) => {
    console.log(data);
    props.onMerchantDataSelect(data);
  };
  return (
    <CustomModal
      showModal={props.showMerchantTable}
      closeModal={props.closeModal}
      modalTitle="Merchant Table"
      ModalType={() => (
        <CustomTable
          {...{
            columns: ["Company", "Address", "Phone No1", "Phone No2"],
            data: [
              ...dataGenerator(
                ["ABC", "asdasfasddasdas", "+912123123123", "+912123123123"],
                56
              ),
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
export default MerchantTable;
