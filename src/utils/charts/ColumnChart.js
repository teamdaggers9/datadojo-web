import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const ColumnChart = ({
  chartData,
  chartTitle,
  xAxisTitle,
  yAxisTitle,
  height,
  cId,
}) => {
  const { anychart, isAnychartReady } = useAnychart();
  const containerId = "colChart" + cId;
  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [isAnychartReady, anychart, chartData]);

  function renderChart() {
    // create a chart
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(containerId);
      if (chartElement !== null) chartElement.innerHTML = "";

      const chart = anychart.column();

      // title formatting
      var title = chart.title();
      title.fontColor("#2A2550");

      // x-labels formatting
      var xLabels = chart.xAxis().labels();
      xLabels.fontColor("#2A2550");

      // y-labels formatting
      var yLabels = chart.yAxis().labels();
      yLabels.fontColor("#2A2550");

      chart.legend().fontColor("#2A2550");

      const series = chart.column(chartData);
      series.fill({ keys: ["#f9c54f", "#e46858"], angle: 90, opacity: 1 });
      series.stroke({
        keys: ["#f9c54f", "#e46858"],
        angle: 90,
        lineJoin: "round",
        lineCap: "round",
        thickness: 0.5,
      });
      chart.title(chartTitle);

      // set tooltip text template
      var tooltip = chart.getSeries(0).tooltip();
      tooltip.format(yAxisTitle + ": {%value}");

      // set the titles and ui of the axes
      var xTitle = chart.xAxis().title(xAxisTitle);
      var xTitle = chart.xAxis().title();
      xTitle.fontColor("#2A2550");
      var yTitle = chart.yAxis().title(yAxisTitle);
      var yTitle = chart.yAxis().title();
      yTitle.fontColor("#2A2550");
      
      chart.width("99%");
      chart.maxPointWidth("15%");
      chart.minPointLength(5);
      chart.container(containerId);

      //Set no data label settings
      let noData = chart.noData();
      noData.label({
        text: "Chart has no data.",
        fontColor: "#2A2550",
        fontFamily: "Roboto",
        fontWeight: "500",
      });

      chart.draw(containerId);

      document.getElementsByClassName("anychart-credits")[0].remove();
    });
  }

  return (
    <React.Fragment>
      <div
        id={containerId}
        style={{
          height,
        }}
      />
    </React.Fragment>
  );
};

export default ColumnChart;
