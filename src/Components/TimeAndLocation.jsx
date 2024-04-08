import React from "react";
import { formatToLocalTime } from "../services/WeatherService";

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }) => {
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return (
    <div className="text-center text-white">
      <div className="my-6">
        <p className="text-xl font-light">
          {formattedLocalTime || "Local time not available"}
        </p>
      </div>
      <div className="my-3">
        <p className="text-3xl font-medium">
          {name}, {country}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
