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
  container: {
    marginTop: "10px",
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

export default function CreateBreakage(props) {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [BreakageData, setBreakageData] = useState({
    Date: props.Date ?? new Date().toISOString().substring(0, 10),
    Title: props.Title ?? "",
    Remarks: props.Remarks ?? "",
    TotalQty: props.TotalQty ?? 0,
    TotalAmount: props.TotalAmount ?? 0,
    TotalItem: props.TotalItem ?? 0,
    TableRows: props.TableRows ?? [],
    showStockTable: false,
  });
  const save = () => {
    //Send Data to Server
    console.log(BreakageData);
  };
  const cleanForm = () => {
    setBreakageData({
      Date: new Date().toISOString().substring(0, 10),
      Title: "",
      Remarks: "",
      TotalQty: 0,
      TotalAmount: 0,
      TotalItem: 0,
      TableRows: [],
      showStockTable: false,
    });
  };
  const onTileSelect = (data) => {
    if (data)
      setBreakageData((prev) => {
        const { name: Name, qty: Qty, rate: Rate } = data;
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
              name: Name,
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
  const handleBreakageDataChange = (event) => {
    setBreakageData((prev) => ({
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
    setBreakageData((prev) => {
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
    setBreakageData((prev) => {
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
      <Grid container className={classes.button}>
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
            value={BreakageData.Date}
            onChange={handleBreakageDataChange}
            className={classes.textField}
          />
          <TextField
            className={classes.textField}
            value={BreakageData.Title}
            onChange={handleBreakageDataChange}
            label="Title"
            name="Title"
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
              setBreakageData((prev) => ({ ...prev, showStockTable: true }));
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
            {BreakageData.TableRows.map((row, index) => (
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
            <TableCell align="left">{BreakageData.TotalItem}</TableCell>
            <TableCell colSpan={2} align="right">
              Total Qty
            </TableCell>
            <TableCell align="left">{BreakageData.TotalQty}</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">{BreakageData.TotalAmount}</TableCell>
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
            value={BreakageData.Remarks}
            onChange={handleBreakageDataChange}
            name="Remarks"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
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
      {BreakageData.showStockTable ? (
        <StockTable
          showStockTable={BreakageData.showStockTable}
          closeModal={() => {
            setBreakageData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}
    </div>
  );
}
