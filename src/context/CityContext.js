import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CityContext = createContext();
//local storage data: geoLocationData, cityNameData
const Provider = ({ children }) => {
  const [allowLocation, setAllowLocation] = useState(false);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [lastUpdateTime, setLastUpdateTIme] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [currentCondition, setCurrentCondition] = useState("");
  const [curWeatherIcon, setCurWeatherIcon] = useState(null);
  const [todayRainChance, setTodayRainChance] = useState(0);
  const [rainWarningSign, setRainWarningSign] = useState(0);
  const [forecast, setForecast] = useState({});
  const [currentSelection, setCurrentSelection] = useState("Celsius");
  const [tempSymbol, setTempSymbol] = useState("°C");
  const [createNewCity, setCreateNewCity] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cityArrays, setCityArrays] = useState([]);
  const [swapTab, setSwapTab] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const lastGeoLocation = JSON.parse(localStorage.getItem("geoLocationData"));
    setCityArrays(JSON.parse(localStorage.getItem("Cities")));
    console.log(
      "1",
      cityArrays,
      "-",
      JSON.parse(localStorage.getItem("Cities"))
    );

    let selectedCity = null;
    let param = null;

    //function to fetch geo location
    const fetchLocation = async () => {
      await window.navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log(position.coords);
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          let geo = position.coords.latitude + "," + position.coords.longitude;
          setAllowLocation(true);
          //return position.coords;
          localStorage.setItem("geoLocationData", JSON.stringify(geo));
          // const a = JSON.parse(localStorage.getItem("geoLocationData"));
          // console.log(a);
          setLoader(false);
        },
        (err) => {
          console.log(err);
          setAllowLocation(false);
        }
      );
    };
    //function to fectch weather api by city name or geo location
    const fetchWeatherByGeo = async () => {
      if (cityArrays.length !== 0 && !createNewCity && cityArrays !== null) {
        param = cityArrays[tabIndex].name;
      } else if (
        allowLocation ||
        (lastGeoLocation !== null && !createNewCity)
      ) {
        console.log("allow location");
        if (latitude !== null && longitude !== null) {
          param = latitude + "," + longitude;
        } else {
          param = lastGeoLocation;
        }
      } else if (createNewCity) {
        console.log("in create new city", cityName);
        param = cityName;
        setCreateNewCity(false);
        updateCityArray(tabIndex, cityName);
        // updateCityArray(tabIndex, param);
        console.log("?", cityArrays);
      } else if (swapTab) {
        console.log("swaptab is true");
        if (!createNewCity) {
          param = selectedCity.name;
        }
        // console.log("\\ ", param);
        setSwapTab(false);
      }
      if (param == "" || param == null) {
        console.log("empty param");
        if (lastGeoLocation !== null) {
          param = lastGeoLocation;
        } else {
          param = "earth";
        }
      }

      console.log("final param", param);
      const res = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json",
        {
          headers: {
            key: "f7e33068b4d346908bb132241230201",
          },
          params: {
            q: param,
            days: 6,
            alerts: "yes",
          },
        },
        (err) => {
          console.log(err);
          setLoader(false);
        }
      );
      // console.log(res.data);
      //console.log("!!! " + res.data.forecast.forecastday); //loging result for testing
      setCityName(res.data.location.name + " - " + res.data.location.region);
      // if (cityName !== "" && cityName !== null) {
      //   localStorage.setItem("cityNameData", JSON.stringify(cityName));
      // }
      setCurrentCountry(res.data.location.country);
      setCity(res.data.location.name);
      setLastUpdateTIme(res.data.current.last_updated);
      setCurrentTemp(res.data.current.temp_c);
      setTodayRainChance(
        res.data.forecast.forecastday[0].day.daily_chance_of_rain
      );
      setRainWarningSign(
        res.data.forecast.forecastday[0].day.daily_will_it_rain
      );
      setCurrentCondition(res.data.current.condition.text);
      setCurWeatherIcon(res.data.current.condition.icon);
      setForecast(res.data.forecast.forecastday);
      if (cityArrays.length == 0) {
        createCityArray(res.data.location.name);
      }
      if (!cityArrays.length) {
        localStorage.setItem("Cities", JSON.stringify(cityArrays));
      }
      console.log(
        "2",
        cityArrays,
        "-",
        JSON.parse(localStorage.getItem("Cities"))
      );
      setLoader(false);
    };

    if (swapTab) {
      setCityArrays(JSON.parse(localStorage.getItem("Cities")));
      selectedCity = cityArrays[tabIndex];
      if (!createNewCity) {
        fetchWeatherByGeo();
      } else {
        //do update tab and cityArray and localstorage
        setLoader(true);
        console.log("here");
        console.log("tabindex", tabIndex, "name:", cityName);
        updateCityArray(tabIndex, cityName);
        setCityName(cityArrays[tabIndex].name);
        fetchWeatherByGeo();
      }
    } else if (createNewCity) {
      console.log("creating new city..");
      setLoader(true);
      fetchWeatherByGeo();
    } else if (lastGeoLocation !== null && lastGeoLocation !== "") {
      setLoader(true);
      // console.log("!", allowLocation, cityArrays.length);
      fetchWeatherByGeo();
    } else {
      fetchLocation();
    }
    console.log(
      "3",
      cityArrays,
      "-",
      JSON.parse(localStorage.getItem("Cities"))
    );
  }, [allowLocation, createNewCity, tabIndex]);

  const createCityArray = (newCity) => {
    const updatedCity = [
      ...cityArrays,
      { id: cityArrays.length + 1, name: newCity },
    ];
    setCityArrays(updatedCity);
    if (!cityArrays.length) {
      localStorage.setItem("Cities", JSON.stringify(cityArrays));
    }
    // localStorage.setItem("Cities", JSON.stringify(cityArrays));
  };

  const removeDuplicate = () => {
    // console.log(cityArrays.name.includes("Sydn") + "--------");
    const removeDuplicates = [...new Set(cityArrays)];
    setCityArrays(removeDuplicates);
    localStorage.setItem("Cities", JSON.stringify(cityArrays));
  };

  const removeCityArray = (indexToRemove) => {
    console.log("removing index: ", indexToRemove);
    const updatedCityArray = cityArrays.filter((item, index) => {
      return !(index == indexToRemove);
    });
    setCityArrays(updatedCityArray);
    console.log("updated: ", updatedCityArray);
    console.log("storing: ", cityArrays);
    localStorage.setItem("Cities", JSON.stringify(cityArrays));
    setTabIndex(tabIndex - 1);
    swapTab(true);
  };
  const updateCityArray = (cityIndex, newCity) => {
    const updatedCityArray = cityArrays.map((item, index) => {
      if (index == cityIndex) {
        return { ...item, name: newCity };
      }
      return item;
    });
    setCityArrays(updatedCityArray);
    localStorage.setItem("Cities", JSON.stringify(cityArrays));
  };

  const valueToShare = {
    allowLocation,
    cityName,
    lastUpdateTime,
    currentTemp,
    currentCondition,
    curWeatherIcon,
    todayRainChance,
    city,
    rainWarningSign,
    forecast,
    currentSelection,
    tempSymbol,
    currentCountry,
    loader,
    toF: () => {
      if (tempSymbol !== "°F") {
        let newTemp = currentTemp * 1.8 + 32;
        setCurrentTemp(Math.round(newTemp * 10) / 10);
        setTempSymbol("°F");
      }
      //console.log("in to F", currentTemp);
    },
    toC: () => {
      if (tempSymbol !== "°C") {
        let newTemp = (currentTemp - 32) * 0.5556;
        setCurrentTemp(Math.round(newTemp * 10) / 10);
        setTempSymbol("°C");
      }
      //console.log("in to C", currentTemp);
    },
    fetchNewCity: (newCity) => {
      setCityName(newCity);
      setCreateNewCity(true);
      //console.log("in to C", currentTemp);
    },
    setCurrentTemp,
    setCityName,
    cityArrays,
    createCityArray,
    removeCityArray,
    updateCityArray,
    swapTab,
    tabIndex,
    updateTab: (index) => {
      setSwapTab(true);
      setTabIndex(index);
      // console.log("!", swapTab, ",", index);
      // console.log("!", tabIndex);
    },
  };
  /*cannot be called long and lat because it hasn't been assigned a value in the initialization.
   console.log(longitude), console.log(latitude);  */
  return (
    <CityContext.Provider value={valueToShare}>{children}</CityContext.Provider>
  );
};

export { Provider };
export default CityContext;
