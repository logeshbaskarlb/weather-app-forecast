import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { toast } from "react-toastify";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city,setCity] = useState("");

  const handleSearchClick = () =>  {
    if(city !== "") setQuery({q:"london"})
  }

  const handleLocationClick = () =>{
    if(navigator.geolocation){
      toast.info("Fetching the location")
      navigator.geolocation.getCurrentPosition((position)=>{
        toast.success("Location was successfully fetched")
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,lon
        })
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnits = e.currrentTarget.name
    if(units !== selectedUnits ) setUnits(selectedUnits);
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
        value={city}
        onChange={(e)=> setCity(e.target.value)}
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

      <div className="flex flex-row w-1/4 items-center justify-center  ">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-in-out  hover:scale-125 "
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1 ">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-in-out  hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
