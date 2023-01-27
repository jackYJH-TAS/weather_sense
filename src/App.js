import "semantic-ui-css/semantic.min.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import CityWeather from "./components/CityWeather";
import Loading from "./components/Loading";
import TodayQuotes from "./components/TodayQuotes";
import HoursWeather from "./components/HoursWeather";
import { useState, useEffect } from "react";
import UseCityContext from "./hooks/UseCityContext";
import TopNews from "./components/TopNews";
import CityTab from "./components/CityTab";
import axios from "axios";

//import UseCityContext from "./hooks/UseCityContext";

function App() {
  //const { longitude } = UseCityContext();
  const { currentCondition, loader, city, cityArrays } = UseCityContext();
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    // console.log("[[[", cityArrays);

    const imgRespond = async (term) => {
      if (city === "" || city === null) {
        city = "sky";
      }
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: city + " " + term, per_page: 1 },
          headers: {
            Authorization:
              "Client-ID YLoBGLjk7_hn3pMNeSH0nPJ_i8qoEAizCs7P4vN3RCM",
          },
        }
      );
      setBackgroundImg(response.data.urls.small);
      // console.log("..1", response.data.urls);
      // console.log("..2", response.data);
    };

    // if (city !== "" || city !== null) {
    //   createCityArray(city);
    // }

    imgRespond(currentCondition);
  }, [currentCondition, cityArrays]);

  return (
    <div>
      <CityTab />
      <div
        className={`justify-center bg-no-repeat bg-cover bg-center rounded-sm bg-fixed md:bg-opacity-50 bg-transparent`}
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div>
          {loader && (
            <div className="h-screen w-full bg-amber-700 m-auto">
              <Loading />
            </div>
          )}
          {loader || (
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(230, 230, 230, 0.60)",
              }}
            >
              <CityWeather className="ui segment" />
              <hr className="w-3/4 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-400" />
              <TodayQuotes />
              <HoursWeather />
              <TopNews />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
