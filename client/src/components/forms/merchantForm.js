import React, { useState, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useEnterNavigation from "../../hooks/useEnterNavigation";
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "1% 2%",
  },
  returnlabel: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "left",
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

export default function AddMerchant() {
  const classes = useStyles();
  const [State, setState] = useState("");
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
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
          Name
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Address
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 1
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Phone No 2
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Email
        </Typography>
        <Typography gutterBottom className={classes.label}>
          PAN No
        </Typography>
        <Typography gutterBottom className={classes.label}>
          State
        </Typography>
        <Typography gutterBottom className={classes.label}>
          GSTIN
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Name"
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
          label="Phone No 1"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Phone No 2"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="PAN No"
          variant="outlined"
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={State}
          className={classes.textField}
          onChange={handleStateChange}
          variant="outlined"
          fullWidth={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>JK</MenuItem>
          <MenuItem value={20}>MP</MenuItem>
          <MenuItem value={30}>UP</MenuItem>
        </Select>
        <TextField
          data-navigation="true"
          className={classes.textField}
          id="outlined-basic"
          label="GSTIN"
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
