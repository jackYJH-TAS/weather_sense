import UseCityContext from "../hooks/UseCityContext";
import { useState, useEffect } from "react";

const HoursWeather = () => {
  const { forecast, tempSymbol } = UseCityContext();
  const [hoursWeather, setHoursWeather] = useState();

  useEffect(() => {
    //console.log("---- ", currentSelection.label);
    let getToday = new Date();
    let monthFormat = getToday.getMonth() + 1;
    switch (monthFormat) {
      case 1:
        monthFormat = "01";
        break;
      case 2:
        monthFormat = "02";
        break;
      case 3:
        monthFormat = "03";
        break;
      case 4:
        monthFormat = "04";
        break;
      case 5:
        monthFormat = "05";
        break;
      case 6:
        monthFormat = "06";
        break;
      case 7:
        monthFormat = "07";
        break;
      case 8:
        monthFormat = "08";
        break;
      case 9:
        monthFormat = "09";
        break;
    }

    //console.log(".." + monthFormat);

    let convertedDateFormat =
      getToday.getFullYear() + "-" + monthFormat + "-" + getToday.getDate();

    if (forecast.length > 0) {
      //console.log(convertedDateFormat);
      //console.log(a.getHours()); //get current hour then filter array.
      let dateHour = null;
      const renderedHours = forecast.map((item, index) => {
        let feelsTemp = null;
        let rainWarning = null;
        let snowSign = null;

        //let hour = item.hour;
        //check today current time. if current is 21:00pm then skip 20 times today.
        if (convertedDateFormat === item.date) {
          let count = getToday.getHours();

          dateHour = item.hour.map((hourItem, i) => {
            if (tempSymbol === "°C") {
              feelsTemp = hourItem.feelslike_c;
            }
            if (tempSymbol === "°F") {
              feelsTemp = hourItem.feelslike_f;
            }
            if (hourItem.will_it_rain === 1) {
              rainWarning = <i className="attention icon"></i>;
            }
            //console.log(hourItem.time.slice(-5));
            if (i > count) {
              return (
                // <div>
                //   <div className="column" key={hourItem.date_epoch}>
                //     {hourItem.time} - <img src={hourItem.condition.icon} /> -{" "}
                //     {hourItem.condition.text}
                //   </div>
                // </div>
                <tr key={hourItem.time_epoch} className="hover:bg-sky-100">
                  <td>
                    {hourItem.time.slice(-5)} {rainWarning}
                  </td>
                  <td>
                    <img src={hourItem.condition.icon} alt="" />
                  </td>
                  <td>{hourItem.condition.text}</td>
                  <td>{feelsTemp}</td>
                  <td>{hourItem.humidity}</td>
                  <td>{hourItem.uv}</td>
                </tr>
              );
            }
          });
        } else {
          dateHour = item.hour.map((hourItem, i) => {
            if (tempSymbol === "°C") {
              feelsTemp = hourItem.feelslike_c;
            }
            if (tempSymbol === "°F") {
              feelsTemp = hourItem.feelslike_f;
            }
            if (hourItem.will_it_rain === 1) {
              rainWarning = <i className="attention icon"></i>;
            } else {
              rainWarning = null;
            }

            return (
              <tr key={hourItem.time_epoch} className="hover:bg-sky-100">
                <td>
                  {hourItem.time.slice(-5)} {rainWarning}
                </td>
                <td>
                  <img src={hourItem.condition.icon} alt="" />
                </td>
                <td>{hourItem.condition.text}</td>
                <td>
                  {feelsTemp}
                  {tempSymbol}
                </td>
                <td>{hourItem.humidity}</td>
                <td>{hourItem.uv}</td>
              </tr>
            );
          });
        }

        //console.log("??", index);
        if (convertedDateFormat === item.date) {
          let count = getToday.getHours();
          //if current time at 11:00 pm, then skip today.
          if (count === 23) {
            return null;
          } else {
          }
        }

        return (
          <div key={index}>
            <h4 className="ui header text-center m-5">{item.date}</h4>
            <table className="ui grey definition table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Condition</th>
                  <th>Feels Like</th>
                  <th>Humidity</th>
                  <th>UV</th>
                </tr>
              </thead>
              <tbody>{dateHour}</tbody>
            </table>
          </div>
        );
      });
      setHoursWeather(renderedHours);
    }
  }, [forecast, tempSymbol]);

  return <div className="p-5"> {hoursWeather}</div>;
};

export default HoursWeather;
