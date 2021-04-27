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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { v4 as uuidv4 } from "uuid";
import { StockTable, MerchantTable } from "../customTables";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  label: {
    fontSize: "1rem",
    padding: "18px 14px;",
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
const IndianState = [
  { code: "N/A", title: "None" },
  { code: "AN", title: "Andaman and Nicobar Islands" },
  { code: "AP", title: "Andhra Pradesh" },
  { code: "AR", title: "Arunachal Pradesh" },
  { code: "AS", title: "Assam" },
  { code: "BR", title: "Bihar" },
  { code: "CG", title: "Chandigarh" },
  { code: "CH", title: "Chhattisgarh" },
  { code: "DN", title: "Dadra and Nagar Haveli" },
  { code: "DD", title: "Daman and Diu" },
  { code: "DL", title: "Delhi" },
  { code: "GA", title: "Goa" },
  { code: "GJ", title: "Gujarat" },
  { code: "HR", title: "Haryana" },
  { code: "HP", title: "Himachal Pradesh" },
  { code: "JK", title: "Jammu and Kashmir" },
  { code: "JH", title: "Jharkhand" },
  { code: "KA", title: "Karnataka" },
  { code: "KL", title: "Kerala" },
  { code: "LA", title: "Ladakh" },
  { code: "LD", title: "Lakshadweep" },
  { code: "MP", title: "Madhya Pradesh" },
  { code: "MH", title: "Maharashtra" },
  { code: "MN", title: "Manipur" },
  { code: "ML", title: "Meghalaya" },
  { code: "MZ", title: "Mizoram" },
  { code: "NL", title: "Nagaland" },
  { code: "OR", title: "Odisha" },
  { code: "PY", title: "Puducherry" },
  { code: "PB", title: "Punjab" },
  { code: "RJ", title: "Rajasthan" },
  { code: "SK", title: "Sikkim" },
  { code: "TN", title: "Tamil Nadu" },
  { code: "TS", title: "Telangana" },
  { code: "TR", title: "Tripura" },
  { code: "UP", title: "Uttar Pradesh" },
  { code: "UK", title: "Uttarakhand" },
  { code: "WB", title: "West Bengal" },
];
export default function CreateInvoice(props) {
  const classes = useStyles();
  const containerRef = useRef(null);
  // useEnterNavigation(containerRef);
  const [InvoiceData, setInvoiceData] = useState({
    Remarks: props.Remarks ?? "",
    TotalQty: props.TotalQty ?? 0,
    TotalAmount: props.TotalAmount ?? 0,
    Count: props.Count ?? 0,
    TableRows: props.TableRows ?? [],
    MerchantName: props.MerchantName ?? "",
    Date: props.Date ?? new Date().toISOString().substring(0, 10),
    Address: props.Address ?? "",
    PhoneNo1: props.PhoneNo1 ?? "",
    PhoneNo2: props.PhoneNo2 ?? "",
    State: props.State ?? { code: "N/A", title: "None" },
    PaymentType: props.PaymentType ?? "N/A",
    TransportDetails: props.TransportDetails ?? "",
    Transport: props.Transport ?? "",
    Weight: props.Weight ?? 0,
    ShippedTo: props.ShippedTo ?? {},
    GSTIN: props.GSTIN ?? "",
    showMerchantTable: false,
    showStockTable: false,
    showMerchantCallback: null,
  });
  const save = () => {
    //Send Data to Server
    console.log(InvoiceData);
  };
  const onMerchantSelect = (data) => {
    if (data)
      setInvoiceData((prev) => {
        const {
          name: Merchant,
          address: Address,
          phone1: PhoneNo1,
          phone2: PhoneNo2,
          gstin: GSTIN,
        } = data;
        return {
          ...prev,
          MerchantName: Merchant,
          Address: Address,
          PhoneNo1: PhoneNo1,
          PhoneNo2: PhoneNo2,
          GSTIN: GSTIN,
          showMerchantTable: false,
        };
      });
    handleNextFocus("address");
  };
  const onShippedToSelect = (data) => {
    if (data)
      setInvoiceData((prev) => {
        const {
          name: Merchant,
          address: Address,
          phone1: PhoneNo1,
          phone2: PhoneNo2,
          gstin: GSTIN,
        } = data;
        return {
          ...prev,
          ShippedTo: {
            MerchantName: Merchant,
            Address: Address,
            PhoneNo1: PhoneNo1,
            PhoneNo2: PhoneNo2,
            GSTIN: GSTIN,
          },
          showMerchantTable: false,
        };
      });
    handleNextFocus("tile");
  };
  const onTileSelect = (data) => {
    if (data)
      setInvoiceData((prev) => {
        const {
          name: Product,
          size: Size,
          qty: Qty,
          rate: Rate,
          hsn: HSN,
        } = data;
        let TotalQty = prev.TotalQty + parseInt(Qty);
        let TotalAmount = prev.TotalAmount + parseInt(Qty) * parseInt(Rate);
        let Count = prev.Count + 1;
        return {
          ...prev,
          TotalQty: TotalQty,
          TotalAmount: TotalAmount,
          Count: Count,
          TableRows: [
            {
              size: Size,
              product: Product,
              qty: Qty,
              rate: Rate,
              hsn: HSN,
              discount: 0,
              subtotal: parseInt(Rate) * parseInt(Qty),
              key: uuidv4(),
            },
            ...prev.TableRows,
          ],
          showStockTable: false,
        };
      });
  };
  const handleInvoiceDataChange = (event, newValue) => {
    setInvoiceData((prev) => ({
      ...prev,
      [event.target.name]: newValue ?? event.target.value,
    }));
  };

  const handleRemove = (indexOfRow) => {
    setInvoiceData((prev) => {
      let TotalQty =
        prev.TotalQty - parseInt(prev.TableRows[indexOfRow]["qty"]);
      let TotalAmount =
        prev.TotalAmount - parseInt(prev.TableRows[indexOfRow]["subtotal"]);
      let Count = parseInt(prev.Count) - 1;
      const TableRows = prev.TableRows.filter(
        (data, index) => index !== indexOfRow
      );
      return {
        ...prev,
        TotalQty: TotalQty,
        TotalAmount: TotalAmount,
        Count: Count,
        TableRows: TableRows,
      };
    });
  };
  const handleUpdate = (indexOfRow, value, name) => {
    setInvoiceData((prev) => {
      let TotalQty = 0;
      let TotalAmount = 0;
      const TableRows = prev.TableRows.map((data, index) => {
        if (index === indexOfRow) {
          data[name] = value;
          data["subtotal"] = parseInt(data["qty"]) * parseInt(data["rate"]);
          data["subtotal"] -=
            (parseInt(data["discount"]) * data["subtotal"]) / 100;
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
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Date
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Merchant
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Address
          </Typography>
          <Typography gutterBottom className={classes.label}>
            GSTIN
          </Typography>
          <Typography gutterBottom className={classes.label}>
            State
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            autoFocus={true}
            className={classes.textField}
            label="Date"
            value={InvoiceData.Date}
            onChange={handleInvoiceDataChange}
            name="Date"
            type="date"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("merchant");
              }
            }}
            fullWidth={true}
          />
          <TextField
            className={classes.textField}
            label="Name"
            value={InvoiceData.MerchantName}
            onChange={handleInvoiceDataChange}
            name="MerchantName"
            disabled={true}
            variant="outlined"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            data-name="merchant"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setInvoiceData((prev) => ({
                ...prev,
                showMerchantTable: true,
                showMerchantCallback: onMerchantSelect,
              }));
            }}
          >
            Select Merchant
          </Button>
          <TextField
            className={classes.textField}
            label="Address"
            variant="outlined"
            value={InvoiceData.Address}
            onChange={handleInvoiceDataChange}
            name="Address"
            data-name="address"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("gstin");
              }
            }}
            fullWidth={true}
          />
          <TextField
            className={classes.textField}
            label="GSTIN"
            value={InvoiceData.GSTIN}
            onChange={handleInvoiceDataChange}
            name="GSTIN"
            fullWidth={true}
            data-name="gstin"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("state");
              }
            }}
            variant="outlined"
          />
          <Autocomplete
            options={IndianState}
            getOptionLabel={(option) => option.title}
            getOptionSelected={(option) =>
              option.code === InvoiceData.State.code
            }
            value={InvoiceData.State}
            name="State"
            fullWidth
            className={classes.textField}
            onChange={handleInvoiceDataChange}
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
                label="state"
                data-name="state"
                onKeyDown={(e) => {
                  if (e.which === 13) {
                    handleNextFocus("phoneno1");
                  }
                }}
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Typography gutterBottom className={classes.label}>
            Phone No
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Transport Detail
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Remarks
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Payment Type
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            className={classes.textField}
            label="Phone No1"
            value={InvoiceData.PhoneNo1}
            onChange={handleInvoiceDataChange}
            name="PhoneNo1"
            variant="outlined"
            data-name="phoneno1"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("phoneno2");
              }
            }}
          />
          <TextField
            className={classes.textField}
            label="Phone No2"
            value={InvoiceData.PhoneNo2}
            onChange={handleInvoiceDataChange}
            name="PhoneNo2"
            variant="outlined"
            data-name="phoneno2"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("transportdetails");
              }
            }}
          />
          <TextField
            className={classes.textField}
            data-name="transportdetails"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("remarks");
              }
            }}
            label="Transport Details"
            value={InvoiceData.TransportDetails}
            onChange={handleInvoiceDataChange}
            name="TransportDetails"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            className={classes.textField}
            label="Remarks"
            data-name="remarks"
            onKeyDown={(e) => {
              if (e.which === 13) {
                handleNextFocus("paymenttype");
              }
            }}
            value={InvoiceData.Remarks}
            onChange={handleInvoiceDataChange}
            name="Remarks"
            variant="outlined"
            fullWidth={true}
          />
          <Autocomplete
            options={[
              "N/A",
              "Cash",
              "Check",
              "Card",
              "Mobile Payment",
              "Electronic Bank Transfers",
            ]}
            value={InvoiceData.PaymentType}
            onChange={handleInvoiceDataChange}
            name="PaymentType"
            fullWidth
            className={classes.textField}
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
                label="payment"
                data-name="paymenttype"
                onKeyDown={(e) => {
                  if (e.which === 13) {
                    handleNextFocus("shippedto");
                  }
                }}
                variant="outlined"
              />
            )}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            data-name="shippedto"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setInvoiceData((prev) => ({
                ...prev,
                showMerchantTable: true,
                showMerchantCallback: onShippedToSelect,
              }));
            }}
          >
            Shipped To
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={() => {
              containerRef.current.querySelector(":focus").blur();
              setInvoiceData((prev) => ({ ...prev, showStockTable: true }));
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
              <TableCell>QTY</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Sub Total</TableCell>
              <TableCell>HSN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {InvoiceData.TableRows.map((row, index) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.product}
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
                      handleEnterKeyDown(e, "[data-name=discount]");
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    data-name="discount"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(e) => {
                      handleUpdate(index, e.target.value, "discount");
                    }}
                    onKeyDown={(e) => {
                      handleDeleteKeyDown(e, index);
                      handleEnterKeyDown(e, "[data-name=tile]");
                    }}
                    value={row.discount}
                  />
                </TableCell>
                <TableCell>{row.subtotal} </TableCell>
                <TableCell component="th" scope="row">
                  {row.hsn}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Weight : {InvoiceData.Weight}</TableCell>
            <TableCell align="right">Count : {InvoiceData.Count}</TableCell>
            <TableCell align="left">
              Total Qty : {InvoiceData.TotalQty}
            </TableCell>
            <TableCell colSpan={2} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">{InvoiceData.TotalAmount}</TableCell>
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
            Transport
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            className={classes.textField}
            label="Transport"
            variant="outlined"
            value={InvoiceData.Transport}
            onChange={handleInvoiceDataChange}
            name="Transport"
            fullWidth={true}
          />
        </Grid>

        <Grid item sm={6} className={classes.label}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Print
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            onClick={save}
          >
            {props.mode ?? "Save"}
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
      {InvoiceData.showStockTable ? (
        <StockTable
          showStockTable={InvoiceData.showStockTable}
          closeModal={() => {
            setInvoiceData((prev) => ({ ...prev, showStockTable: false }));
          }}
          onTileDataSelect={onTileSelect}
        />
      ) : null}

      {InvoiceData.showMerchantTable ? (
        <MerchantTable
          showMerchantTable={InvoiceData.showMerchantTable}
          closeModal={() => {
            setInvoiceData((prev) => ({ ...prev, showMerchantTable: false }));
          }}
          onMerchantDataSelect={InvoiceData.showMerchantCallback}
        />
      ) : null}
    </div>
  );
}
