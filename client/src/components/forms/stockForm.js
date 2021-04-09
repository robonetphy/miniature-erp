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
  label: {
    fontSize: "1rem",
    padding: "17.5px 14px;",
    textAlign: "right",
  },
  container: {
    marginTop: "10px",
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

export default function CreateStock() {
  const classes = useStyles();
  const [Size, setSize] = useState("");
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const [Type, setType] = useState("");
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const [HSN, setHSN] = useState("");
  const handleHSNChange = (event) => {
    setHSN(event.target.value);
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
          Company
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Name
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Size
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Initial QTY
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Type
        </Typography>
        <Typography gutterBottom className={classes.label}>
          Rate
        </Typography>
        <Typography gutterBottom className={classes.label}>
          HSN/SAC
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <TextField
          autoFocus={true}
          data-navigation="true"
          className={classes.textField}
          label="Company Name"
          variant="outlined"
          // fullWidth={true}
        />
        <Button
          data-navigation="true"
          variant="contained"
          size="large"
          color="primary"
          className={classes.stockbutton}
        >
          Select Company
        </Button>
        <TextField
          data-navigation="true"
          className={classes.textField}
          label="Tile's Name"
          variant="outlined"
          fullWidth={true}
        />
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
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <TextField
          data-navigation="true"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={0}
          label="Initial QTY"
          variant="outlined"
          className={classes.textField}
          fullWidth={true}
        />
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
        <TextField
          data-navigation="true"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={0}
          label="Rate"
          variant="outlined"
          className={classes.textField}
          fullWidth={true}
        />
        <Select
          data-navigation="true"
          value={HSN}
          className={classes.textField}
          onChange={handleHSNChange}
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
