import { useEffect } from "react";
import Header from "../../components/Header/Header";
import DataGridDemo from "./CatalogTable";
import SearchAppBar from "../../components/Searchbar/Searchbar";
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
      <SearchAppBar />
      <DataGridDemo />
    </>
  );
};

export default CatalogView;
