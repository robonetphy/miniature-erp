import React, { useState, useRef, useCallback, useEffect } from "react";
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
import ConfirmationModal from "../confirmationModal";

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
  const isDisabled = () => {
    return props.mode === "Delete";
  };
  const containerRef = useRef(null);
  const [PurchaseData, setPurchaseData] = useState({
    Date: props.Date ?? new Date().toISOString().substring(0, 10),
    Title: props.Title ?? "",
    Remarks: props.Remarks ?? "",
    TotalQty: props.TotalQty ?? 0,
    TotalAmount: props.TotalAmount ?? 0,
    TableRows: props.TableRows ?? [],
    showStockTable: false,
    showConfirmation: false,
    isDataChanged: false,
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
      showConfirmation: false,
      isDataChanged: false,
    });
  };
  const onTileSelect = (data) => {
    if (data)
      setPurchaseData((prev) => {
        const { name: Name, qty: Qty, rate: Rate } = data;
        let TotalQty = prev.TotalQty + parseFloat(Qty);
        let TotalAmount = prev.TotalAmount + parseFloat(Qty) * parseFloat(Rate);
        return {
          ...prev,
          TotalQty: TotalQty,
          TotalAmount: TotalAmount,
          TableRows: [
            {
              name: Name,
              qty: Qty,
              rate: Rate,
              amount: parseFloat(Rate) * parseFloat(Qty),
              key: uuidv4(),
            },
            ...prev.TableRows,
          ],
          showStockTable: false,
          isDataChanged: true,
        };
      });
  };
  const handlePurchaseDataChange = (event) => {
    setPurchaseData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      isDataChanged: true,
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
        prev.TotalQty - parseFloat(prev.TableRows[indexOfRow]["qty"]);
      let TotalAmount =
        prev.TotalAmount - parseFloat(prev.TableRows[indexOfRow]["subtotal"]);
      const TableRows = prev.TableRows.filter(
        (data, index) => index !== indexOfRow
      );
      return {
        ...prev,
        TotalQty: TotalQty,
        TotalAmount: TotalAmount,
        TableRows: TableRows,
        isDataChanged: true,
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
          data["amount"] = parseFloat(data["qty"]) * parseFloat(data["rate"]);
        }
        TotalAmount += parseFloat(data["amount"]);
        TotalQty += parseFloat(data["qty"]);
        return data;
      });
      return {
        ...prev,
        TableRows: TableRows,
        TotalAmount: TotalAmount,
        TotalQty: TotalQty,
        isDataChanged: true,
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
      var nextFocus = containerRef.current.querySelectorAll(
        `[data-name="${nextLook}"]`
      )[0];
      preOrderHelper(nextFocus).focus();
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
  const handleCloseConfirmation = useCallback(() => {
    if (PurchaseData.isDataChanged)
      setPurchaseData((prev) => ({
        ...prev,
        showConfirmation: true,
      }));
    else props.closeModal();
  }, [props, PurchaseData]);
  const handleEscape = useCallback(
    (e) => {
      if (e.which === 27) {
        handleCloseConfirmation();
      }
    },
    [handleCloseConfirmation]
  );
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("keydown", handleEscape);
    return () => {
      container.removeEventListener("keydown", handleEscape);
    };
  }, [containerRef, handleEscape]);
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
            disabled={isDisabled()}
            autoFocus={true}
            name="Date"
            label="Date"
            type="date"
            value={PurchaseData.Date}
            onChange={handlePurchaseDataChange}
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "title");
            }}
            className={classes.textField}
          />
          <TextField
            disabled={isDisabled()}
            className={classes.textField}
            value={PurchaseData.Title}
            onChange={handlePurchaseDataChange}
            label="Title"
            name="Title"
            data-name="title"
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "tile");
            }}
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            data-name="tile"
            disabled={isDisabled()}
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
                    disabled={isDisabled()}
                    InputProps={{ inputProps: { min: 1 } }}
                    autoFocus={index === 0 ? true : false}
                    onChange={(e) => {
                      handleUpdate(index, e.target.value, "qty");
                    }}
                    onKeyDown={(e) => {
                      handleDeleteKeyDown(e, index);
                      handleEnterKeyDown(e, "rate");
                    }}
                    value={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-name="rate"
                    type="number"
                    disabled={isDisabled()}
                    InputProps={{ inputProps: { min: 1 } }}
                    value={row.rate}
                    onChange={(e) => {
                      handleUpdate(index, e.target.value, "rate");
                    }}
                    onKeyDown={(e) => {
                      handleDeleteKeyDown(e, index);
                      handleEnterKeyDown(e, "tile");
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
            disabled={isDisabled()}
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
            onClick={handleCloseConfirmation}
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
      {PurchaseData.showConfirmation ? (
        <ConfirmationModal
          showConfirmation={PurchaseData.showConfirmation}
          closeConfirmation={() => {
            setPurchaseData((prev) => ({ ...prev, showConfirmation: false }));
          }}
          okBtnCallBack={props.closeModal}
        ></ConfirmationModal>
      ) : null}
    </div>
  );
}
