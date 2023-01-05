import "semantic-ui-css/semantic.min.css";
import "bulma/css/bulma.min.css";
import CityWeather from "./components/CityWeather";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useContext } from "react";
import CityContext from "./context/CityContext";

function App() {
  const { fetchLocation, allowLocation, fetchWeatherApi } =
    useContext(CityContext);

  useEffect(() => {
    fetchLocation();
    if (allowLocation) {
    }
  }, []);
  return (
    <div className="App">
      <CityWeather />
      <div className="flex justify-center text-center">
        <Loading />
      </div>
    </div>
  );
}

export default App;
