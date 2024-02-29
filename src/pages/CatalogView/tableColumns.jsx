export const tableColumns = [
  { field: "Make" },
  { field: "Model" },
  { title: "Year", field: "Year", type: "numeric" },
  {
    field: "Engine Type",
    type: "singleSelect",
    valueOptions: [
      { value: "DIESEL", label: "DIESEL" },
      { value: "HYBRID", label: "HYBRID" },
      { value: "ELECTRIC", label: "ELECTRIC" },
      { value: "GASOLINE", label: "GASOLINE" },
    ],
  },
  {
    title: "Gear Box",
    field: "Gear Box",
    type: "singleSelect",
    valueOptions: [
      { value: "AUTOMATIC", label: "AUTOMATIC" },
      { value: "MANUAL", label: "MANUAL" },
    ],
  },
  {
    title: "Condition",
    field: "condition",
    type: "singleSelect",
    valueOptions: [
      { value: "USED", label: "USED" },
      { value: "PARTS", label: "PARTS" },
    ],
  },
  { title: "Horse Power", field: "Horse Power", type: "numeric" },
  { title: "Color", field: "Color" },
  { title: "Price $", field: "Price $", type: "numeric" },
  {
    title: "City",
    field: "City",
    type: "singleSelect",
    valueOptions: [
      { value: "Sofia", label: "Sofia" },
      { value: "Varna", label: "Varna" },
      { value: "Plovdiv", label: "Plovdiv" },
    ],
  },
  { title: "Mileage", field: "Mileage", type: "numeric" },
  { title: "Extras", field: "Extras" },
];
