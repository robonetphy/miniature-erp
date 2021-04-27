import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CompanyTable } from "../customTables";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  stockbutton: {
    margin: "2% 1%",
  },
  button: {
    margin: "1% 1%",
  },
  Typebutton: {
    margin: "1% 5%",
  },
}));

export default function CreateStock(props) {
  const classes = useStyles();
  const [StockData, setStockData] = useState({
    Size: props.Size ?? "N/A",
    Type: props.Type ?? "N/A",
    HSN: props.HSN ?? "N/A",
    Name: props.Name ?? "",
    Rate: props.Rate ?? "",
    Company: props.Company ?? "",
    initialQty: props.initialQty ?? 0,
    showCompanyTable: false,
  });

  const save = () => {
    //Send Data to Server
    console.log(StockData);
  };
  const cleanForm = () => {
    setStockData({
      Size: "N/A",
      Type: "N/A",
      HSN: "N/A",
      Name: "",
      Rate: "",
      Company: "",
      initialQty: 0,
      showCompanyTable: false,
    });
  };
  const onCompanySelect = (data) => {
    setStockData((prev) => {
      const { company: Company } = data;
      return {
        ...prev,
        Company: Company,
        showCompanyTable: false,
      };
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

  const handleStockDataChange = (event, newValue) => {
    setStockData((prev) => ({
      ...prev,
      [event.target.name]: newValue ?? event.target.value,
    }));
  };
  const containerRef = useRef(null);
  return (
    <div ref={containerRef}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item sm={3}>
          <Typography gutterBottom className={classes.label}>
            Company
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Name
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Size
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Type
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Rate
          </Typography>
          <Typography gutterBottom className={classes.label}>
            HSN/SAC
          </Typography>
        </Grid>
        <Grid item sm={8}>
          <TextField
            className={classes.textField}
            label="Company Name"
            variant="outlined"
            disabled={true}
            value={StockData.Company}
          />
          <Button
            autoFocus={true}
            variant="contained"
            size="large"
            color="primary"
            className={classes.stockbutton}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setStockData((prev) => ({ ...prev, showCompanyTable: true }));
            }}
          >
            Select Company
          </Button>
          <TextField
            className={classes.textField}
            label="Tile's Name"
            variant="outlined"
            fullWidth={true}
            value={StockData.Name}
            onChange={handleStockDataChange}
            name="Name"
          />
          <Autocomplete
            options={["N/A", "123x123", "122x122", "646x54"]}
            value={StockData.Size}
            name="Size"
            onChange={handleStockDataChange}
            className={classes.textField}
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
                label="Size"
                variant="outlined"
              />
            )}
          />
          <Autocomplete
            options={["N/A", "ABC", "ABCX", "XCY"]}
            value={StockData.Type}
            name="Type"
            onChange={handleStockDataChange}
            className={classes.textField}
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
                label="type"
                variant="outlined"
              />
            )}
          />
          <TextField
            type="number"
            value={StockData.Rate}
            name="Rate"
            onChange={handleStockDataChange}
            label="Rate"
            variant="outlined"
            className={classes.textField}
            fullWidth={true}
          />
          <Autocomplete
            options={["N/A", "12%", "11%", "10%"]}
            value={StockData.HSN}
            name="HSN"
            onChange={handleStockDataChange}
            className={classes.textField}
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
                label="HSN"
                variant="outlined"
              />
            )}
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
            onClick={() => {
              props.closeModal();
            }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
      {StockData.showCompanyTable ? (
        <CompanyTable
          showCompanyTable={StockData.showCompanyTable}
          closeModal={() => {
            setStockData((prev) => ({ ...prev, showCompanyTable: false }));
          }}
          onCompanyDataSelect={onCompanySelect}
        />
      ) : null}
    </div>
  );
}
