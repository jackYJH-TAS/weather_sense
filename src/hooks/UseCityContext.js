import { useContext } from "react";
import CityContext from "../context/CityContext";

function UseCityContext() {
  return useContext(CityContext);
}

export default UseCityContext;
