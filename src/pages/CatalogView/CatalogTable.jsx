import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import { useSelector, useDispatch } from "react-redux";
import { createCar, deleteCar } from "./CatalogActions";
import { useState, useEffect } from "react";

function AddNewRecordToolbar(props) {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const { setCarRows, setNewRecordRow } = props; // when we click add record the row that appears to insert values

  if (!isLoggedIn) return null; // If not logged in, don't render the button to add record

  // Handles adding the new record to the table
  const handleAddNewRecord = () => {
    const id = randomId(); // creates random id for the new entry
    setCarRows((oldRows) => [{ id, isNew: true }, ...oldRows]); // when typing the new record entry will be on top not bottom
    setNewRecordRow((oldModel) => ({
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

  const [carRows, setCarRows] = useState(cars); // the initial cars record from DB
  const [rowModesModel, setNewRecordRow] = useState({});
  const [lastSavedRow, setLastSavedRow] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setCarRows(cars); // Update the carRows state with the cars data
  }, [cars]); // This effect runs whenever the `cars` data changes which means that we might not need it, if we wish to not show the just added records

  // modifying carRows
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setNewRecordRow({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setNewRecordRow({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteCar(id, userId));
    setCarRows(carRows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setNewRecordRow({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = carRows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setCarRows(carRows.filter((row) => row.id !== id));
    }
  };
  // Logic for getting user input when new record is added
  const processRowUpdate = async (newRowData) => {
    // List of required fields
    const requiredFields = [
      "make",
      "model",
      "year",
      "engineType",
      "gearBox",
      "condition",
      "horsePower",
      "color",
      "price",
      "city",
      "mileage",
      "extras",
    ];

    // Check if all required fields are filled
    const allFieldsFilled = requiredFields.every(
      (field) =>
        newRowData[field] !== undefined &&
        newRowData[field] !== "" &&
        newRowData[field] !== null
    );

    if (!allFieldsFilled) {
      // If not all fields are filled, alert the user and do not proceed with saving
      alert("Please fill out all fields before saving.");
      return newRowData; // Return the data without proceeding to avoid saving incomplete data
    }

    // If all fields are filled, proceed with updating the carRows and dispatching the action
    const updatedRows = carRows.map((row) =>
      row.id === newRowData.id ? { ...row, ...newRowData, isNew: false } : row
    );
    setCarRows(updatedRows); // Correctly update the state
    setLastSavedRow(newRowData); // Update the last saved row state
    return newRowData;
  };

  // Preparing the retrieved data for dispatch
  useEffect(() => {
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
    setNewRecordRow(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "make", headerName: "Make", width: 150, editable: true },
    { field: "model", headerName: "Model", width: 150, editable: true },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 100,
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
            <>
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
            </>
          ) : (
            <>
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
            </>
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
        rows={carRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        slots={{
          toolbar: isLoggedIn ? AddNewRecordToolbar : null,
        }}
        slotProps={{
          toolbar: { setCarRows, setNewRecordRow },
        }}
      />
    </Box>
  );
}
