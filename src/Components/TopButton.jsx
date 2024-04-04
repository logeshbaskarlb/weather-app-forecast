const TopButton = ({ setQuery }) => {
    const cities = [
      {
        id: 1,
        tittle: "London",
      },
      {
        id: 2,
        tittle: "Sydney",
      },
      {
        id: 3,
        tittle: "Tokyo",
      },
      {
        id: 4,
        tittle: "Toronto",
      },
      {
        id: 5,
        tittle: "Paris",
      },
    ];
  
    return (
      <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => setQuery({ q: city.tittle })}
          >
            {city.tittle}
          </button>
        ))}
      </div>
    );
  };
  
  export default TopButton;
  