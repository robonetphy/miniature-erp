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
  const [TypeData, setTypeData] = useState({
    TableData: [],
    Type: "",
  });
  const handleTypeDataChange = (event) => {
    setTypeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const save = () => {
    console.log(TypeData);
  };
  const handleAddType = () => {
    save();
    setTypeData((prev) => ({
      ...prev,
      TableData: [[prev.Type], ...prev.TableData],
      Type: "",
    }));
  };
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
            data-navigation="true"
            autoFocus={true}
            className={classes.textField}
            value={TypeData.Type}
            onChange={handleTypeDataChange}
            name="Type"
            label="Type"
            variant="outlined"
            margin="normal"
            fullWidth={true}
          />
        </Grid>
        <Grid item sm={6}>
          <Button
            data-navigation="true"
            variant="contained"
            Type="large"
            color="primary"
            className={classes.Typebutton}
            onClick={handleAddType}
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
          data: TypeData.TableData,
        }}
      ></CustomTable>
    </div>
  );
}
