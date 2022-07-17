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

      chart.legend().fontColor("#2A2550");

      // set default series type
      chart.defaultSeriesType("area");

      // set chart data
      chart.data(chartData);

      chartTitle !== '' && chart.title(chartTitle);
      // title formatting
      var title = chart.title();
      title.fontColor("#2A2550");
      chart.palette(["#e46858"]);

      // x-labels formatting
      var xLabels = chart.xAxis().labels();
      xLabels.fontColor("#2A2550");

      // y-labels formatting
      var yLabels = chart.yAxis().labels();
      yLabels.fontColor("#2A2550");

      // set yAxis settings
      chart.yAxis().stroke("#2A2550");
      chart.yAxis().ticks().stroke("#2A2550");

      // set yAxis labels settings
      chart.yScale().minimum(0).maximum(4).ticks({ interval: 1 });

      // set tooltip text template
      var tooltip = chart.getSeries(0).tooltip();
      tooltip.format("Level: {%value}");

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
      style={{ height: "400px", width: "30%" }}
    />
  );
};

export default SpiderWeb;
