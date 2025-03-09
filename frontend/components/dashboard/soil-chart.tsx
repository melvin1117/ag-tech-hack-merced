import React from "react";
import Chart from "react-apexcharts";

interface SoilChartProps {
  soil: any;
}

const SoilChart: React.FC<SoilChartProps> = ({ soil }) => {
  if (!soil || !soil.npk) return null;

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Nitrogen", "Phosphorus", "Potassium"],
    },
    yaxis: {
      title: {
        text: "Amount",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
    theme: {
      mode: "light",
    },
  };

  const series = [
    {
      name: "Current",
      data: [
        soil.npk.nitrogen.current,
        soil.npk.phosphorus.current,
        soil.npk.potassium.current,
      ],
    },
    {
      name: "Optimum",
      data: [
        soil.npk.nitrogen.optimum,
        soil.npk.phosphorus.optimum,
        soil.npk.potassium.optimum,
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Soil NPK Data
      </h2>
      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
};

export default SoilChart;
