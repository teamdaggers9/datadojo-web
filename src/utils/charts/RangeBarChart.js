import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";


const RangeBarChart = ({
  chartData,
  chartTitle,
  xAxisTitle,
  yAxisTitle,
  cId,
  height = 400,
}) => {
  const { anychart, isAnychartReady } = useAnychart();

  const containerId = "rangeBarChart" + cId;

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [isAnychartReady, anychart, chartData, chartTitle, height]);

  function renderChart() {
    // create a chart
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(containerId);
      if (chartElement !== null) chartElement.innerHTML = "";

      const chart = anychart.bar();

      chart.legend().fontColor("#2A2550");

      // title formatting
      chartTitle !== "" && chart.title(chartTitle);
      var title = chart.title();
      title.fontColor("#2A2550");

      // x-labels formatting
      var xLabels = chart.xAxis().labels();
      xLabels.fontColor("#2A2550");

      // y-labels formatting
      var yLabels = chart.yAxis().labels();
      yLabels.fontColor("#2A2550");

      // create area series with passed data
      const modifiedData = chartData.map((d) => ({
        ...d,
        startDate: new Date(d.low).toDateString(),
        endDate: new Date(d.high).toDateString(),
      }));
      const ranges_data = anychart.data.set(modifiedData);

      const data = ranges_data.mapAs({
        x: "model",
        low: "low",
        high: "high",
        startDate: "startDate",
        endDate: "endDate",
      });
      const series = chart.rangeBar(data);
      chart.title(chartTitle);
      chart.xAxis().title(xAxisTitle);
      var xTitle = chart.xAxis().title();
      xTitle.fontColor("#2A2550");
      chart.yAxis().title(yAxisTitle);
      var yTitle = chart.yAxis().title();
      yTitle.fontColor("#2A2550");
      
      // set the selection color
      series.fill({ keys: ["#f9c54f", "#e46858"], angle: 90, opacity: 1 });
      series.stroke({
        keys: ["#f9c54f", "#e46858"],
        angle: 90,
        lineJoin: "round",
        lineCap: "round",
        thickness: 0.5,
      });
      series.selected().fill("#e46858").stroke("#f9c54f");

      chart.width("99%");
      chart.maxPointWidth("10%");
      chart.minPointLength(5);
      chart.container(containerId);

      const outputDateTimeFormat = "EEE, MMM dd, yyyy";
      const format = "MMM-DD";
      const locale = "en-us";

      anychart.format.outputLocale(locale);
      anychart.format.outputDateTimeFormat(outputDateTimeFormat);

      const dateScale = anychart.scales.dateTime();
      chart.yScale(dateScale);

      const tooltip = chart.getSeries(0).tooltip();
      tooltip.format("Start Date: {%startDate}\nEnd Date: {%endDate}");

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
    <div
      id={containerId}
      style={{
        height,
      }}
    />
  );
};

export default RangeBarChart;
