import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomTable from "../table";
import useEnterNavigation from "../../hooks/useEnterNavigation";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  label: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
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
}));
export default function ManageType() {
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
          fixedHeader: true,
          tableBodyHeight: "500px",
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
}
