import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
} from "react-icons/wi";

interface WeatherTileProps {
  weather: any;
}

const WeatherTile: React.FC<WeatherTileProps> = ({ weather }) => {
  if (!weather) return null;

  // Determine icon based on description
  const desc = weather.weather?.[0]?.description?.toLowerCase() || "";
  let WeatherIcon = WiDaySunny;
  if (desc.includes("cloud")) WeatherIcon = WiCloudy;
  else if (desc.includes("rain")) WeatherIcon = WiRain;
  else if (desc.includes("snow")) WeatherIcon = WiSnow;
  else if (desc.includes("fog") || desc.includes("mist")) WeatherIcon = WiFog;

  // Extract temperature (°C), humidity, wind speed
  const temperature = Math.round(weather.main?.temp) || 0;
  const humidity = weather.main?.humidity || 0;
  const windSpeed = weather.wind?.speed || 0;

  return (
    <div className="relative bg-blue-100 dark:bg-blue-900 rounded shadow p-6">
      {/* Top row: Icon + City Name + Description */}
      <div className="flex items-center space-x-3 mb-4">
        <WeatherIcon className="text-5xl text-yellow-400" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {weather.name || "Weather"}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 capitalize">
            {desc || "N/A"}
          </p>
        </div>
      </div>

      {/* Temperature */}
      <p className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mt-2">
        {temperature}°C
      </p>

      {/* Humidity */}
      <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
        Humidity: {humidity}%
      </p>

      {/* Bottom-right overlay for wind speed */}
      <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded">
        Wind: {windSpeed} m/s
      </div>
    </div>
  );
};

export default WeatherTile;
