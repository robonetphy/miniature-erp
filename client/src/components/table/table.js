import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
  const themeWithoutTitle = createMuiTheme({
    overrides: { MUIDataTableToolbar: { root: { display: "none" } } },
  });
  
  const outerElement = useRef(null);
  useArrowNavigation(outerElement);
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
