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
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomTable from "../table";
import useEnterNavigation from "../../hooks/useEnterNavigation";
import { v4 as uuidv4 } from "uuid";
function createData(name, qty, rate, amount) {
  return { name, qty, rate, amount };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
  createData("Eclair", 262, 16.0, 24),
];
function createData2(size, product, company, type, qty, rate, subtotal) {
  return { size, product, company, type, qty, rate, subtotal };
}

const rows2 = [
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
  createData2("Frozen yoghurt", "asda", "asdas", "asdas", 159, 6.0, 24),
];
function createData3(size, product, qty, rate, discount, subtotal, hsn) {
  return { size, product, qty, rate, discount, subtotal, hsn };
}

const rows3 = [
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
  createData3("18'", "asda", 15, 159, 6.0, 2434, "asd"),
];
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "95vw",
    height: "95vh",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    bosmhadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowX: "hidden",
  },
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
  container: {
    marginTop: "10px",
  },
  stockbutton: {
    margin: "2% 1%",
  },
  button: {
    margin: "1% 1%",
  },
  Typebutton: {
    margin: "1% 5%",
  },
  table: {
    minWidth: 650,
  },
  borderCheck: {
    border: "2px solid red",
  },
  tableContainer: {
    maxHeight: 350,
  },
}));
export const ManageHSN = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            HSN
          </Typography>
        </Grid>
        <Grid item sm={8}>
          <TextField
            data-navigation="true"
            autoFocus={true}
            className={classes.textField}
            id="outlined-basic"
            label="HSN Code"
            variant="outlined"
            margin="normal"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="HSN %"
            variant="outlined"
            margin="normal"
          />
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        {...{
          columns: ["HSN Code", "HSN %"],
          isSearchEnable: true,
          title: "",
          rowsPerPage: 8,
          selectableRows: "none",
          data: [
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
            ["Abc", "12%"],
          ],
        }}
      ></CustomTable>
    </div>
  );
};
export const ManageSize = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Size
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <TextField
            data-navigation="true"
            autoFocus={true}
            className={classes.textField}
            id="outlined-basic"
            label="Size"
            variant="outlined"
            margin="normal"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={3} alignItems="right">
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        {...{
          columns: ["Size"],
          isSearchEnable: true,
          title: "",
          rowsPerPage: 8,
          selectableRows: "none",
          data: [
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
            ["10x10"],
          ],
        }}
      ></CustomTable>
    </div>
  );
};
export const ManageType = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Type
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <TextField
            autoFocus={true}
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Type"
            variant="outlined"
            margin="normal"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={3} alignItems="right">
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        {...{
          columns: ["Type"],
          isSearchEnable: true,
          title: "",
          rowsPerPage: 8,
          selectableRows: "none",
          data: [
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
            ["type1"],
          ],
        }}
      ></CustomTable>
    </div>
  );
};
export const CreateInvoice = () => {
  const classes = useStyles();
  const [State, setState] = useState("");
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
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
        </Grid>
        <Grid item sm={4}>
          <TextField
            autoFocus={true}
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Date"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Select Merchant
          </Button>
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="GSTIN"
            variant="outlined"
          />
          <Select
            data-navigation="true"
            value={State}
            className={classes.textField}
            onChange={handleStateChange}
            variant="outlined"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>JK</MenuItem>
            <MenuItem value={20}>MP</MenuItem>
            <MenuItem value={30}>UP</MenuItem>
          </Select>
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
          <Select
            data-navigation="true"
            value={State}
            className={classes.textField}
            onChange={handleStateChange}
            variant="outlined"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>JK</MenuItem>
            <MenuItem value={20}>MP</MenuItem>
            <MenuItem value={30}>UP</MenuItem>
          </Select>
        </Grid>
        <Grid item sm={4}>
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="No1"
            variant="outlined"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="No1"
            variant="outlined"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Transport Details"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Shipped To
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
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
              <TableCell>QTY</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Sub Total</TableCell>
              <TableCell>HSN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows3.map((row) => (
              <TableRow key={uuidv4()}>
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.product}
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.rate}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.discount}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.subtotal}
                  />
                </TableCell>
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
            <TableCell align="right">Weight : 0</TableCell>
            <TableCell align="right">Count : 0</TableCell>
            <TableCell align="left">Total Qty : 100</TableCell>
            <TableCell colSpan={2} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">100</TableCell>
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
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Transport"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>

        <Grid item sm={6} className={classes.label}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Print
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export const AddMerchant = () => {
  const classes = useStyles();
  const [State, setState] = useState("");
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <Grid
      ref={containerRef}
      container
      spacing={3}
      className={classes.container}
    >
      <Grid item sm={3}>
        <Typography gutterBottom className={classes.label}>
          Name
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 1
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 2
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Email
        </Typography>
        <Typography gutterBottom className={classes.label}>
          PAN No
        </Typography>
        <Typography gutterBottom className={classes.label}>
          State
        </Typography>
        <Typography gutterBottom className={classes.label}>
          GSTIN
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Phone No 1"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Phone No 2"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="PAN No"
          variant="outlined"
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={State}
          className={classes.textField}
          onChange={handleStateChange}
          variant="outlined"
          fullWidth={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>JK</MenuItem>
          <MenuItem value={20}>MP</MenuItem>
          <MenuItem value={30}>UP</MenuItem>
        </Select>
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="GSTIN"
          variant="outlined"
          fullWidth={true}
        />
      </Grid>
      <Grid item sm={12} style={{ textAlignLast: "right" }}>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Again
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Close
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
};
export const CreateReturn = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container spacing={1} className={classes.button}>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.label}>
            Last Return
          </Typography>
          <TextField
            autoFocus={true}
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2}>
          <Typography gutterBottom className={classes.returnlabel}>
            R-1
          </Typography>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Select Merchant
          </Button>
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Typography gutterBottom className={classes.label}>
            Merchant Date
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
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Date"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="No1"
            variant="outlined"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="No1"
            variant="outlined"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="No2"
            variant="outlined"
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
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
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
            {rows2.map((row) => (
              <TableRow key={uuidv4()}>
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
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.rate}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.subtotal}
                  />
                </TableCell>
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
            <TableCell align="left">100</TableCell>
            <TableCell colSpan={2} align="right">
              Total Qty
            </TableCell>
            <TableCell align="left">100</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">100</TableCell>
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
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Print &#38; Save
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Again
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Close
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export const CreateBreakage = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Remarks
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <TextField
            autoFocus={true}
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
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
            {rows2.map((row) => (
              <TableRow key={uuidv4()}>
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
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.rate}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.subtotal}
                  />
                </TableCell>
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
            <TableCell align="left">100</TableCell>
            <TableCell colSpan={2} align="right">
              Total Qty
            </TableCell>
            <TableCell align="left">100</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">100</TableCell>
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
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Print &#38; Save
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Again
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Close
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export const CreateStock = () => {
  const classes = useStyles();
  const [Size, setSize] = useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const [Type, setType] = useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const [HSN, setHSN] = useState("");
  const handleHSNChange = (event) => {
    setHSN(event.target.value);
  };

  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <Grid
      ref={containerRef}
      container
      spacing={3}
      className={classes.container}
    >
      <Grid item sm={3}>
        <Typography gutterBottom className={classes.label}>
          Company
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Name
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Size
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Initial QTY
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Type
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Rate
        </Typography>
        <Typography gutterBottom className={classes.label}>
          HSN/SAC
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          label="Company Name"
          variant="outlined"
          // fullWidth={true}
        />
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.stockbutton}
        >
          Select Company
        </Button>
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Tile's Name"
          variant="outlined"
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={Size}
          className={classes.textField}
          onChange={handleSizeChange}
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
        <TextField
          data-navigation="true"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={0}
          label="Initial QTY"
          variant="outlined"
          className={classes.textField}
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={Type}
          className={classes.textField}
          onChange={handleTypeChange}
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
        <TextField
          data-navigation="true"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={0}
          label="Rate"
          variant="outlined"
          className={classes.textField}
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={HSN}
          className={classes.textField}
          onChange={handleHSNChange}
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
      </Grid>
      <Grid item sm={12} style={{ textAlignLast: "right" }}>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Again
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Close
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
};
export const CreatePurchase = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
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
            data-navigation="true"
            autoFocus={true}
            id="date"
            label="Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Title  "
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={2} className={classes.label}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Select Tile
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
            {rows.map((row) => (
              <TableRow key={uuidv4()}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.rate}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    data-navigation="true"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={row.amount}
                  />
                </TableCell>
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
            <TableCell align="left">100</TableCell>
            <TableCell colSpan={1} align="right">
              Total Amount
            </TableCell>
            <TableCell align="left">100</TableCell>
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
            data-navigation="true"
            className={classes.textField}
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={7} className={classes.label}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Again
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Save &#38; Close
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export const CreateCompany = () => {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <Grid
      ref={containerRef}
      container
      spacing={3}
      className={classes.container}
    >
      <Grid item sm={3}>
        <Typography gutterBottom className={classes.label}>
          Company
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No.
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Company"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Phone No"
          variant="outlined"
          fullWidth={true}
        />
      </Grid>
      <Grid item sm={12} style={{ textAlignLast: "right" }}>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Again
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Save &#38; Close
        </Button>
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
};
