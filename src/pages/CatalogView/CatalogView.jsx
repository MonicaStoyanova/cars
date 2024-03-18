import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import DataGridDemo from "./CatalogTable";

import { getAllCars } from "./CatalogActions";

const CatalogView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  return (
    <>
      <Header />

      <DataGridDemo />
    </>
  );
};

export default CatalogView;
