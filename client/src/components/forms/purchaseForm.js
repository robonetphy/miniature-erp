import React, { useState, useRef, useCallback } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { StockTable } from "../customTables";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
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

export default function CreatePurchase(props) {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [PurchaseData, setPurchaseData] = useState({
    Date: props.Date ?? new Date().toISOString().substring(0, 10),
    Title: props.Title ?? "",
    Remarks: props.Remarks ?? "",
    TotalQty: props.TotalQty ?? 0,
    TotalAmount: props.TotalAmount ?? 0,
    TableRows: props.TableRows ?? [],
    showStockTable: false,
  });
  const save = () => {
    //Send Data to Server
    console.log(PurchaseData);
  };
  const cleanForm = () => {
    setPurchaseData({
      Date: new Date().toISOString().substring(0, 10),
      Title: "",
      Remarks: "",
      TotalQty: 0,
      TotalAmount: 0,
      TableRows: [],
      showStockTable: false,
    });
  };
  const onTileSelect = (data) => {
    if (data)
      setPurchaseData((prev) => {
        const { name: Name, qty: Qty, rate: Rate } = data;
        let TotalQty = prev.TotalQty + parseInt(Qty);
        let TotalAmount = prev.TotalAmount + parseInt(Qty) * parseInt(Rate);
        return {
          ...prev,
          TotalQty: TotalQty,
          TotalAmount: TotalAmount,
          TableRows: [
            {
              name: Name,
              qty: Qty,
              rate: Rate,
              amount: parseInt(Rate) * parseInt(Qty),
              key: uuidv4(),
            },
            ...prev.TableRows,
          ],
          showStockTable: false,
        };
      });
  };
  const handlePurchaseDataChange = (event) => {
    setPurchaseData((prev) => ({
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
    setPurchaseData((prev) => {
      let TotalQty =
        prev.TotalQty - parseInt(prev.TableRows[indexOfRow]["qty"]);
      let TotalAmount =
        prev.TotalAmount - parseInt(prev.TableRows[indexOfRow]["subtotal"]);
      const TableRows = prev.TableRows.filter(
        (data, index) => index !== indexOfRow
      );
      return {
        ...prev,
        TotalQty: TotalQty,
        TotalAmount: TotalAmount,
        TableRows: TableRows,
      };
    });
  };
  const handleUpdate = (indexOfRow, value, name) => {
    setPurchaseData((prev) => {
      let TotalQty = 0;
      let TotalAmount = 0;
      const TableRows = prev.TableRows.map((data, index) => {
        if (index === indexOfRow) {
          data[name] = value;
          data["amount"] = parseInt(data["qty"]) * parseInt(data["rate"]);
        }
        TotalAmount += parseInt(data["amount"]);
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
      console.log("I also here");
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
  const preOrderHelper = useCallback((root) => {
    if (root !== null) {
      if (root.tabIndex !== -1) return root;
      var nodes = root.childNodes;
      var isFound = null;
      for (var i = 0; i < nodes.length; i++) {
        isFound = preOrderHelper(nodes[i]);
        if (isFound instanceof Element) return isFound;
      }
    }
    return null;
  }, []);
  const handleNextFocus = (nextElementName) => {
    const child = containerRef.current.querySelector(
      `[data-name="${nextElementName}"]`
    );
    preOrderHelper(child).focus();
  };
  return (
    <div ref={containerRef}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        className={classes.button}
      >
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Date
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Title
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <TextField
            autoFocus={true}
            name="Date"
            label="Date"
            type="date"
            value={PurchaseData.Date}
            onChange={handlePurchaseDataChange}
            onKeyDown={(e)=>{
              if (e.which === 13) {
                handleNextFocus("title");
              }
            }}
            className={classes.textField}
          />
          <TextField
            className={classes.textField}
            value={PurchaseData.Title}
            onChange={handlePurchaseDataChange}
            label="Title"
            name="Title"
            data-name="title"
            onKeyDown={(e)=>{
              if (e.which === 13) {
                handleNextFocus("tile");
              }
            }}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            data-name="tile"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setPurchaseData((prev) => ({ ...prev, showStockTable: true }));
            }}
          >
            Select Item
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>QTY</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PurchaseData.TableRows.map((row, index) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.name}
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
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={1} align="right">
              Total Qty
            </TableCell>
            <TableCell align="left">{PurchaseData.TotalQty}</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">{PurchaseData.TotalAmount}</TableCell>
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
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Remarks
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            className={classes.textField}
            value={PurchaseData.Remarks}
            onChange={handlePurchaseDataChange}
            name="Remarks"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={7} className={classes.label}>
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
      {PurchaseData.showStockTable ? (
        <StockTable
          showStockTable={PurchaseData.showStockTable}
          closeModal={() => {
            setPurchaseData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}
    </div>
  );
}
