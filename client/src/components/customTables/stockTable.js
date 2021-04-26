import React, { useRef } from "react";
import CustomModal from "../modal";
import { v4 as uuidv4 } from "uuid";
import CustomTable from "../table";
import { Grid, Button, makeStyles } from "@material-ui/core";

const dataGenerator = (data, length) => {
  var dummy = [];
  for (var i = 0; i < length; i++) {
    dummy.push({ ...data, key: uuidv4() });
  }
  return dummy;
};
const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
  },
  button: {
    margin: "1% 1%",
  },
}));
const StockTable = (props) => {
  const classes = useStyles();
  const TableRef = useRef(null);
  const callBack = (data) => {
    props.onTileDataSelect(data);
  };
  const handleOkClick = () => {
    if (typeof TableRef.current.getData === "function") {
      callBack(TableRef.current.getData());
    }
  };
  return (
    <CustomModal
      showModal={props.showStockTable}
      closeModal={props.closeModal}
      modalTitle="Stock Table"
      ModalType={() => (
        <>
          <CustomTable
            ref={TableRef}
            {...{
              columns: [
                { title: "Name", id: "name" },
                { title: "Size", id: "size" },
                { title: "Company", id: "company" },
                { title: "Qty", id: "qty" },
                { title: "Type", id: "type" },
                { title: "Rate", id: "rate" },
                { title: "HSN", id: "hsn" },
              ],
              data: [
                ...dataGenerator(
                  {
                    name: "T1",
                    size: "18x12",
                    company: "ABC",
                    qty: 1000,
                    type: "abs",
                    rate: 200,
                    hsn: "12%",
                  },
                  105
                ),
              ],
              title: "Stock",
              tableBodyHeight: "450px",
              editCallback: callBack,
            }}
          />
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item sm={12} className={classes.container}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={handleOkClick}
              >
                Ok
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={props.closeModal}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      modalWidth="60vw"
      modalHeight="72vh"
    ></CustomModal>
  );
};
export default StockTable;
