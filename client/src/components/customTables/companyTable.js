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
const CompanyTable = (props) => {
  const classes = useStyles();
  const TableRef = useRef(null);
  const callBack = (data) => {
    props.onCompanyDataSelect(data);
  };
  const handleOkClick = () => {
    if (typeof TableRef.current.getData === "function") {
      callBack(TableRef.current.getData());
    }
  };
  return (
    <CustomModal
      showModal={props.showCompanyTable}
      closeModal={props.closeModal}
      modalTitle="Company Table"
      ModalType={(props) => (
        <>
          <CustomTable
            ref={TableRef}
            {...{
              columns: [
                { title: "Company", id: "company" },
                { title: "Address", id: "address" },
                { title: "Phone No", id: "phoneno" },
              ],
              data: [
                ...dataGenerator(
                  {
                    company: "ABC",
                    address: "asdasfasddasdas",
                    phoneno: "+912123123123",
                  },
                  56
                ),
              ],
              title: "Company",
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
      modalHeight="70vh"
    ></CustomModal>
  );
};
export default CompanyTable;
