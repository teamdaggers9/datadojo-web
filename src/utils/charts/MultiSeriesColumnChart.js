import React, { useEffect } from "react";
import { useAnychart } from "../../hooks/useAnyChart";

const MultiSeriesColumnChart = ({ chartTitle, chartData, yAxisTitle, cId }) => {
  const { anychart, isAnychartReady } = useAnychart();

  useEffect(() => {
    isAnychartReady && anychart && renderChart();
  }, [chartTitle, chartData, yAxisTitle, isAnychartReady, anychart]);

  const renderChart = () => {
    anychart.onDocumentReady(() => {
        const chartElement = document.getElementById(`container${cId}`);
        if (chartElement !== null) chartElement.innerHTML = "";
      // create column chart
      let chart = anychart.column();

      chart.title(chartTitle);
      chart.width("99%");
      chart.maxPointWidth("30%");
      chart.minPointLength(5);

      // set chart data
      let dataSet = anychart.data.set(chartData.rows);
      let mapping1 = dataSet.mapAs({
        x: 0,
        value: 1
      });

      let mapping2 = dataSet.mapAs({
        x: 0,
        value: 2
      });

      // create the first series and set the data
      let series1 = chart.column(mapping1);
      series1.fill({ keys: ["#f9c54f", "#e46858"], angle: 90, opacity: 1 });
      series1.stroke({
        keys: ["#f9c54f", "#e46858"],
        angle: 90,
        lineJoin: "round",
        lineCap: "round",
        thickness: 0.5,
      });
      // create the second series and set the data
      let series2 = chart.column(mapping2);
      series2.fill({ keys: ["#EE5007", "#B22727"], angle: 90, opacity: 1 });
      series1.stroke({
        keys: ["#EE5007", "#B22727"],
        angle: 90,
        lineJoin: "round",
        lineCap: "round",
        thickness: 0.5,
      });

      let roundBackground = chart.background();
      // set corner type
      roundBackground.cornerType("round");
      // apply corner type only for top-left and bottom-right corners.
      roundBackground.corners(10, 10, 0, 0);

      // turn on chart animation
      chart.animation(true);

      // set titles for Y-axis
      chart.yAxis().title(yAxisTitle);

      // turn on legend and tune it
      chartData.hasOwnProperty("header")
        ? chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0])
        : chart.legend().enabled(false);

      // interactivity settings and tooltip position
      chart.interactivity().hoverMode("single");

      chart
        .tooltip()
        .positionMode("point")
        .position("center-top")
        .anchor("center-bottom")
        .offsetX(0)
        .offsetY(5)
        .titleFormat("{%X}")
        .format("{%SeriesName} : {%Value}{groupsSeparator: }");

      let noData = chart.noData();

      //Set no data label settings
      noData.label({
        text: "Chart has no data.",
        fontColor: "#B0C0D7",
        fontFamily: "Roboto",
        fontWeight: "500",
      });

      // set container id for the chart
      chart.container(`container${cId}`);

      // initiate chart drawing
      chart.draw();
      document.getElementsByClassName("anychart-credits")[0].remove();
    });
  };
  return (
    <React.Fragment>
      <div id={`chart${cId}`} className={"chartWrapper"}>
        <div
          id={`container${cId}`}
          className="chartContainer"
          style={{ height: "400px" }}
        />
      </div>
    </React.Fragment>
  );
};

export default MultiSeriesColumnChart;
