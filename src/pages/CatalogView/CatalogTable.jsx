import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns } from "./tableColumns";

const rows = [
  { id: 1, Make: "Snow", Model: "Jon", Year: 14 },
  { id: 2, Make: "rrgrd", Model: "Jdrgrdon", Year: 144 },
  { id: 3, Make: "Snfghow", Model: "Jodrgdn", Year: 414 },
]; // will come from BE, do they have creatorId ?

const modifiedTableColumns = tableColumns.map((column) => ({
  ...column,
  flex: 1,
}));

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        editMode="row"
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
