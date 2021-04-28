import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomTable from "../table";
import { v4 as uuidv4 } from "uuid";
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
export default function ManageSize(props) {
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
      TableData: [{ size: prev.Size, key: uuidv4() }, ...prev.TableData],
      Size: "",
    }));
  };
  useEnterNavigation(containerRef);
  const handleEscape = useCallback(
    (e) => {
      if (e.which === 27) {
        props.closeModal();
      }
    },
    [props]
  );
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("keydown", handleEscape);
    return () => {
      container.removeEventListener("keydown", handleEscape);
    };
  }, [containerRef, handleEscape]);
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
          columns: [{ title: "Size", id: "size" }],
          title: "",
          tableBodyHeight: "500px",
          data: SizeData.TableData,
          autoFocus: false,
        }}
      ></CustomTable>
    </div>
  );
}
