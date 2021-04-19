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
const StockTable = (props) => {
  const callBack = (data) => {
    props.onTileDataSelect(data);
  };
  return (
    <CustomModal
      showModal={props.showStockTable}
      closeModal={props.closeModal}
      modalTitle="Stock Table"
      ModalType={() => (
        <CustomTable
          {...{
            columns: ["Name", "Size", "Company", "Qty", "Type", "Rate", "HNS"],
            data: [
              ...dataGenerator(
                ["T1", "18x12", "ABC", 1000, "abs", 200, "12%"],
                105
              ),
            ],
            title: "Inventory",
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
export default StockTable;
