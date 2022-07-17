import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const DotMap = ({ chartTitle, chartData, cId, height }) => {
  const { anychart, isAnychartReady } = useAnychart();

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [chartTitle, chartData, isAnychartReady, anychart, height]);

  const renderChart = () => {
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(`container${cId}`);
      if (chartElement !== null) chartElement.innerHTML = "";

      // Creates Map Chart
      var map = anychart.map();
      map.geoData("anychart.maps.world").padding(0);

      // Sets Chart Title
      chartTitle !== '' && 
      map
        .title()
        .enabled(true)
        .text(chartTitle)
        .padding([0, 0, 20, 0]);

      // title formatting
      var title = map.title();
      title.fontColor("#2A2550");

      // creates Dataset from Sample data
      var dataSet = anychart.data.set(chartData);
      let series = map.marker(dataSet);
      series
        .fill("#ff8f00")
        .stroke("1 #ff8f00")
        .type("circle")
        .size(4)
        .labels(false)
        // .selectionMode("none");

      // Enables map tooltip and sets settings for tooltip
      map.tooltip().title().fontColor("#fff");
      map.tooltip().titleFormat(function () {
        return this.getData("place");
      });

      map
        .tooltip()
        .useHtml(true)
        .padding([8, 13, 10, 13])
        .width(350)
        .fontSize(12)
        .fontColor("#e6e6e6")
        .format(function () {
          var count = this.getData("count");
          if (this.getData("count") === "null") count = "";
          return "Employee Count:" + count;
        });

      // create zoom controls
      var zoomController = anychart.ui.zoom();
      zoomController.render(map);

      // set container id for the chart
      map.container(`container${cId}`);

      // initiate chart drawing
      map.draw();
      document.getElementsByClassName("anychart-credits")[0].remove();
    });
  };

  return (
    <div id={`container${cId}`} className="chartContainer" style={{ height }} />
  );
};

export default DotMap;
