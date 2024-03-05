import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns } from "./tableColumns";

const rows = [
  //response from the BE
];

const modifiedTableColumns = tableColumns.map((column) => ({
  ...column,
  flex: 1,
}));

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={modifiedTableColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />
    </Box>
  );
}
