import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useSelector } from "react-redux";

function EditToolbar(props) {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const { setRows, setRowModesModel } = props;

  if (!isLoggedIn) return null; // If not logged in, don't render add record

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "Make" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { cars } = useSelector((state) => state.getCarsReducer); // we are taking the cars in database
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const [rows, setRows] = React.useState(cars);
  const [rowModesModel, setRowModesModel] = React.useState({});

  // modifying rows
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "Make", headerName: "Make", width: 150, editable: true },
    { field: "Model", headerName: "Model", width: 150, editable: true },
    {
      field: "Year",
      headerName: "Year",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Engine Type",
      headerName: "Engine Type",
      width: 160,
      type: "singleSelect",
      valueOptions: ["DIESEL", "HYBRID", "ELECTRIC", "GASOLINE"],
      editable: true,
    },
    {
      field: "Gear Box",
      headerName: "Gear Box",
      width: 160,
      type: "singleSelect",
      valueOptions: ["AUTOMATIC", "MANUAL"],
      editable: true,
    },
    {
      field: "Condition",
      headerName: "Condition",
      width: 160,
      type: "singleSelect",
      valueOptions: ["USED", "NEW", "PARTS"],
      editable: true,
    },
    {
      field: "Horse Power",
      headerName: "Horse Power",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "Color", headerName: "Color", width: 130, editable: true },
    {
      field: "Price $",
      headerName: "Price",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "City",
      headerName: "City",
      width: 130,
      type: "singleSelect",
      valueOptions: ["Sofia", "Varna", "Plovdiv"],
      editable: true,
    },
    {
      field: "Mileage",
      headerName: "Mileage",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "Extras", headerName: "Extras", width: 200, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        isLoggedIn ? (
          rowModesModel[params.id]?.mode === GridRowModes.Edit ? (
            <React.Fragment>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(params.id)}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(params.id)}
                color="inherit"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={handleEditClick(params.id)}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(params.id)}
                color="inherit"
              />
            </React.Fragment>
          )
        ) : null, // If not logged in, don't show edit/delete actions
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: isLoggedIn ? EditToolbar : null,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
