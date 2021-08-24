import React from "react";
import CustomModal from "../modal";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  textContainer: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "center",
    marginTop: "5%",
  },
  btnContainer: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
  },
  button: {
    margin: "1% 1%",
  },
}));
const ConfirmationModal = (props) => {
  const classes = useStyles();
  const closeBtnCallBack = () => {
    props.closeConfirmation();
  };
  const okBtnCallBack = () => {
    props.okBtnCallBack();
  };
  return (
    <CustomModal
      showModal={props.showConfirmation}
      closeModal={closeBtnCallBack}
      modalTitle="Confirmation !"
      ModalType={(props) => (
        <>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item sm={12} className={classes.textContainer}>
              <Typography variant="h6">Are sure you want close ?</Typography>
            </Grid>
            <Grid item sm={12} className={classes.btnContainer}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={okBtnCallBack}
              >
                Ok
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={closeBtnCallBack}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      modalWidth="30vw"
      modalHeight="22vh"
    ></CustomModal>
  );
};
export default ConfirmationModal;
