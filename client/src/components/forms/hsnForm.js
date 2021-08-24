import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
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

export default function ManageHSN(props) {
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
      TableData: [
        { hsncode: prev.HSNCode, hsn: prev.HSN, key: uuidv4() },
        ...prev.TableData,
      ],
      HSNCode: "",
      HSN: "",
    }));
  };
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
          columns: [
            { title: "HSN Code", id: "hsncode" },
            { title: "HSN %", id: "hsn" },
          ],
          title: "",
          tableBodyHeight: "500px",
          data: HSNData.TableData,
          autoFocus: false,
        }}
      ></CustomTable>
    </div>
  );
}
