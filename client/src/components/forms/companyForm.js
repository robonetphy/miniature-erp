import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useEnterNavigation from "../../hooks/useEnterNavigation";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  label: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
  },
  container: {
    marginTop: "10px",
  },
  button: {
    margin: "1% 1%",
  },
}));

export default function CreateCompany(props) {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [CompanyData, setCompanyData] = useState({
    Company: props.Company ?? "",
    Address: props.Address ?? "",
    PhoneNo: props.PhoneNo ?? "",
  });

  const save = () => {
    //Send Data to Server
    console.log(CompanyData);
  };
  const cleanForm = () => {
    setCompanyData({
      Company: "",
      Address: "",
      PhoneNo: "",
    });
  };
  const saveAndClose = (e) => {
    save();
    props.closeModal();
  };
  const saveAndAgain = (e) => {
    save();
    cleanForm();
  };

  const handleCompanyDataChange = (event) => {
    setCompanyData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEnterNavigation(containerRef);
  return (
    <Grid
      ref={containerRef}
      container
      spacing={3}
      className={classes.container}
    >
      <Grid item sm={3}>
        <Typography gutterBottom className={classes.label}>
          Company
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No.
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          value={CompanyData.Company}
          onChange={handleCompanyDataChange}
          name="Company"
          className={classes.textField}
          label="Company"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Address"
          variant="outlined"
          fullWidth={true}
          value={CompanyData.Address}
          onChange={handleCompanyDataChange}
          name="Address"
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Phone No"
          variant="outlined"
          fullWidth={true}
          value={CompanyData.PhoneNo}
          onChange={handleCompanyDataChange}
          name="PhoneNo"
        />
      </Grid>
      <Grid item sm={12} style={{ textAlignLast: "right" }}>
        {props.mode === undefined ? (
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={saveAndAgain}
          >
            Save &#38; Again
          </Button>
        ) : null}

        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
          onClick={saveAndClose}
        >
          {props.mode ?? "Save"} &#38; Close
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
  );
}
