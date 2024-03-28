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
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCar, deleteCar, editCar } from "./CatalogActions";
import { REQUIRED_FIELDS } from "../../utils/constants";

function AddNewRecordToolbar(props) {
  const { setCarRows, setNewRecordRow } = props; // when we click add record the row that appears to insert values

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
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNewRecord}
        >
          Add record
        </Button>
        <GridToolbarQuickFilter />{" "}
      </Box>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { cars } = useSelector((state) => state.getCarsReducer);
  const { isLoggedIn, userId, currentUser, password, firstName, lastName } =
    useSelector((state) => state.loginReducer);

  const [carRows, setCarRows] = useState([]); // cars from DB
  const [rowModesModel, setNewRecordRow] = useState({}); //  lets you specify which rows are in "edit mode" and which are not, directly through the model
  const [lastSavedRow, setLastSavedRow] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const sortedCars = [...cars].sort((a, b) => {
      const isAUser = a.user.id === userId;
      const isBUser = b.user.id === userId;
      if (isAUser === isBUser) {
        return 0; // Keep original order if both or neither are the logged-in user
      }
      return isAUser ? -1 : 1; // Prioritize the logged-in user's cars
    });

    setCarRows(sortedCars);
  }, [cars, userId]);

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
    // Check if all required fields are filled
    const allFieldsFilled = REQUIRED_FIELDS.every(
      (field) =>
        newRowData[field] !== undefined &&
        newRowData[field] !== "" &&
        newRowData[field] !== null
    );

    if (!allFieldsFilled) {
      return alert("Please fill out all fields before saving.");
    }

    // If all fields are filled, proceed with updating the carRows and dispatching the action
    const updatedRows = carRows.map((row) =>
      row.id === newRowData.id ? { ...row, ...newRowData, isNew: false } : row
    );
    setCarRows(updatedRows);
    setLastSavedRow(newRowData);
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
      const existingCarIndex = cars.findIndex(
        (car) => car.id === lastSavedRow.id
      );

      if (existingCarIndex !== -1) {
        // If the car exists, dispatch an update action
        dispatch(editCar(carDetails));
      } else {
        // If the car does not exist, dispatch the create action
        dispatch(createCar(carDetails));
      }
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
      valueParser: (value) => Math.max(1, value),
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
      valueParser: (value) => Math.max(1, value), // we specify that the number should be positive
    },
    { field: "color", headerName: "Color", width: 130, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 130,
      editable: true,
      valueParser: (value) => Math.max(0, value),
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
      valueParser: (value) => Math.max(0, value),
    },
    { field: "extras", headerName: "Extras", width: 200, editable: true },
    ...(isLoggedIn
      ? [
          {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            getActions: (params) => {
              const isOwner =
                params.row.isNew ||
                (params.row.user && params.row.user.id === userId); // if the record is new it is owner by the user

              if (rowModesModel[params.id]?.mode === GridRowModes.Edit) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    key="save"
                    label="Save"
                    onClick={handleSaveClick(params.id)}
                    color="inherit"
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    key="cancel"
                    label="Cancel"
                    onClick={handleCancelClick(params.id)}
                    color="inherit"
                  />,
                ];
              } else if (isLoggedIn && isOwner) {
                return [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    key="edit"
                    label="Edit"
                    onClick={handleEditClick(params.id)}
                    color="inherit"
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    key="delete"
                    label="Delete"
                    onClick={handleDeleteClick(params.id)}
                    color="inherit"
                  />,
                ];
              }
              return [];
            },
          },
        ]
      : []),
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
        onProcessRowUpdateError={(error) => console.error(error)}
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
