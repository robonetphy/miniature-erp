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
import useEnterNavigation from "../../hooks/useEnterNavigation";
import { v4 as uuidv4 } from "uuid";

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

export default function CreateBreakage (){
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
