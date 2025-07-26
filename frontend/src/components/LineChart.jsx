import React from "react";
import ReactApexChart from "react-apexcharts";

function LineChart() {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Total Responses",
        data: [ 3, 10, 9, 29, 19, 22, 9, 12, 7, 19],
      },
      {
        name: "Average Response",
        data: [2, 1.5, 5, 4.5, 14.5, 9.5, 11, 4.5, 6, 3.5],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: 1,
        curve: "smooth",
        dashArray: [0, 4],
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
          "10/11/2000"
        ],
        tickAmount: 18,
        labels: {
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), "dd MMM");
          },
        },
      },
      title: {
        text: "Average Response Chart",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "medium",
          fontFamily: "Inter, sans-serif",
          color: "#000000",
        },
      },
      fill: {
        type: "solid",
        colors: ["#000000", "#AEC7ED"],
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default LineChart;
