import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const PieChart = ({ chartData, chartTitle, cId, height }) => {
  const { anychart, isAnychartReady } = useAnychart();
  const containerId = `container${cId}`;

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [anychart, isAnychartReady, chartData, chartTitle]);

  function renderChart() {
    anychart.onDocumentReady(() => {
      const chartElement = document.getElementById(containerId);
      if (chartElement !== null) chartElement.innerHTML = "";
      const chart = anychart.pie(chartData);

      // title formatting
      chartTitle !== "" && chart.title(chartTitle);
      var title = chart.title();
      title.fontColor("#2A2550");

      // set the container id
      chart.container(containerId);

      chart.legend().fontColor("#2A2550");
      
      // set the position of labels
      chart.labels().position("outside");
      chart.labels().fontColor("#2A2550");
      chart.labels().fontWeight(600);
      // configure connectors
      chart.connectorStroke({ color: "#2A2550", thickness: 1.5 });

      //Set no data label settings
      let noData = chart.noData();
      noData.label({
        text: "Chart has no data.",
        fontColor: "#2A2550",
        fontFamily: "Roboto",
        fontWeight: "500",
      });

      // initiate drawing the chart
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

export default PieChart;
