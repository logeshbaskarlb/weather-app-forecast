import { DateTime } from "luxon";

const API_KEY = "189fcadf8f89ffa5a43abbc2b7b942fd";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.853&lon=2.3488&exclude=current,minutely,alerts&appid=a9aa4c4157fe9559405e9298ed44e742&units=metric


const getWeatherData = async (infoType, searchParams) => {
  try {
    const url = `${BASE_URL}/${infoType}?${new URLSearchParams({
      ...searchParams,
      appid: API_KEY,
    })}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy | Local time: hh:mm a"
) => {
  try {
    return DateTime.fromSeconds(secs, { zone }).toFormat(format);
  } catch (error) {
    console.error("Error formatting time:", error);
    return null;
  }
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    feels_like,
    temp,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
    icon,
    details,
  };
};

const formatForecastWeather = (data) => {
  try {
    if (!data) {
      console.error("Error: Data is null or undefined.");
      return null;
    }
    console.log(data);

    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => ({
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    }));

    hourly = hourly.slice(1, 5).map((d) => ({
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    }));

    return { timezone, daily, hourly };
  } catch (error) {
    console.error("Error formatting forecast weather:", error);
    return null;
  }
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);

    return formattedCurrentWeather;
    // { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error getting formatted weather data:", error);
    return null;
  }
};

export { getFormattedWeatherData, formatToLocalTime, iconUrlFromCode };
