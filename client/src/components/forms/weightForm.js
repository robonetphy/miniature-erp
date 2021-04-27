import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomTable from "../table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { StockTable, CompanyTable } from "../customTables";
import { v4 as uuidv4 } from "uuid";
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
    margin: "2% 0%",
    width: "50%",
  },
  Clearbutton: {
    margin: "2% 0%",
    width: "100%",
  },
  SelectedItems: {
    display: "inline-block",
    fontSize: "1rem",
    textAlign: "center",
    width: "50%",
  },
}));
export default function ManageWeight() {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [WeightData, setWeightData] = useState({
    Size: "N/A",
    Type: "N/A",
    Company: "ALL",
    Product: "ALL",
    Weight: 0,
    showStockTable: false,
    showCompanyTable: false,
    TableData: [],
  });
  const cleanForm = () => {
    setWeightData((prev) => ({
      ...prev,
      Size: "N/A",
      Type: "N/A",
      Company: "ALL",
      Product: "ALL",
      Weight: 0,
      showStockTable: false,
      showCompanyTable: false,
    }));
  };
  const handleWeightDataChange = (event, newValue) => {
    setWeightData((prev) => ({
      ...prev,
      [event.target.name]: newValue ?? event.target.value,
    }));
  };
  const onTileSelect = (data) => {
    if (data)
      setWeightData((prev) => {
        const { name: Product } = data;
        return { ...prev, Product: Product, showStockTable: false };
      });
  };
  const onCompanySelect = (data) => {
    if (data)
      setWeightData((prev) => {
        const { company: Company } = data;
        return { ...prev, Company: Company, showCompanyTable: false };
      });
  };
  const save = () => {
    console.log(WeightData);
  };
  const addWeight = () => {
    save();
    setWeightData((prev) => {
      return {
        ...prev,
        Size: "",
        Type: "",
        Company: "ALL",
        Product: "ALL",
        Weight: 0,
        showStockTable: false,
        showCompanyTable: false,
        TableData: [
          {
            product: prev.Product,
            company: prev.Company,
            size: prev.Size,
            type: prev.Type,
            weight: prev.Weight,
            key: uuidv4(),
          },
          ...prev.TableData,
        ],
      };
    });
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
            value={WeightData.Size}
            onChange={handleWeightDataChange}
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
            value={WeightData.Type}
            onChange={handleWeightDataChange}
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

          <span className={classes.SelectedItems}>{WeightData.Company}</span>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setWeightData((prev) => ({ ...prev, showCompanyTable: true }));
            }}
          >
            Select Company
          </Button>
          <span className={classes.SelectedItems}>{WeightData.Product}</span>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setWeightData((prev) => ({ ...prev, showStockTable: true }));
            }}
          >
            Select Product
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Clearbutton}
            onClick={cleanForm}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Weight
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <TextField
            value={WeightData.Weight}
            onChange={handleWeightDataChange}
            name="Weight"
            type="number"
            className={classes.textField}
            label="Weight"
            width="50"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={addWeight}
          >
            Add Weight
          </Button>
        </Grid>
      </Grid>

      <CustomTable
        {...{
          columns: [
            { title: "Product", id: "product" },
            { title: "Company", id: "company" },
            { title: "Size", id: "size" },
            { title: "Type", id: "type" },
            { title: "Weight", id: "weight" },
          ],
          title: "",
          tableBodyHeight: "300px",
          data: WeightData.TableData,
          autoFocus: false,
        }}
      ></CustomTable>
      {WeightData.showStockTable ? (
        <StockTable
          showStockTable={WeightData.showStockTable}
          closeModal={() => {
            setWeightData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}

      {WeightData.showCompanyTable ? (
        <CompanyTable
          showCompanyTable={WeightData.showCompanyTable}
          closeModal={() => {
            setWeightData((prev) => ({ ...prev, showCompanyTable: false }));
          }}
          onCompanyDataSelect={onCompanySelect}
        />
      ) : null}
    </div>
  );
}
