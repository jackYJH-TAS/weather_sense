import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CityContext = createContext();

const Provider = ({ children }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false);
  const [firstCity, setFirstCity] = useState(null);

/*
  //request browser location
  const fetchLocation = async () => {
    //const data = await window.navigator.geolocation.getCurrentPosition();
    await window.navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setAllowLocation(true);
    });
  };

  //request weather api
  const fetchWeatherApi = async () => {
    const res = await axios.get("http://api.weatherapi.com/v1/forecast.json", {
      headers: {
        key: "f7e33068b4d346908bb132241230201",
      },
      params: {
        q: latitude + "," + longitude,
        days: 2,
      },
    });
    //console.log(res.data);
    setFirstCity(res.data);
  };
*/
  const valueToShare = {
    longitude,
    latitude,
    allowLocation,
    fetchLocation: async () => {
      //const data = await window.navigator.geolocation.getCurrentPosition();
      await window.navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position.coords);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAllowLocation(true);
      });
    },
    fetchWeatherApi: async (keyword) => {
      const res = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json",
        {
          headers: {
            key: "f7e33068b4d346908bb132241230201",
          },
          params: {
            q: keyword,
            days: 2,
          },
        }
      );
      //console.log(res.data);
      setFirstCity(res.data);
    },
  };
  return (
    <CityContext.Provider value={valueToShare}>{children}</CityContext.Provider>
  );
};

export { Provider };
export default CityContext;
