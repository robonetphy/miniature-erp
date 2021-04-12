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
export default function ManageSize() {
  const classes = useStyles();
  const containerRef = useRef(null);
  const [SizeData, setSizeData] = useState({
    TableData: [],
    Size: "",
  });
  const handleSizeDataChange = (event) => {
    setSizeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const save = () => {
    console.log(SizeData);
  };
  const handleAddSize = () => {
    save();
    setSizeData((prev) => ({
      ...prev,
      TableData: [[prev.Size], ...prev.TableData],
      Size: "",
    }));
  };
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
            value={SizeData.Size}
            onChange={handleSizeDataChange}
            name="Size"
            label="Size"
            variant="outlined"
            margin="normal"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={6}>
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={handleAddSize}
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
          fixedHeader: true,
          tableBodyHeight: "500px",
          selectableRows: "none",
          data: SizeData.TableData,
        }}
      ></CustomTable>
    </div>
  );
}
