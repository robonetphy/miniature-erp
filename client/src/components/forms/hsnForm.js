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

export default function ManageHSN() {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  const [HSNData, setHSNData] = useState({
    TableData: [],
    HSNCode: "",
    HSN: "",
  });
  const handleHSNDataChange = (event) => {
    setHSNData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const save = () => {
    console.log(HSNData);
  };
  const handleAddHSN = () => {
    save();
    setHSNData((prev) => ({
      ...prev,
      TableData: [[prev.HSNCode, prev.HSN], ...prev.TableData],
      HSNCode: "",
      HSN: "",
    }));
  };
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
            label="HSN Code"
            variant="outlined"
            margin="normal"
            value={HSNData.HSNCode}
            onChange={handleHSNDataChange}
            name="HSNCode"
          />
          <TextField
            data-navigation="true"
            className={classes.textField}
            label="HSN %"
            variant="outlined"
            margin="normal"
            value={HSNData.HSN}
            onChange={handleHSNDataChange}
            name="HSN"
          />
          <Button
            data-navigation="true"
            variant="contained"
            size="large"
            color="primary"
            className={classes.Typebutton}
            onClick={handleAddHSN}
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
          fixedHeader: true,
          tableBodyHeight: "500px",
          selectableRows: "none",
          data: HSNData.TableData,
        }}
      ></CustomTable>
    </div>
  );
}
