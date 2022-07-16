import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const SpiderWeb = ({ chartTitle, chartData, cId }) => {
  const { anychart, isAnychartReady } = useAnychart();

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [chartTitle, chartData, isAnychartReady, anychart]);

  const renderChart = () => {
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(`container${cId}`);
      if (chartElement !== null) chartElement.innerHTML = "";

      // create radar chart
      var chart = anychart.radar();

      // set default series type
      chart.defaultSeriesType("area");

      // set chart data
      chart.data(chartData);

      chart.title(chartTitle);
      chart.palette(["#e46858"]);

      // set yAxis settings
      chart.yAxis().stroke("#545f69");
      chart.yAxis().ticks().stroke("#545f69");

      // set yAxis labels settings
      chart.yScale().minimum(0).maximum(4).ticks({ interval: 1 });

      // set container id for the chart
      chart.container(`container${cId}`);

      // initiate chart drawing
      chart.draw();
      document.getElementsByClassName("anychart-credits")[0].remove();
    });
  };

  return (
    <div
      id={`container${cId}`}
      className="chartContainer"
      style={{ height: "400px", width: "45%" }}
    />
  );
};

export default SpiderWeb;
