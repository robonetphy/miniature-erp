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

export default function CreatePurchase() {
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
}
