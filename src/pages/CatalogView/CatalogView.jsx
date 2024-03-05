import React from "react";
import Header from "../../components/Header/Header";
import DataGridDemo from "./CatalogTable";
import SearchAppBar from "../../components/Searchbar/Searchbar";

const CatalogView = () => {
  return (
    <>
      <Header />
      <SearchAppBar />
      <DataGridDemo />
    </>
  );
};

export default CatalogView;
