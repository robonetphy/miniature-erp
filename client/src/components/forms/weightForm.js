import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core";
import CustomTable from "../table";
import CustomModal from "../modal";
const dataGenerator = (data, length) => {
  var dummy = [];
  for (var i = 0; i < length; i++) {
    dummy.push(data);
  }
  return dummy;
};
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
    Size: "",
    Type: "",
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
      Size: "",
      Type: "",
      Company: "ALL",
      Product: "ALL",
      Weight: 0,
      showStockTable: false,
      showCompanyTable: false,
    }));
  };
  const handleWeightDataChange = (event) => {
    setWeightData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onTileSelect = (data) => {
    if (data)
      setWeightData((prev) => {
        const [Product] = data;
        return { ...prev, Product: Product, showStockTable: false };
      });
  };
  const onCompanySelect = (data) => {
    if (data)
      setWeightData((prev) => {
        const [Company] = data;
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
          [prev.Product, prev.Company, prev.Size, prev.Type, prev.Weight],
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
          <Select
            value={WeightData.Size}
            onChange={handleWeightDataChange}
            name="Size"
            className={classes.textField}
            variant="outlined"
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Size A</MenuItem>
            <MenuItem value={20}>Size A</MenuItem>
            <MenuItem value={30}>Size A</MenuItem>
          </Select>
          <Select
            value={WeightData.Type}
            onChange={handleWeightDataChange}
            name="Type"
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
          columns: ["Name", "Company", "Size", "Type", "Weight"],
          isSearchEnable: true,
          title: "",
          selectableRows: "none",
          fixedHeader: true,
          tableBodyHeight: "300px",
          data: WeightData.TableData,
        }}
      ></CustomTable>
      {WeightData.showStockTable ? (
        <CustomModal
          showModal={WeightData.showStockTable}
          closeModal={() => {
            setWeightData((prev) => ({ ...prev, showStockTable: false }));
          }}
          modalTitle="Stock Table"
          ModalType={(props) => (
            <CustomTable
              {...{
                columns: [
                  "Name",
                  "Size",
                  "Company",
                  "Qty",
                  "Type",
                  "Rate",
                  "HNS",
                ],
                data: [
                  ...dataGenerator(
                    ["T1", "18x12", "ABC", 1000, "abs", 200, "12%"],
                    105
                  ),
                ],
                title: "Inventory",
                isSearchEnable: true,
                fixedHeader: true,
                tableBodyHeight: "450px",
                editCallback: onTileSelect,
              }}
            />
          )}
          modalWidth="60vw"
          modalHeight="70vh"
        ></CustomModal>
      ) : null}

      {WeightData.showCompanyTable ? (
        <CustomModal
          showModal={WeightData.showCompanyTable}
          closeModal={() => {
            setWeightData((prev) => ({ ...prev, showCompanyTable: false }));
          }}
          modalTitle="Company Table"
          ModalType={(props) => (
            <CustomTable
              {...{
                columns: ["Company", "Address", "Phone No1"],
                data: [
                  ...dataGenerator(
                    ["ABC", "asdasfasddasdas", "+912123123123"],
                    56
                  ),
                ],
                title: "Company",
                isSearchEnable: true,
                fixedHeader: true,
                tableBodyHeight: "450px",
                editCallback: onCompanySelect,
              }}
            />
          )}
          modalWidth="60vw"
          modalHeight="70vh"
        ></CustomModal>
      ) : null}
    </div>
  );
}
