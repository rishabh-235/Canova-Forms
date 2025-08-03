import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
function ColumnChart() {
  const [state, setState] = React.useState({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: "bar",
        toolbar: {
            show: false,
        }
      },
      colors: [
        "#9F9FF8",
        "#96E2D6",
        "#000000",
        "#92BFFF",
        "#AEC7ED",
        "#94E9B8",
      ],
      plotOptions: {
        bar: {
          columnWidth: 23,
          distributed: true,
          borderRadius: 6,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"],
        ],
        labels: {
          style: {
            colors: [
              "#9F9FF8",
              "#96E2D6",
              "#000000",
              "#92BFFF",
              "#AEC7ED",
              "#94E9B8",
            ],
            fontSize: "12px",
          },
        },
      },
      title: {
        text: "01 Question",
        align: "left",
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          fontFamily: "Inter, sans-serif",
          color: "#000000",
        },
      },
    },
  });
  useEffect(() => {
    const elements = document.getElementsByClassName("apexcharts-canvas");
    Array.from(elements).forEach((el) => {
      const firstDiv = el.querySelector("div");
      if (firstDiv) {
        firstDiv.style.display = "none";
      }
    });
  }, [state]);
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={200}
        />
      </div>
    </div>
  );
}
export default ColumnChart;



