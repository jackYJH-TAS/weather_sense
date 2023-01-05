import CurrentWeather from "./CurrentWeather";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";

function CityWeather({ }) {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);
  const options = [{ label: "Celsius" }, { label: "Fahrenheit" }];
  const [selection, setSelection] = useState("Celsius");

  useEffect(() => {
    
  }, []);

  //handle when user selects
  const handleOnSelect = (option) => {
    setSelection(option);
    //console.log(option);
  };

  const handleCityInput = (name) => {
    setCityName(name);
    //console.log(cityName);
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
        <div className="column absolute right-5">
          <div>last update time:</div>
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
