import React from "react";

interface SoilChartProps {
  soil: any;
}

const SoilChart: React.FC<SoilChartProps> = ({ soil }) => {
  if (!soil || !soil.npk) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Soil NPK Data</h2>
      <ul className="text-gray-700 dark:text-gray-200">
        <li>Nitrogen: {soil.npk.nitrogen.current} (Optimum: {soil.npk.nitrogen.optimum})</li>
        <li>Phosphorus: {soil.npk.phosphorus.current} (Optimum: {soil.npk.phosphorus.optimum})</li>
        <li>Potassium: {soil.npk.potassium.current} (Optimum: {soil.npk.potassium.optimum})</li>
      </ul>
    </div>
  );
};

export default SoilChart;
