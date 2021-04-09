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
import useEnterNavigation from "../../hooks/useEnterNavigation";
import { v4 as uuidv4 } from "uuid";
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

export default function CreateInvoice() {
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
}
