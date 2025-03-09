import React from "react";

interface CarbonFootprintProps {
  value: string;
}

const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ value }) => {
  // If API returns a sentence, fallback to "Moderate"
  const displayValue = value || "Moderate";

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Carbon Footprint</h2>
      <div className="mt-2 w-full">
        {/* Here you might display a gauge or gradient; for simplicity, we display a colored box */}
        <div className="w-full h-8 rounded" style={{
          background: displayValue.toLowerCase() === "low" ? "green" :
                      displayValue.toLowerCase() === "medium" ? "orange" : "red"
        }}>
          <span className="text-white text-center block">{displayValue}</span>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprint;
