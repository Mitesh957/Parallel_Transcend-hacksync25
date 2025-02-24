import React, { useState } from "react";

const CityInput = ({ onSearch }) => {
  const [city, setCity] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => onSearch(city)}>Get Prediction</button>
    </div>
  );
};

export default CityInput;
