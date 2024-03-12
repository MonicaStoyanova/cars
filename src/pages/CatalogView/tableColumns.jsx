export const tableColumns = [
  { field: "make" },
  { field: "model" },
  { title: "Year", field: "year", type: "numeric" },
  {
    field: "engineType",
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
    field: "gearBox",
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
  { title: "Horse Power", field: "horsePower", type: "numeric" },
  { title: "Color", field: "color" },
  { title: "Price $", field: "price", type: "numeric" },
  {
    title: "City",
    field: "city",
    type: "singleSelect",
    valueOptions: [
      { value: "Sofia", label: "Sofia" },
      { value: "Varna", label: "Varna" },
      { value: "Plovdiv", label: "Plovdiv" },
    ],
  },
  { title: "Mileage", field: "mileage", type: "numeric" },
  { title: "Extras", field: "extras" },
];
