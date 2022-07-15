// import { useAnychart } from "hooks/useAnychart";
// import {
//   IGraphData,
//   IInterval,
//   IIntervalWithDate,
//   ILabel,
// } from "models/interfaces";
// import { chartFilterType } from "models/types/Reports/chartFilterType";
// import { graphType } from "models/types/Reports/graphType";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import GraphFilters from "./GraphFilters";
// import { chartProperties } from "./grossProfitSnapshotUtils";

// declare global {
//   interface Window {
//     anychart: any;
//   }
// }

// const ProfitGraph = ({ data, currency, cId, setIsLoading }) => {
//   const [chartType, setChartType] = useState<graphType>("column");
//   const [dayChartData, setDayChartData] = useState<IInterval[]>([]);
//   const [weekChartData, setWeekChartData] = useState<IIntervalWithDate[]>([]);
//   const [monthChartData, setMonthChartData] = useState<IInterval[]>([]);
//   const [quarterChartData, setQuarterChartData] = useState<IIntervalWithDate[]>([]);
//   const [yearChartData, setYearChartData] = useState<IInterval[]>([]);
//   const [chartDataSummary, setChartDataSummary] = useState<ILabel[]>([]);
//   const [defaultChartData, setDefaultChartData] = useState<IInterval[]>([]);
//   const [activeFilter, setActiveFilter] = useState<chartFilterType>(null);
//   const {anychart, isAnychartReady} = useAnychart();
//   /************************|Chart filter handlers|******************************/

//   const chartTypeHandler = (type: graphType) => {
//     setChartType(type);
//   };

//   const chartFilterHandler = (filterType: chartFilterType) => {
//     setActiveFilter(filterType);
//     switch (filterType) {
//       case "day":
//         setDefaultChartData(dayChartData);
//         break;
//       case "week":
//         setDefaultChartData(weekChartData);
//         break;
//       case "month":
//         setDefaultChartData(monthChartData);
//         break;
//       case "quarter":
//         setDefaultChartData(quarterChartData);
//         break;
//       case "year":
//         setDefaultChartData(yearChartData);
//         break;
//     }
//   };

//   /************************************************************************/

//   useEffect(() => {
//     setDayChartData(data ? data.day : []);
//     setWeekChartData(data ? data.week : []);
//     setMonthChartData(data ? data.month : []);
//     setQuarterChartData(data ? data.quarter : []);
//     setYearChartData(data ? data.year : []);
//     setChartDataSummary(data ? data.all : []);
//   }, [data]);

//   useEffect(() => {
//     const timeInterval = chartDataSummary?.length;
//     if (timeInterval <= 31) {
//       setDefaultChartData(dayChartData);
//       chartFilterHandler("day");
//     } else if (timeInterval >= 30 && timeInterval < 365) {
//       setDefaultChartData(monthChartData);
//       chartFilterHandler("month");
//     } else {
//       setDefaultChartData(yearChartData);
//       chartFilterHandler("year");
//     }
//   }, [chartDataSummary]);

//   useEffect(() => {
//     isAnychartReady && anychart && renderChart();
//   }, [defaultChartData, chartType]);

//   function renderChart() {
//     setIsLoading(true);
//     const currencyCode = currency === 1 ? "USD" : "CAD";

//     const enableMarkers =
//       chartType === "column" || defaultChartData?.length > 50 ? false : true;
    
//     anychart.format.inputDateTimeFormat("yyyy-MM-dd HH:mm:ss");

//     anychart.onDocumentReady(() => {
//       const chartElement = document.getElementById(`container${cId}`);
//       if (chartElement !== null) chartElement.innerHTML = "";

//       var chart = anychart.fromJson(chartProperties.json);

//       var dataSet = anychart.data.set(defaultChartData);

//       var mapping = dataSet.mapAs({ x: "label", value: "value" });

//       var series = chart.area(mapping);

//       series.seriesType(chartType);

//       /********************| Chart Formatting |**********************/

//       chart.width('99%');
//       if (defaultChartData?.length > 0) {
//         chart.lineMarker(0, {
//           value: 0,
//           stroke: "1.5 #cecece",
//           axis: chart.yAxis(),
//           scale: chart.yScale(),
//         });
//       }

//       var yAxisLabels = chart.yAxis().labels();
//       yAxisLabels.fontFamily("Roboto");
//       yAxisLabels.fontSize(12);
//       yAxisLabels.fontColor("#4171B9");
//       yAxisLabels.fontWeight("bold");
//       yAxisLabels.useHtml(false);
//       yAxisLabels.format("{%Value}{groupsSeparator:\\,}");

//       var xAxisLabels = chart.xAxis().labels();
//       xAxisLabels.fontFamily("Roboto");
//       xAxisLabels.fontSize(12);
//       xAxisLabels.fontColor("#4171B9");
//       xAxisLabels.fontWeight("bold");
//       xAxisLabels.useHtml(false);

//       chart.yScale().softMinimum(0);
//       chart.yScale().softMaximum(0);

//       chart.tooltip(true);
//       chart.tooltip().useHtml(true);
//       chart.tooltip().titleFormat((x: any) => {
//         if (activeFilter === "week") {
//           const currentWeek = weekChartData.find((week) => week.label === x.x);
//           const startDate = currentWeek?.startDate;
//           const endDate = currentWeek?.endDate;
//           return (
//             moment(startDate).format("MMM DD, YY") +
//             " - " +
//             moment(endDate).format("MMM DD, YY")
//           );
//         }
//         else if(activeFilter === "quarter") {
//           const currentQuarter = quarterChartData.find((quarter) => quarter.label === x.x);
//           const startDate = currentQuarter?.startDate;
//           const endDate = currentQuarter?.endDate;
//           return (
//             moment(startDate).format("MMM DD, YY") +
//             " - " +
//             moment(endDate).format("MMM DD, YY")
//           );
//         }
//          else return x.x;
//       });
//       chart.tooltip().format(`${currencyCode} {%value}{groupsSeparator:\\,}`);
//       chart.tooltip().positionMode("point");
//       chart.tooltip().position("center-top");
//       chart.tooltip().anchor("center-bottom");

//       var roundBackground = chart.background();
//       // set corner type
//       roundBackground.cornerType("round");
//       // apply corner type only for top-left and bottom-right corners.
//       roundBackground.corners(10, 10, 0, 0);

//       chart.crosshair(true);
//       chart.crosshair().xStroke(null);
//       chart.crosshair().xLabel(false);
//       chart
//         .crosshair()
//         .yLabel()
//         .format("{%Value}{groupsSeparator:\\,}")
//         .fontFamily("Roboto");
//       chart.crosshair().yStroke("#cecece", 1);

//       chart.maxPointWidth("30%");
//       chart.minPointLength(5);

//       series.markers(enableMarkers);
//       series.normal(chartProperties.normal);
//       series.hovered(chartProperties.hovered);
//       series.selected(chartProperties.selected);

//       var noData = chart.noData();

//       // Set label settings
//       noData.label({
//         text: "Chart has no data.",
//         fontColor: "#B0C0D7",
//         fontFamily: "Roboto",
//         fontWeight: "500",
//       });

//       chart.yGrid().enabled(true);

//       chart.container(`container${cId}`);

//       setIsLoading(false);
//       chart.draw();

//       document.getElementsByClassName("anychart-credits")[0].remove();
//     });
//   }

//   return (
//     <React.Fragment>
//       <div id={`chart${cId}`} className={"chartWrapper"}>
//         <div
//           id={`container${cId}`}
//           className="chartContainer"
//           style={{ height: "400px" }}
//         ></div>
//         <div className="chartFilters">
//           <GraphFilters
//             chartFilterHandler={chartFilterHandler}
//             chartTypeHandler={chartTypeHandler}
//             chartType={chartType}
//             activeFilter={activeFilter}
//           />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default ProfitGraph;
