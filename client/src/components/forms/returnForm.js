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
import { StockTable, MerchantTable } from "../customTables";
import ConfirmationModal from "../confirmationModal";
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
  const isDisabled = () => {
    return props.mode === "Delete";
  };
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
    showConfirmation: false,
    isDataChanged: false,
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
      showConfirmation: false,
      isDataChanged: false,
    });
  };
  const onMerchantSelect = (data) => {
    if (data)
      setReturnData((prev) => {
        const {
          name: Merchant,
          address: Address,
          phone1: PhoneNo1,
          phone2: PhoneNo2,
        } = data;
        return {
          ...prev,
          MerchantName: Merchant,
          Address: Address,
          PhoneNo1: PhoneNo1,
          PhoneNo2: PhoneNo2,
          isDataChanged: true,
          showMerchantTable: false,
        };
      });
    handleNextFocus("date");
  };
  const onTileSelect = (data) => {
    if (data)
      setReturnData((prev) => {
        const {
          name: Product,
          size: Size,
          company: Company,
          qty: Qty,
          type: Type,
          rate: Rate,
        } = data;
        let TotalQty = prev.TotalQty + parseFloat(Qty);
        let TotalAmount = prev.TotalAmount + parseFloat(Qty) * parseFloat(Rate);
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
              subtotal: parseFloat(Rate) * parseFloat(Qty),
              key: uuidv4(),
            },
            ...prev.TableRows,
          ],
          showStockTable: false,
          isDataChanged: true,
        };
      });
  };
  const handleReturnDataChange = (event) => {
    setReturnData((prev) => ({
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
    setReturnData((prev) => {
      let TotalQty =
        prev.TotalQty - parseFloat(prev.TableRows[indexOfRow]["qty"]);
      let TotalAmount =
        prev.TotalAmount - parseFloat(prev.TableRows[indexOfRow]["subtotal"]);
      let TotalItem = parseFloat(prev.TotalItem) - 1;
      const TableRows = prev.TableRows.filter(
        (data, index) => index !== indexOfRow
      );
      return {
        ...prev,
        TotalQty: TotalQty,
        TotalAmount: TotalAmount,
        TotalItem: TotalItem,
        TableRows: TableRows,
        isDataChanged: true,
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
          data["subtotal"] = parseFloat(data["qty"]) * parseFloat(data["rate"]);
        }
        TotalAmount += parseFloat(data["subtotal"]);
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
  const handleNextFocus = (nextLook) => {
    var nextFocus = containerRef.current.querySelectorAll(
      `[data-name="${nextLook}"]`
    )[0];
    preOrderHelper(nextFocus).focus();
  };
  const handleEnterKeyDown = (e, nextLook) => {
    if (e.which === 13) {
      handleNextFocus(nextLook);
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
    if (ReturnData.isDataChanged)
      setReturnData((prev) => ({
        ...prev,
        showConfirmation: true,
      }));
    else props.closeModal();
  }, [props, ReturnData]);
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
      <Grid container spacing={1} className={classes.button}>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.label}>
            Last Return
          </Typography>
          <TextField
            disabled={isDisabled()}
            className={classes.textField}
            label="Name"
            variant="outlined"
            fullWidth={true}
            value={ReturnData.MerchantName}
          />
        </Grid>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.returnlabel}>
            {ReturnData.LastReturn}
          </Typography>
          <Button
            disabled={isDisabled()}
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
            disabled={isDisabled()}
            className={classes.textField}
            type="date"
            data-name="date"
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "phoneno1");
            }}
            fullWidth={true}
            value={ReturnData.Date}
            onChange={handleReturnDataChange}
            name="Date"
          />
          <TextField
            disabled={isDisabled()}
            className={classes.textField}
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "phoneno2");
            }}
            data-name="phoneno1"
            label="PhoneNo1"
            variant="outlined"
            value={ReturnData.PhoneNo1}
            onChange={handleReturnDataChange}
            name="PhoneNo1"
          />
          <TextField
            className={classes.textField}
            disabled={isDisabled()}
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "address");
            }}
            data-name="phoneno2"
            label="PhoneNo2"
            variant="outlined"
            value={ReturnData.PhoneNo2}
            onChange={handleReturnDataChange}
            name="PhoneNo2"
          />
          <TextField
            className={classes.textField}
            disabled={isDisabled()}
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "remarks");
            }}
            data-name="address"
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
            disabled={isDisabled()}
            label="Remarks"
            onKeyDown={(e) => {
              handleEnterKeyDown(e, "tile");
            }}
            data-name="remarks"
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
            disabled={isDisabled()}
            color="primary"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setReturnData((prev) => ({ ...prev, showStockTable: true }));
            }}
            data-name="tile"
          >
            Select Item
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
                    disabled={isDisabled()}
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
            onClick={handleCloseConfirmation}
          >
            Close
          </Button>
        </Grid>
      </Grid>
      {ReturnData.showStockTable ? (
        <StockTable
          showStockTable={ReturnData.showStockTable}
          closeModal={() => {
            setReturnData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}

      {ReturnData.showMerchantTable ? (
        <MerchantTable
          showMerchantTable={ReturnData.showMerchantTable}
          closeModal={() => {
            setReturnData((prev) => ({ ...prev, showMerchantTable: false }));
          }}
          onMerchantDataSelect={onMerchantSelect}
        />
      ) : null}
      {ReturnData.showConfirmation ? (
        <ConfirmationModal
          showConfirmation={ReturnData.showConfirmation}
          closeConfirmation={() => {
            setReturnData((prev) => ({ ...prev, showConfirmation: false }));
          }}
          okBtnCallBack={props.closeModal}
        ></ConfirmationModal>
      ) : null}
    </div>
  );
}
