import { useEffect, useState } from "react";
import UseCityContext from "../hooks/UseCityContext";

function WeekWeather() {
  const { forecast, tempSymbol } = UseCityContext();
  const [forecastWeek, setForecastWeek] = useState(null);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let renderedForecast = null;
  useEffect(() => {
    let maxTemp = null;
    let minTemp = null;
    

    if (forecast.length > 0) {
      renderedForecast = forecast.map((item, index) => {
        let converDateFormat = new Date(item.date);
        let toDate = converDateFormat.getDay();
        //console.log("----", weekday[toDate]);
        if (tempSymbol === "°C") {
          maxTemp = item.day.maxtemp_c;
          minTemp = item.day.mintemp_c;
        }
        if (tempSymbol === "°F") {
          maxTemp = item.day.maxtemp_f;
          minTemp = item.day.mintemp_f;
        }
        return (
          <div key={item.date_epoch}>
            <div>
              <img
                className="flex w-fit "
                src={item.day.condition.icon}
                alt=""
              ></img>
            </div>
            <div>{weekday[toDate]}</div>
            <div>
              {minTemp}/{maxTemp} {tempSymbol}
            </div>
          </div>
        );
      });
      setForecastWeek(renderedForecast);
    }
  }, [forecast,tempSymbol]);

  return (
    <div className="flex justify-center  items-center text-center p-5 auto-cols-auto justify-evenly">
      {forecastWeek}
    </div>
  );
}

export default WeekWeather;
