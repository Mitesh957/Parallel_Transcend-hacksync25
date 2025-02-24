import React, { useState } from "react";
import "./App.css";
import CityInput from "./components/CityInput";
import Result from "./components/Result";

function App() {
  const [data, setData] = useState(null);

  const fetchPrediction = async (city) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="app">
      <h1>🌊 Flood Forecasting System</h1>
      <CityInput onSearch={fetchPrediction} />
      {data && <Result data={data} />}
    </div>
  );
}

export default App;
