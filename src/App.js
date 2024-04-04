import { useEffect, useState } from "react";

import {
  Inputs,
  TimeAndLocation,
  TopButton,
  Forecast,
  TemperatureAndDetails,
} from "./Components";
// import getWeatherData from "./services/WeatherService";
import getFormattedWeatherData from "./services/WeatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        );
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBgColor = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60; // Cel
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <>
      <div
        className={`mx-auto max-w-screen-md mt-4 p-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
      ${formatBgColor()}`}
      >
        <TopButton setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <>
            <TemperatureAndDetails weather={weather} />
            <TimeAndLocation weather={weather} />

            <Forecast title={"hourly forecast"} items={weather.hourly} />
            <Forecast title={"daily forecast"} items={weather.daily} />
          </>
        )}
      </div>
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </>
  );
}

export default App;
