import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import DataGridDemo from "./CatalogTable";
import SearchAppBar from "../../components/Searchbar/Searchbar";
import { useDispatch } from "react-redux";
import { getAllCars } from "./CatalogActions";

const CatalogView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching the actions to get all cars once in Catalog View");
    dispatch(getAllCars());
  }, []);
  return (
    <>
      <Header />
      <SearchAppBar />
      <DataGridDemo />
    </>
  );
};

export default CatalogView;
