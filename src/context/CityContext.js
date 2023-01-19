import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CityContext = createContext();
//local storage data: geoLocationData, cityNameData
const Provider = ({ children }) => {
  const [allowLocation, setAllowLocation] = useState(false);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [cityName, setCityName] = useState("");
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

  useEffect(() => {
    const lastGeoLocation = JSON.parse(localStorage.getItem("geoLocationData"));
    const lastCityName = JSON.parse(localStorage.getItem("cityNameData"));

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
          const a = JSON.parse(localStorage.getItem("geoLocationData"));
          console.log(a);
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
      let param = latitude + "," + longitude;
      if (createNewCity) {
        param = cityName;
        setCreateNewCity(false);
      }
      if (lastCityName !== null && !createNewCity) {
        param = lastCityName;
      }

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
        }
      );
      console.log(res.data);
      //console.log("!!! " + res.data.forecast.forecastday); //loging result for testing
      setCityName(res.data.location.name + " - " + res.data.location.region);
      if (cityName !== "" && cityName !== null) {
        localStorage.setItem("cityNameData", JSON.stringify(cityName));
      }
      setCurrentCountry(res.data.location.country);
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
      setLoader(false);
    };

    if (createNewCity) {
      //console.log("creating new city..");
      setLoader(true);
      fetchWeatherByGeo();
    }
    //check local storage if not null.
    if (
      lastGeoLocation !== null &&
      lastCityName !== null &&
      lastGeoLocation !== "" &&
      lastCityName !== ""
    ) {
      setLoader(true);
      fetchWeatherByGeo();
    } else {
      fetchLocation();
    }
    if (cityName !== "" && cityName !== null) {
      localStorage.setItem("cityNameData", JSON.stringify(cityName));
    }
  }, [allowLocation, createNewCity]);

  const valueToShare = {
    allowLocation,
    cityName,
    lastUpdateTime,
    currentTemp,
    currentCondition,
    curWeatherIcon,
    todayRainChance,
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
  };
  /*cannot be called long and lat because it hasn't been assigned a value in the initialization.
   console.log(longitude), console.log(latitude);  */
  return (
    <CityContext.Provider value={valueToShare}>{children}</CityContext.Provider>
  );
};

export { Provider };
export default CityContext;
