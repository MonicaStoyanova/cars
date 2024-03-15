import { useEffect } from "react";
import Header from "../../components/Header/Header";
import DataGridDemo from "./CatalogTable";

import { useDispatch } from "react-redux";
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
