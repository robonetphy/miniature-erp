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
import { CompanyTable } from "../customTables";
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
    Size: props.Size ?? "",
    Type: props.Type ?? "",
    HSN: props.HSN ?? "",
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
      Size: "",
      Type: "",
      HSN: "",
      Name: "",
      Rate: "",
      Company: "",
      initialQty: 0,
      showCompanyTable: false,
    });
  };
  const onCompanySelect = (data) => {
    setStockData((prev) => {
      const [Company, ,] = data;
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

  const handleStockDataChange = (event) => {
    setStockData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
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
          <Select
            value={StockData.Size}
            name="Size"
            className={classes.textField}
            onChange={handleStockDataChange}
            variant="outlined"
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <Select
            value={StockData.Type}
            name="Type"
            onChange={handleStockDataChange}
            className={classes.textField}
            variant="outlined"
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
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
          <Select
            value={StockData.HSN}
            className={classes.textField}
            onChange={handleStockDataChange}
            name="HSN"
            variant="outlined"
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
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
