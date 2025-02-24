import React from "react";

const Result = ({ data }) => {
  return (
    <div>
      <h2>Flood Prediction for {data.city}</h2>
      <p>🚨 High Risk Days: {data.high_risk_days.length > 0 ? data.high_risk_days.join(", ") : "No immediate risk"}</p>
      <p>⚠️ Precaution: {data.precaution}</p>
      <p>📞 Helpline: {data.helpline}</p>
    </div>
  );
};

export default Result;
