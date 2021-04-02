import React from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
function CustomTable(props) {
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "100%",
    selectableRows: props.selectableRows ?? "single",
    // rowsPerPageOptions: [10,],
    rowsPerPage: props.rowsPerPage ?? 10,
    download: false,
    print: false,
    fixedHeader: false,
    filter: props.isFilterEnable ? true : false,
    search: props.isSearchEnable ? true : false,
    viewColumns: props.isViewColumnsEnable ? true : false,
    selectableRowsHeader: false,
    // pagination: false,
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
  // const [CurrentSelectedRow, setCurrentSelectedRow] = useState(null);
  return (
    <Grid container>
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
