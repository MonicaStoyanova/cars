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

import { useSelector, useDispatch } from "react-redux";
import { createCar } from "./CatalogActions";

function EditToolbar(props) {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const { newRow, setNewRow } = props; // when we click add record the row that appears to insert values

  if (!isLoggedIn) return null; // If not logged in, don't render the button to add record

  // Handles adding the new record to the table
  const handleAddNewRecord = () => {
    const id = randomId(); // creates random id for the new entry
    newRow((oldRows) => [...oldRows, { id, isNew: true }]);
    setNewRow((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "Make" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNewRecord}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { cars } = useSelector((state) => state.getCarsReducer); // we are taking the cars from the  database
  const { isLoggedIn, userId, currentUser, password, firstName, lastName } =
    useSelector((state) => state.loginReducer); // to conditionally render actions

  const [rows, newRow] = React.useState(cars); // the cars
  const [rowModesModel, setNewRow] = React.useState({});
  const [lastSavedRow, setLastSavedRow] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    newRow(cars); // Update the rows state with the cars data
  }, [cars]); // This effect runs whenever the `cars` data changes which means that we might not need it, if we wish to not show the just added records

  // modifying rows
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setNewRow({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setNewRow({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    newRow(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setNewRow({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      newRow(rows.filter((row) => row.id !== id));
    }
  };
  // Logic for getting user input when new record is added
  const processRowUpdate = (newRowData) => {
    const updatedRows = rows.map((row) =>
      row.id === newRowData.id ? { ...row, ...newRowData, isNew: false } : row
    );
    newRow(updatedRows); // Correctly update the state
    setLastSavedRow(newRowData); // Update the last saved row state
    return newRowData;
  };

  // Checking the retrieved data from the user
  React.useEffect(() => {
    if (lastSavedRow) {
      const carDetails = {
        ...lastSavedRow,
        user: {
          id: userId,
          username: currentUser,
          password,
          firstName,
          lastName,
        },
      };
      dispatch(createCar(carDetails));
    }
  }, [lastSavedRow]);

  const handleRowModesModelChange = (newRowModesModel) => {
    setNewRow(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "make", headerName: "Make", width: 150, editable: true },
    { field: "model", headerName: "Model", width: 150, editable: true },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "engineType",
      headerName: "Engine Type",
      width: 160,
      type: "singleSelect",
      valueOptions: ["DIESEL", "HYBRID", "ELECTRIC", "GASOLINE"],
      editable: true,
    },
    {
      field: "gearBox",
      headerName: "Gear Box",
      width: 160,
      type: "singleSelect",
      valueOptions: ["AUTOMATIC", "MANUAL"],
      editable: true,
    },
    {
      field: "condition",
      headerName: "Condition",
      width: 160,
      type: "singleSelect",
      valueOptions: ["USED", "NEW", "PARTS"],
      editable: true,
    },
    {
      field: "horsePower",
      headerName: "Horse Power",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "color", headerName: "Color", width: 130, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 130,
      type: "singleSelect",
      valueOptions: ["Sofia", "Varna", "Plovdiv"],
      editable: true,
    },
    {
      field: "mileage",
      headerName: "Mileage",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "extras", headerName: "Extras", width: 200, editable: true },
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
          toolbar: { newRow, setNewRow },
        }}
      />
    </Box>
  );
}
