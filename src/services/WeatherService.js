import { DateTime } from "luxon";

const API_KEY = "189fcadf8f89ffa5a43abbc2b7b942fd";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
 
  const data = await response.json() 
const formatForecastWeather = (data={}) => {

  if (!data) {
    console.error('Error: Data is null or undefined.');
    return null;
  }

  let { timezone, daily, hourly } = data;
  daily = daily.slice(0, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon
    };
  }); // get only the first six days forecast

  hourly = hourly.slice(0, 5).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const formatCurrentWeather =  (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } =  data;
  
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

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", 
  {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  })
  .then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc,dd LLL yyyy' | Local time : 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweaathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export default {formatToLocalTime , iconUrlFromCode }
