import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useEnterNavigation from "../../hooks/useEnterNavigation";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  returnlabel: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "left",
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

export default function AddMerchant(props) {
  const classes = useStyles();
  const [MerchantData, setMerchantData] = useState({
    Name: props.Name ?? "",
    Address: props.Address ?? "",
    PhoneNo1: props.PhoneNo1 ?? "",
    PhoneNo2: props.PhoneNo2 ?? "",
    Email: props.Email ?? "",
    PANNo: props.PANNo ?? "",
    State: props.State ?? "",
    GSTIN: props.GSTIN ?? "",
  });

  const save = () => {
    //Send Data to Server
    console.log(MerchantData);
  };
  const cleanForm = () => {
    setMerchantData({
      Name: "",
      Address: "",
      PhoneNo1: "",
      PhoneNo2: "",
      Email: "",
      PANNo: "",
      State: "",
      GSTIN: "",
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

  const handleMerchantDataChange = (event) => {
    setMerchantData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const containerRef = useRef(null);
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
          Name
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 1
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 2
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Email
        </Typography>
        <Typography gutterBottom className={classes.label}>
          PAN No
        </Typography>
        <Typography gutterBottom className={classes.label}>
          State
        </Typography>
        <Typography gutterBottom className={classes.label}>
          GSTIN
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          label="Name"
          onChange={handleMerchantDataChange}
          name="Name"
          value={MerchantData.Name}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Address"
          onChange={handleMerchantDataChange}
          name="Address"
          value={MerchantData.Address}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Phone No 1"
          variant="outlined"
          onChange={handleMerchantDataChange}
          name="PhoneNo1"
          value={MerchantData.PhoneNo1}
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Phone No 2"
          onChange={handleMerchantDataChange}
          name="PhoneNo2"
          value={MerchantData.PhoneNo2}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Email"
          onChange={handleMerchantDataChange}
          name="Email"
          value={MerchantData.Email}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="PAN No"
          onChange={handleMerchantDataChange}
          name="PANNo"
          value={MerchantData.PANNo}
          variant="outlined"
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          onChange={handleMerchantDataChange}
          name="State"
          value={MerchantData.State}
          className={classes.textField}
          variant="outlined"
          fullWidth={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>JK</MenuItem>
          <MenuItem value={20}>MP</MenuItem>
          <MenuItem value={30}>UP</MenuItem>
        </Select>
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="GSTIN"
          onChange={handleMerchantDataChange}
          name="GSTIN"
          value={MerchantData.GSTIN}
          variant="outlined"
          fullWidth={true}
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
          {props.mode ?? "Save"}&#38; Close
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
