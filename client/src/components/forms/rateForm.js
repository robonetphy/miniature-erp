import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { StockTable, CompanyTable } from "../customTables";
import CustomTable from "../table";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  label: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
  },
  stockbutton: {
    margin: "2% 1%",
  },
  button: {
    margin: "1% 1%",
  },
  Typebutton: {
    margin: "2% 2%",
    width: "45%",
  },
  SelectedItems: {
    display: "inline-block",
    fontSize: "1rem",
    textAlign: "center",
    width: "50%",
  },
}));
export default function ChangeRate() {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [RateData, setRateData] = useState({
    Size: "N/A",
    Type: "N/A",
    Company: "ALL",
    Product: "ALL",
    Rate: 0,
    showStockTable: false,
    showCompanyTable: false,
    TableData: [],
  });
  const cleanForm = () => {
    setRateData((prev) => ({
      ...prev,
      Size: "N/A",
      Type: "N/A",
      Company: "ALL",
      Product: "ALL",
      Rate: 0,
      showStockTable: false,
      showCompanyTable: false,
    }));
  };
  const handleRateDataChange = (event, newValue) => {
    setRateData((prev) => ({
      ...prev,
      [event.target.name]: newValue ?? event.target.value,
    }));
  };
  const onTileSelect = (data) => {
    if (data)
      setRateData((prev) => {
        const { name: Product } = data;
        return { ...prev, Product: Product, showStockTable: false };
      });
  };
  const onCompanySelect = (data) => {
    if (data)
      setRateData((prev) => {
        const { compnay: Company } = data;
        return { ...prev, Company: Company, showCompanyTable: false };
      });
  };
  const save = () => {
    console.log(RateData);
  };
  const fetchTableData = () => {
    console.log("Fetch Table Data");
  };

  return (
    <div ref={containerRef}>
      <Grid container className={classes.button} spacing={3}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Size
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Type
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Company
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Product
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Autocomplete
            options={["N/A", "123x123", "11x12", "15x15"]}
            value={RateData.Size}
            onChange={handleRateDataChange}
            name="Size"
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
            options={["N/A", "ABC", "ABXC", "ABCS"]}
            value={RateData.Type}
            onChange={handleRateDataChange}
            name="Type"
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
                label="Type"
                variant="outlined"
              />
            )}
          />
          <span className={classes.SelectedItems}>{RateData.Company}</span>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setRateData((prev) => ({ ...prev, showCompanyTable: true }));
            }}
          >
            Select Company
          </Button>
          <span className={classes.SelectedItems}>{RateData.Product}</span>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setRateData((prev) => ({ ...prev, showStockTable: true }));
            }}
          >
            Select Product
          </Button>
          <Button
            onClick={cleanForm}
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            Clear
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={fetchTableData}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            New Rate
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <TextField
            value={RateData.Rate}
            onChange={handleRateDataChange}
            name="Rate"
            type="number"
            className={classes.textField}
            label="Rate"
            width="50"
          />
        </Grid>
      </Grid>
      <CustomTable
        {...{
          title: "",
          tableBodyHeight: "230px",
          columns: [
            { title: "Name", id: "name" },
            { title: "Size", id: "size" },
            { title: "Company", id: "company" },
            { title: "Qty", id: "qty" },
            { title: "Type", id: "type" },
            { title: "Rate", id: "rate" },
            { title: "HSN", id: "hsn" },
          ],
          data: RateData.TableData,
          autoFocus: false,
        }}
      ></CustomTable>
      <Grid container className={classes.button}>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          onClick={save}
        >
          Change Rate
        </Button>
      </Grid>
      {RateData.showStockTable ? (
        <StockTable
          showStockTable={RateData.showStockTable}
          closeModal={() => {
            setRateData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}

      {RateData.showCompanyTable ? (
        <CompanyTable
          showCompanyTable={RateData.showCompanyTable}
          closeModal={() => {
            setRateData((prev) => ({ ...prev, showCompanyTable: false }));
          }}
          onCompanyDataSelect={onCompanySelect}
        />
      ) : null}
    </div>
  );
}
