import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomModal from "../modal";
import CustomTable from "../table";
import { v4 as uuidv4 } from "uuid";
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
  button: {
    margin: "1% 1%",
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    maxHeight: 350,
  },
}));

export default function CreateReturn(props) {
  const classes = useStyles();
  const containerRef = useRef(null);
  // useEnterNavigation(containerRef);
  const [ReturnData, setReturnData] = useState({
    Remarks: props.Remarks ?? "",
    TotalQty: props.TotalQty ?? 0,
    TotalAmount: props.TotalAmount ?? 0,
    TotalItem: props.TotalItem ?? 0,
    TableRows: props.TableRows ?? [],
    MerchantName: props.MerchantName ?? "",
    Date: props.Date ?? new Date().toISOString().substring(0, 10),
    Address: props.Address ?? "",
    PhoneNo1: props.PhoneNo1 ?? "",
    PhoneNo2: props.PhoneNo2 ?? "",
    LastReturn: props.LastReturn ?? "R-1",
    showMerchantTable: false,
    showStockTable: false,
  });
  const save = () => {
    //Send Data to Server
    console.log(ReturnData);
  };
  const cleanForm = () => {
    setReturnData({
      Remarks: "",
      TotalQty: 0,
      TotalAmount: 0,
      TotalItem: 0,
      TableRows: [],
      showStockTable: false,
      showMerchantTable: false,
      MerchantName: "",
      Date: new Date().toISOString().substring(0, 10),
      Address: "",
      PhoneNo1: "",
      PhoneNo2: "",
      LastReturn: "R-1",
    });
  };
  const onMerchantSelect = (data) => {
    if (data)
      setReturnData((prev) => {
        const [Merchant, Address, PhoneNo1, PhoneNo2] = data;
        return {
          ...prev,
          MerchantName: Merchant,
          Address: Address,
          PhoneNo1: PhoneNo1,
          PhoneNo2: PhoneNo2,
          showMerchantTable: false,
        };
      });
  };
  const onTileSelect = (data) => {
    if (data)
      setReturnData((prev) => {
        const [Product, Size, Company, Qty, Type, Rate] = data;
        let TotalQty = prev.TotalQty + parseInt(Qty);
        let TotalAmount = prev.TotalAmount + parseInt(Qty) * parseInt(Rate);
        let TotalItem = prev.TotalItem + 1;
        return {
          ...prev,
          TotalQty: TotalQty,
          TotalAmount: TotalAmount,
          TotalItem: TotalItem,
          TableRows: [
            {
              size: Size,
              product: Product,
              company: Company,
              type: Type,
              qty: Qty,
              rate: Rate,
              subtotal: parseInt(Rate) * parseInt(Qty),
              key: uuidv4(),
            },
            ...prev.TableRows,
          ],
          showStockTable: false,
        };
      });
  };
  const handleReturnDataChange = (event) => {
    setReturnData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const saveAndClose = (e) => {
    save();
    props.closeModal();
  };
  const saveAndAgain = (e) => {
    save();
    cleanForm();
  };
  const handleRemove = (indexOfRow) => {
    setReturnData((prev) => {
      let TotalQty =
        prev.TotalQty - parseInt(prev.TableRows[indexOfRow]["qty"]);
      let TotalAmount =
        prev.TotalAmount - parseInt(prev.TableRows[indexOfRow]["subtotal"]);
      let TotalItem = parseInt(prev.TotalItem) - 1;
      const TableRows = prev.TableRows.filter(
        (data, index) => index !== indexOfRow
      );
      return {
        ...prev,
        TotalQty: TotalQty,
        TotalAmount: TotalAmount,
        TotalItem: TotalItem,
        TableRows: TableRows,
      };
    });
  };
  const handleUpdate = (indexOfRow, value, name) => {
    setReturnData((prev) => {
      let TotalQty = 0;
      let TotalAmount = 0;
      const TableRows = prev.TableRows.map((data, index) => {
        if (index === indexOfRow) {
          data[name] = value;
          data["subtotal"] = parseInt(data["qty"]) * parseInt(data["rate"]);
        }
        TotalAmount += parseInt(data["subtotal"]);
        TotalQty += parseInt(data["qty"]);
        return data;
      });
      return {
        ...prev,
        TableRows: TableRows,
        TotalAmount: TotalAmount,
        TotalQty: TotalQty,
      };
    });
  };
  const handleDeleteKeyDown = (e, index) => {
    if (e.which === 46) {
      handleRemove(index);
    }
  };
  const handleEnterKeyDown = (e, nextLook) => {
    if (e.which === 13) {
      var nextFocus = containerRef.current.querySelectorAll(nextLook)[0];
      while (nextFocus && nextFocus.tabIndex === -1)
        nextFocus = nextFocus.childNodes[0];
      nextFocus.focus();
    }
  };
  return (
    <div ref={containerRef}>
      <Grid container spacing={1} className={classes.button}>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.label}>
            Last Return
          </Typography>
          <TextField
            className={classes.textField}
            label="Name"
            variant="outlined"
            fullWidth={true}
            disabled={true}
            value={ReturnData.MerchantName}
          />
        </Grid>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.returnlabel}>
            {ReturnData.LastReturn}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            autoFocus={true}
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setReturnData((prev) => ({ ...prev, showMerchantTable: true }));
            }}
          >
            Select Merchant
          </Button>
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Typography gutterBottom className={classes.label}>
            Date
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Phone No
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Address
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            className={classes.textField}
            type="date"
            fullWidth={true}
            value={ReturnData.Date}
            onChange={handleReturnDataChange}
            name="Date"
          />
          <TextField
            className={classes.textField}
            label="PhoneNo2"
            variant="outlined"
            value={ReturnData.PhoneNo2}
            onChange={handleReturnDataChange}
            name="PhoneNo2"
          />
          <TextField
            className={classes.textField}
            label="PhoneNo1"
            variant="outlined"
            value={ReturnData.PhoneNo1}
            onChange={handleReturnDataChange}
            name="PhoneNo1"
          />
          <TextField
            className={classes.textField}
            label="Address"
            variant="outlined"
            value={ReturnData.Address}
            onChange={handleReturnDataChange}
            name="Address"
            fullWidth={true}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Remarks
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            className={classes.textField}
            label="Remarks"
            variant="outlined"
            value={ReturnData.Remarks}
            onChange={handleReturnDataChange}
            name="Remarks"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setReturnData((prev) => ({ ...prev, showStockTable: true }));
            }}
            data-name="tile"
          >
            Select Tile
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>QTY</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Sub Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ReturnData.TableRows.map((row, index) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.product}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    autoFocus={index === 0 ? true : false}
                    onChange={(e) => {
                      handleUpdate(index, e.target.value, "qty");
                    }}
                    onKeyDown={(e) => {
                      handleDeleteKeyDown(e, index);
                      handleEnterKeyDown(e, "[data-name=rate]");
                    }}
                    value={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-name="rate"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={row.rate}
                    onChange={(e) => {
                      handleUpdate(index, e.target.value, "rate");
                    }}
                    onKeyDown={(e) => {
                      handleDeleteKeyDown(e, index);
                      handleEnterKeyDown(e, "[data-name=tile]");
                    }}
                  />
                </TableCell>
                <TableCell>{row.subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={1} align="right">
              Total Items
            </TableCell>
            <TableCell align="left">{ReturnData.TotalItem}</TableCell>
            <TableCell colSpan={2} align="right">
              Total Qty
            </TableCell>
            <TableCell align="left">{ReturnData.TotalQty}</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">{ReturnData.TotalAmount}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        className={classes.button}
      >
        <Grid item sm={7} className={classes.label}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Print &#38; Save
          </Button>
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
      {ReturnData.showStockTable ? (
        <CustomModal
          showModal={ReturnData.showStockTable}
          closeModal={() => {
            setReturnData((prev) => ({ ...prev, showStockTable: false }));
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

      {ReturnData.showMerchantTable ? (
        <CustomModal
          showModal={ReturnData.showMerchantTable}
          closeModal={() => {
            setReturnData((prev) => ({ ...prev, showMerchantTable: false }));
          }}
          modalTitle="Merchant Table"
          ModalType={(props) => (
            <CustomTable
              {...{
                columns: ["Company", "Address", "Phone No1", "Phone No2"],
                data: [
                  ...dataGenerator(
                    [
                      "ABC",
                      "asdasfasddasdas",
                      "+912123123123",
                      "+912123123123",
                    ],
                    56
                  ),
                ],
                title: "Company",
                isSearchEnable: true,
                fixedHeader: true,
                tableBodyHeight: "450px",
                editCallback: onMerchantSelect,
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
