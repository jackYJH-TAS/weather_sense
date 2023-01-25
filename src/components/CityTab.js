import UseCityContext from "../hooks/UseCityContext";
import { useState, useEffect } from "react";

const CityTab = () => {
  const [tabs, setTabs] = useState(null);
  const [tabHighlight, setTabHighlight] = useState(0);
  let tabClass = "";
  let renderedCityArray = null;
  const { createCityArray, cityArrays, updateTab, tabIndex, removeCityArray } =
    UseCityContext();

  const handleAddCityClick = () => {
    createCityArray("New City");
    localStorage.setItem("Cities", JSON.stringify(cityArrays));
    console.log("--", cityArrays);
  };
  const handleRemoveCityClick = () => {
    removeCityArray(tabIndex);
    localStorage.setItem("Cities", JSON.stringify(cityArrays));
    setTabHighlight(tabHighlight - 1);
    console.log("--", cityArrays);
  };
  const handleOnClick = (index) => {
    setTabHighlight(index);
  };

  useEffect(() => {
    //console.log("CityTab, beginning,", tabHighlight);
    console.log(
      "4",
      cityArrays,
      "-",
      JSON.parse(localStorage.getItem("Cities"))
    );

    if (JSON.parse(localStorage.getItem("Cities")) !== cityArrays) {
      localStorage.setItem("Cities", JSON.stringify(cityArrays));
    }

    if (cityArrays !== null) {
      renderedCityArray = cityArrays.map((item, index) => {
        // console.log("in loop of cityTab", cityArrays);
        if (index === tabIndex) {
          tabClass = "ui olive button";
        } else {
          tabClass = "ui tiny button";
        }
        return (
          <button
            className={tabClass}
            id={index}
            onClick={(e) => {
              updateTab(e.target.attributes.id.value);
              handleOnClick(e.target.attributes.id.value);
            }}
          >
            {item.name}
          </button>
        );
      });
      console.log(
        "5",
        cityArrays,
        "-",
        JSON.parse(localStorage.getItem("Cities"))
      );
    }

    setTabs(renderedCityArray);
    console.log(
      "7------ ",
      cityArrays,
      " ----- ",
      JSON.parse(localStorage.getItem("Cities"))
    );
  }, [cityArrays, tabIndex, tabHighlight]);

  return (
    <div className="m-3">
      <div className="ui buttons">
        {/* <button className="tiny ui button">{city}</button> */}
        {tabs}
        <button className="mini ui button ml-5" onClick={handleAddCityClick}>
          <i class="plus icon"></i>
        </button>
        <button className="mini ui button" onClick={handleRemoveCityClick}>
          <i class="minus icon"></i>
        </button>
      </div>
    </div>
  );
};

export default CityTab;
