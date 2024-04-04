import { iconUrlFromCode } from "../services/WeatherService";

const Forecast = ({ title, items }) => {

  if (!items) {
    console.error('Items is undefined.');
    return null; // or return a message or loading indicator
  }
  
  return (
    <div>
      <div className=" flex items-center justify-start mt-6 ">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item,index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p className=" font-white text-sm ">04:30 PM</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt=""
              className=" w-12 my-1"
            />
            <p className=" font-medium ">{`${item.temp.toFixed(1)}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
