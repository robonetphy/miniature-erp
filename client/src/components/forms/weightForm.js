import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
  Select,
  MenuItem,
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
    margin: "2% 0%",
    width: "50%",
  },
  Clearbutton: {
    margin: "2% 0%",
    width: "100%",
  },
  SelectedItems: {
    display: "inline-block",
    fontSize: "1rem",
    textAlign:"center",
    width: "50%",
  },
}));
export default function ManageWeight() {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [Size, setSize] = useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const [Type, setType] = useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  useEnterNavigation(containerRef);
  return (
    <div ref={containerRef}>
      <Grid container className={classes.button} spacing={3}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Size
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Type
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Company
          </Typography>
          <Typography gutterBottom className={classes.label}>
            Product
          </Typography>
        </Grid>
        <Grid item sm={3}>
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
            <MenuItem value={10}>Size A</MenuItem>
            <MenuItem value={20}>Size A</MenuItem>
            <MenuItem value={30}>Size A</MenuItem>
          </Select>
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
          <span className={classes.SelectedItems}>ALL</span>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            Select Company
          </Button>
          <span className={classes.SelectedItems}>ALL</span>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
          >
            Select Product
          </Button>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Clearbutton}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.button}>
        <Grid item sm={1}>
          <Typography gutterBottom className={classes.label}>
            Weight
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <TextField
            data-navigation="true"
            className={classes.textField}
            label="Weight"
            variant="outlined"
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <CustomTable
        {...{
          columns: ["Name","Company","Size","Type","Weight"],
          isSearchEnable: true,
          title: "",
          selectableRows: "none",
          fixedHeader: true,
          tableBodyHeight: "300px",
          data: [
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","16X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
             ["Abc","XYZ","18X19","ABS","100%"],
          ],
        }}
      ></CustomTable>
    </div>
  );
}
