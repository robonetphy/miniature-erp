import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
const IndianState = [
  { code: "N/A", title: "None" },
  { code: "AN", title: "Andaman and Nicobar Islands" },
  { code: "AP", title: "Andhra Pradesh" },
  { code: "AR", title: "Arunachal Pradesh" },
  { code: "AS", title: "Assam" },
  { code: "BR", title: "Bihar" },
  { code: "CG", title: "Chandigarh" },
  { code: "CH", title: "Chhattisgarh" },
  { code: "DN", title: "Dadra and Nagar Haveli" },
  { code: "DD", title: "Daman and Diu" },
  { code: "DL", title: "Delhi" },
  { code: "GA", title: "Goa" },
  { code: "GJ", title: "Gujarat" },
  { code: "HR", title: "Haryana" },
  { code: "HP", title: "Himachal Pradesh" },
  { code: "JK", title: "Jammu and Kashmir" },
  { code: "JH", title: "Jharkhand" },
  { code: "KA", title: "Karnataka" },
  { code: "KL", title: "Kerala" },
  { code: "LA", title: "Ladakh" },
  { code: "LD", title: "Lakshadweep" },
  { code: "MP", title: "Madhya Pradesh" },
  { code: "MH", title: "Maharashtra" },
  { code: "MN", title: "Manipur" },
  { code: "ML", title: "Meghalaya" },
  { code: "MZ", title: "Mizoram" },
  { code: "NL", title: "Nagaland" },
  { code: "OR", title: "Odisha" },
  { code: "PY", title: "Puducherry" },
  { code: "PB", title: "Punjab" },
  { code: "RJ", title: "Rajasthan" },
  { code: "SK", title: "Sikkim" },
  { code: "TN", title: "Tamil Nadu" },
  { code: "TS", title: "Telangana" },
  { code: "TR", title: "Tripura" },
  { code: "UP", title: "Uttar Pradesh" },
  { code: "UK", title: "Uttarakhand" },
  { code: "WB", title: "West Bengal" },
];
export default function AddMerchant(props) {
  const classes = useStyles();
  const [MerchantData, setMerchantData] = useState({
    Name: props.Name ?? "",
    Address: props.Address ?? "",
    PhoneNo1: props.PhoneNo1 ?? "",
    PhoneNo2: props.PhoneNo2 ?? "",
    Email: props.Email ?? "",
    PANNo: props.PANNo ?? "",
    State: props.State ?? { code: "N/A", title: "None" },
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
      State: { code: "N/A", title: "None" },
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

  const handleMerchantDataChange = (event, newValue) => {
    setMerchantData((prev) => ({
      ...prev,
      [event.target.name]: newValue ?? event.target.value,
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
        <Autocomplete
          options={IndianState}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option) =>
            option.code === MerchantData.State.code
          }
          value={MerchantData.State}
          name="State"
          className={classes.textField}
          onChange={handleMerchantDataChange}
          fullWidth={true}
          autoHighlight={true}
          autoSelect={true}
          clearOnBlur={true}
          blurOnSelect={true}
          autoComplete={true}
          openOnFocus={true}
          disablePortal={true}
          disableListWrap={true}
          clearOnEscape={true}
          renderInput={(params) => (
            <TextField
              data-navigation="true"
              {...params}
              label="state"
              variant="outlined"
            />
          )}
        />
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
