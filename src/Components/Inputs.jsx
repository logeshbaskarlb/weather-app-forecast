import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { toast } from "react-toastify";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city }); // Use the entered city in the search query
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location fetched successfully!");
          const { latitude: lat, longitude: lon } = position.coords;
          setQuery({ lat, lon }); // Set query with current location coordinates
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("Failed to fetch your location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleUnitsChange = (selectedUnits) => {
    if (units !== selectedUnits) {
      setUnits(selectedUnits); // Update units state
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search for a location"
          className="text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className={`text-xl text-white font-light transition ease-in-out hover:scale-125 ${
            units === "metric" ? "font-bold" : ""
          }`}
          onClick={() => handleUnitsChange("metric")}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          className={`text-xl text-white font-light transition ease-in-out hover:scale-125 ${
            units === "imperial" ? "font-bold" : ""
          }`}
          onClick={() => handleUnitsChange("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
