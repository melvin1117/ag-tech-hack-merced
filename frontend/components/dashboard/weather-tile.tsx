import React from "react";

interface WeatherTileProps {
  weather: any;
}

const WeatherTile: React.FC<WeatherTileProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Weather</h2>
      <p className="text-gray-700 dark:text-gray-200">
        {weather.name}: {weather.weather[0].description}
      </p>
      <p className="text-gray-700 dark:text-gray-200">
        Temp: {weather.main.temp}°C, Humidity: {weather.main.humidity}%
      </p>
    </div>
  );
};

export default WeatherTile;
