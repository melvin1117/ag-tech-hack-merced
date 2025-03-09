import React from "react";
import Chart from "react-apexcharts";

interface CarbonFootprintProps {
  value: string;
}

const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ value }) => {
  // Convert carbon footprint string to a numeric value.
  // For example, Low => 30, Medium => 60, High => 90. Fallback to 60.
  let numericValue = 60;
  if (value) {
    const lower = value.toLowerCase();
    if (lower.includes("low")) numericValue = 30;
    else if (lower.includes("medium")) numericValue = 60;
    else if (lower.includes("high")) numericValue = 90;
  }
  const chartOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            color: "#FFF",
          },
          value: {
            fontSize: "14px",
            color: "#FFF",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    labels: ["Carbon Footprint"],
    colors: [numericValue <= 30 ? "green" : numericValue <= 60 ? "orange" : "red"],
  };

  const chartSeries = [numericValue];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Chart options={chartOptions} series={chartSeries} type="radialBar" height={300} />
    </div>
  );
};

export default CarbonFootprint;
