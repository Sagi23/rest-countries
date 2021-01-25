import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ confirmed, recovered, deaths, text }) => {
  return (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 128, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return tooltipItem.yLabel
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,");
            },
          },
        },
        legend: { display: false },
        title: {
          display: true,
          text: text,
        },
      }}
    />
  );
};

export default BarChart;
