import React, { useRef, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import useArrowNavigation from "../../hooks/useArrowNavigation";

function CustomTable(props) {
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: props.selectableRows ?? "single",
    rowsPerPageOptions: [10, 50, 100],
    fixedHeader: props.fixedHeader ?? false,
    tableBodyHeight: props.tableBodyHeight ?? "100%",
    rowsPerPage: 10,
    download: false,
    print: false,
    filter: props.isFilterEnable ? true : false,
    search: props.isSearchEnable ? true : false,
    viewColumns: props.isViewColumnsEnable ? true : false,
    selectableRowsHeader: false,
    // pagination: false,
    searchOpen: true,
    customToolbarSelect: () => {},
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      // setCurrentSelectedRow(rowsSelected);
    },
  };
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
  const outerElement = useRef(null);
  useArrowNavigation(outerElement, editCallback, deleteCallback);
  // const [CurrentSelectedRow, setCurrentSelectedRow] = useState(null);
  return (
    <Grid container ref={outerElement}>
      <Grid item xs={12}>
        <MUIDataTable
          title={props.title}
          data={props.data}
          columns={props.columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
}
export default CustomTable;
