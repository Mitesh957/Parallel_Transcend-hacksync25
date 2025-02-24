from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS globally

OPENWEATHER_API_KEY = "02fed949e49b6d90f080d96bf59a9186"

@app.route('/predict', methods=['POST'])
def predict_flood():
    data = request.json
    city = data.get("city")

    if not city:
        return jsonify({"error": "City is required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)
    weather_data = response.json()

    if response.status_code != 200:
        return jsonify({"error": "City not found"}), 404

    high_risk_days = []
    for entry in weather_data["list"]:
        precipitation_chance = entry.get("pop", 0)
        rainfall = entry.get("rain", {}).get("3h", 0)

        if precipitation_chance > 0.7 or rainfall > 50:
            high_risk_days.append(entry["dt_txt"])

    return jsonify({
        "city": city,
        "high_risk_days": high_risk_days,
        "precaution": "Stay alert! Follow evacuation protocols.",
        "helpline": "+1234567890"
    })

if __name__ == '__main__':
    app.run(debug=True)
