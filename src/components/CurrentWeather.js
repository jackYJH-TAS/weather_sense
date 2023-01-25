import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineGppMaybe } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";

import WeekWeather from "./WeekWeather";
import { useState, useEffect } from "react";
import UseCityContext from "../hooks/UseCityContext";

const CurrentWeather = ({ setSubmit }) => {
  const [newCityName, setNewCityName] = useState("");

  const {
    cityName,
    allowLocation,
    currentTemp,
    currentCondition,
    curWeatherIcon,
    todayRainChance,
    rainWarningSign,
    tempSymbol,
    fetchNewCity,
    currentCountry,
  } = UseCityContext();

  useEffect(() => {
    if (allowLocation) {
      //console.log("???", forecast);
      setNewCityName(cityName);
      // setCurrentWeather(locationRespond.current.condition);
    } else {
      setNewCityName(cityName);
    }
  }, [cityName]);

  //handling city name input.
  const handleOnChange = (e) => {
    // console.log(e.target.value);
    setNewCityName(e.target.value);
  };

  //handling city name input when user hit enter.
  const handleSubmit = (e) => {
    e.preventDefault();
    //setCity(cityName);
    // console.log(newCityName);
    setSubmit();
    fetchNewCity(newCityName);
  };

  let rainSign = <GrStatusGood />;

  let styledCurrentTemp = <p className="text-3xl">{currentTemp}</p>;
  let styledRainChance = (
    <b className="p-1 text-green-600">{todayRainChance}</b>
  );

  if (rainWarningSign === 1) {
    rainSign = <MdOutlineGppMaybe />;
    styledRainChance = <b className="p-1 text-orange-600">{todayRainChance}</b>;
  }

  return (
    <div className="text-black font-semibold">
      <div className="justify-center  items-center text-center ">
        {/* Section for inputing city name */}
        <div className="flex justify-center  m-4 pl-20">
          <CiLocationArrow1 className="text-xl m-4" />
          <form className="flex w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              value={newCityName}
              onChange={handleOnChange}
              placeholder="Enter a city name or post code"
              className="text-2xl subpixel-antialiased  w-full bg-transparent"
            />
          </form>
        </div>

        <div className="justify-center ">
          {/* Section for current weather icon, contion and temp */}
          <div className="flex items-center justify-center py-1 text-base">
            <div className="flex px-2">
              <img src={curWeatherIcon} className="w-9 " />
            </div>
            <div className="flex items-center justify-center ">
              <div>{currentCondition}</div>
              <div className="p-2">{styledCurrentTemp}</div>
              <div>{tempSymbol}</div>
            </div>
          </div>
          {/* Section for today raining chance */}
          <div className="flex items-center justify-center py-1">
            {/*<div className="flex px-2">{rainSign}</div> */} {/*may delete */}
            <div className="flex items-center justify-center pl-10">
              Today Raining Chance - {styledRainChance} %
            </div>
          </div>
        </div>
      </div>
      {/* section for weeks */}
      <div>
        <WeekWeather />
      </div>
    </div>
  );
};

export default CurrentWeather;
