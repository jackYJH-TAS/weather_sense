import CurrentWeather from "./CurrentWeather";
import Dropdown from "./Dropdown";
import { useState } from "react";
import UseCityContext from "../hooks/UseCityContext";

function CityWeather({}) {
  const options = [{ label: "Celsius" }, { label: "Fahrenheit" }];
  const [selection, setSelection] = useState("Celsius");
  const { cityName, lastUpdateTime } = UseCityContext();

  //handle when user selects
  const handleOnSelect = (option) => {
    setSelection(option);
    //setCurrentSelection(selection.label);
    //console.log(selection);
  };

  const handleCityInput = (name) => {
    //setCityName(name);
    console.log(cityName);
  };

  const handleOnSubmit = async () => {
    //console.log("User submitted city name, city name: ", cityName);
  };

  return (
    <div>
      <div className="columns px-5 py-5 left-10">
        <Dropdown
          options={options}
          value={selection}
          onChange={handleOnSelect}
          className="column"
        />
        <div className="column flex text-right right-5 text-green-200 flex-row-reverse">
          <div>Last Update Time {lastUpdateTime}</div>
        </div>
      </div>
      <div>
        <CurrentWeather
          handleOnCityInput={handleCityInput}
          setSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
}

export default CityWeather;
