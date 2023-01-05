import { CiLocationArrow1 } from "react-icons/ci";
import { useState } from "react";

const CurrentWeather = ({ setCity, setSubmit }) => {
  const [cityName, setCityName] = useState("");

  const handleOnChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityName);
    setSubmit();
  };

  return (
    <div>
      <div>
        <div className="flex justify-center text-center m-4">
          <CiLocationArrow1 className="text-xl m-4" />
          <form className="flex w-80" onSubmit={handleSubmit}>
            <input
              type="text"
              value={cityName}
              onChange={handleOnChange}
              placeholder="Enter a city name or post code"
              className="text-2xl subpixel-antialiased border rounded-lg w-full"
            />
          </form>
        </div>

        <div className="justify-center text-center">
          Temperature, condition, rain chance
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
