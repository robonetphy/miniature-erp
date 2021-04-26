import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
  Toolbar,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
const useStyles = makeStyles({
  container: (props) => ({
    maxHeight: props.tableBodyHeight,
  }),
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#acbad4",
    },
  },
  "@global": {
    "*::-webkit-scrollbar": {
      display: "none",
    },
  },
  hover: {},
  selected: {},
  title: {
    flex: "1 1 100%",
  },
  nodataCenter: {
    textAlign: "center",
    backgroundColor: "#eee",
    padding: "10px",
  },
});
const CustomTable = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const containerRef = useRef(null);
  const [TableDataManager, setTableDataManager] = useState({
    data: props.data,
    searschText: props.searchText ?? "",
    page: 0,
    rowsPerPage: 10,
    selectedID: props.data.length ? props.data[0].key : null,
  });
  const handleChangePage = (event, newPage) => {
    setTableDataManager((prev) => ({ ...prev, page: newPage }));
  };
  const handleChangeRowsPerPage = (event) => {
    setTableDataManager((prev) => ({
      ...prev,
      page: 0,
      rowsPerPage: +event.target.value,
    }));
  };
  const onSearchTextChange = (e) => {
    setTableDataManager((prevData) => {
      let filteredData = [];
      let searchText = e.target.value ?? "";
      filteredData = props.data.filter((e) => {
        let mathesItems = Object.values(e);
        let retVal = false;
        const regex = new RegExp(searchText, "gi");
        mathesItems.forEach((e) => {
          if (typeof e !== "string") e = e.toString();
          retVal = !retVal ? e.match(regex) : retVal;
        });
        return retVal;
      });
      return {
        data: filteredData,
        searchText: searchText,
      };
    });
  };
  useImperativeHandle(ref, () => ({
    getData() {
      var allSelectable = containerRef.current.querySelectorAll(
        "[data-selected]"
      );
      var currentIndex = null;
      allSelectable.forEach((element, index) => {
        if (element.getAttribute("data-selected") === "true")
          currentIndex = index;
      });
      return props.data[currentIndex];
    },
  }));
  const editCallback = useCallback(
    (currentIndex) => {
      if (typeof props.editCallback === "function") {
        props.editCallback(props.data[currentIndex]);
      }
    },
    [props]
  );
  const deleteCallback = useCallback(
    (currentIndex) => {
      if (typeof props.deleteCallback === "function") {
        props.deleteCallback(props.data[currentIndex]);
      }
    },
    [props]
  );
  const handleKeyDown = useCallback(
    (e) => {
      // e.preventDefault();
      var allSelectable = containerRef.current.querySelectorAll(
        "[data-selected]"
      );
      var currentIndex = null,
        nextIndex = null;
      allSelectable.forEach((element, index) => {
        if (element.getAttribute("data-selected") === "true")
          currentIndex = index;
      });
      if (e.which === 38) {
        nextIndex = currentIndex - 1;
      }
      if (e.which === 40) {
        nextIndex = currentIndex + 1;
      }
      if (nextIndex === -1 || nextIndex === allSelectable.length) {
        nextIndex = currentIndex;
        const input = containerRef.current
          .querySelector('[data-search="true"]')
          .querySelector("input");
        input.focus();
      } else if (allSelectable[nextIndex]) {
        allSelectable[nextIndex].focus();
        setTableDataManager((prev) => ({
          ...prev,
          selectedID: allSelectable[nextIndex].getAttribute("data-key"),
        }));
      }
      if (e.which === 13) {
        editCallback(currentIndex);
      }
      if (e.which === 46) {
        deleteCallback(currentIndex);
      }
    },
    [editCallback, deleteCallback]
  );
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);
    setTableDataManager({
      data: props.data,
      searschText: props.searchText ?? "",
      page: 0,
      rowsPerPage: 10,
      selectedID: props.data.length ? props.data[0].key : null,
    });
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, props]);

  return (
    <Grid container ref={containerRef}>
      <Grid item xs={12}>
        <Paper>
          <Toolbar>
            <Typography className={classes.title} variant="h6" component="div">
              {props.title}
            </Typography>
            <TextField
              label="Search"
              value={TableDataManager.searchText}
              onChange={onSearchTextChange}
              data-search="true"
              autoFocus={props.autoFocus ?? true}
              className={classes.title}
            />
          </Toolbar>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {TableDataManager.data.length
                  ? TableDataManager.data
                      .slice(
                        TableDataManager.page * TableDataManager.rowsPerPage,
                        TableDataManager.page * TableDataManager.rowsPerPage +
                          TableDataManager.rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.key}
                            onClick={() => {
                              setTableDataManager((prev) => ({
                                ...prev,
                                selectedID: row.key,
                              }));
                            }}
                            selected={TableDataManager.selectedID === row.key}
                            classes={{
                              hover: classes.hover,
                              selected: classes.selected,
                            }}
                            data-selected={
                              TableDataManager.selectedID === row.key
                            }
                            data-key={row.key}
                            className={classes.tableRow}
                          >
                            {props.columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id}>{value}</TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                  : // <Typography className={classes.nodataCenter}>
                    //   No records to display
                    // </Typography>
                    null}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={TableDataManager.data.length}
            rowsPerPage={TableDataManager.rowsPerPage}
            page={TableDataManager.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
});

export default CustomTable;
