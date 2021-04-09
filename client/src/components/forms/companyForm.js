import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
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
  container: {
    marginTop: "10px",
  },
  button: {
    margin: "1% 1%",
  },
}));

export default function CreateCompany() {
  const classes = useStyles();
  const containerRef = useRef(null);
  useEnterNavigation(containerRef);
  return (
    <Grid
      ref={containerRef}
      container
      spacing={3}
      className={classes.container}
    >
      <Grid item sm={3}>
        <Typography gutterBottom className={classes.label}>
          Company
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No.
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Company"
          variant="outlined"
          fullWidth={true}
        />
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
          label="Phone No"
          variant="outlined"
          fullWidth={true}
        />
      </Grid>
      <Grid item sm={12} style={{ textAlignLast: "right" }}>
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
  );
}
