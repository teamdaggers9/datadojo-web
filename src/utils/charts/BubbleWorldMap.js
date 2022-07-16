import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const BubbleWorldMap = ({
  chartTitle,
  chartData,
  cId,
}) => {
  const { anychart, isAnychartReady } = useAnychart();

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [
    chartTitle,
    chartData,
    isAnychartReady,
    anychart,
  ]);

  const renderChart = () => {
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(`container${cId}`);
      if (chartElement !== null) chartElement.innerHTML = "";
      // Creates data set
      var dataSet = anychart.data.set(chartData);

      // Creates Map Chart
      var map = anychart.map();

      // Sets geodata using https://cdn.anychart.com/geodata/latest/custom/world/world.js
      map.geoData("anychart.maps.world");

      // Sets Chart Title
      map
        .title()
        .enabled(true)
        .text("Organisation Workforce Distribution")
        .padding([0, 0, 20, 0]);

      map.interactivity().selectionMode("none");

      // Creates bubble series
      map
        .bubble()
        .data(dataSet)
        // Sets series settings
        .geoIdField('iso_a2')
        .fill('#ff8f00 0.6')
        .stroke('1 #ff6f00 0.9');
      map.hovered().fill('#78909c').stroke('1 #546e7a 1');

      map
        .tooltip()
        .useHtml(true)
        .title({ fontColor: '#7c868e' })
        .padding([8, 13, 10, 13])
        .format(function () {
          if (this.getData('size') !== '') {
            return (
              this.getData('size')
            );
          }
        });

      map
        .tooltip()
        .background()
        .enabled(true)
        .fill('#fff')
        .stroke('#c1c1c1')
        .corners(3)
        .cornerType('round');

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
    <div
      id={`container${cId}`}
      className="chartContainer"
      style={{ height: "400px" }}
    />
  );
};

export default BubbleWorldMap;
