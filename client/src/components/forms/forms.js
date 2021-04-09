import CreateStock from "./stockForm";
import CreateBreakage from "./breakageForm";
import CreateCompany from "./companyForm";
import CreateInvoice from "./invoiceForm";
import ManageHSN from "./hsnForm";
import ManageSize from "./sizeForm";
import ManageType from "./typeForm";
import AddMerchant from "./merchantForm";
import CreateReturn from "./returnForm";
import CreatePurchase from "./purchaseForm";
import ManageWeight from "./weightForm";
import ChangeRate from "./rateForm";
export {
  CreateStock,
  CreatePurchase,
  CreateInvoice,
  CreateBreakage,
  CreateReturn,
  CreateCompany,
  AddMerchant,
  ManageHSN,
  ManageType,
  ManageSize,
  ManageWeight,
  ChangeRate,
};
// import React, { useState, useRef } from "react";
// import {
//   TextField,
//   Grid,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   Typography,
//   makeStyles,
// } from "@material-ui/core";
// import CustomTable from "../table";
// import useEnterNavigation from "../../hooks/useEnterNavigation";
// import { v4 as uuidv4 } from "uuid";
// function createData(name, qty, rate, amount) {
//   return { name, qty, rate, amount };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24),
//   createData("Ice cream sandwich", 237, 9.0, 37),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
//   createData("Eclair", 262, 16.0, 24),
// ];
// function createData2(size, product, company, type, qty, rate, subtotal) {
//   return { size, product, company, type, qty, rate, subtotal };
// }

// const rows2 = [
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
//   createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
// ];
// function createData3(size, product, qty, rate, discount, subtotal, hsn) {
//   return { size, product, qty, rate, discount, subtotal, hsn };
// }

// const rows3 = [
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
//   createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
// ];
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     padding: theme.spacing(1),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     width: "95vw",
//     height: "95vh",
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: "10px",
//     bosmhadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     overflowX: "hidden",
//   },
//   textField: {
//     margin: "1% 2%",
//   },
//   returnlabel: {
//     fontSize: "1rem",
//     padding: "17.5px 14px;",
//     textAlign: "left",
//   },
//   label: {
//     fontSize: "1rem",
//     padding: "17.5px 14px;",
//     textAlign: "right",
//   },
//   container: {
//     marginTop: "10px",
//   },
//   stockbutton: {
//     margin: "2% 1%",
//   },
//   button: {
//     margin: "1% 1%",
//   },
//   Typebutton: {
//     margin: "1% 5%",
//   },
//   table: {
//     minWidth: 650,
//   },
//   borderCheck: {
//     border: "2px solid red",
//   },
//   tableContainer: {
//     maxHeight: 350,
//   },
// }));
