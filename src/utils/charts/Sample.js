// import { useAppSelector } from "app/hooks";
// import { useAnychart } from "hooks/useAnychart";
// import { IGraphDatum } from "models/interfaces";
// import {
//   isLoadingTrendData,
//   metadataTrendData,
// } from "models/Slices/EventManagementSlice";
// import { dateType } from "models/types";
// import { useEffect, useState } from "react";
// import { isMobile } from "react-device-detect";
// import { getCurrentDate, getCustomDate, getDateDiff, getDateObject } from "utils/formatTimePeriod";
// import LoadingSpinner from "utils/sharedComponents/LoadingSpinner";

// const AvailabilityTrendGraph: React.FC = () => {
//   const trendMetadata = useAppSelector(metadataTrendData);
//   const isLoading = useAppSelector(isLoadingTrendData);
//   const [minDate, setMinDate] = useState<dateType>(null);
//   const [graphData, setGraphData] = useState<IGraphDatum[]>([]);
//   const [eventDate, setEventDate] = useState<dateType>(null);
//   const {anychart, isAnychartReady} = useAnychart();

//   useEffect(() => {
//     if (trendMetadata) {
//       if (trendMetadata?.eventData && trendMetadata?.trendData?.length) {
//         setMinDate(getDateObject(trendMetadata?.start_date));
//         setEventDate(getDateObject(trendMetadata?.eventData?.event_date));
//       }
//       if (trendMetadata?.graphData?.length) {
//         setGraphData(trendMetadata?.graphData);
//       }
//     }
//   }, [trendMetadata]);

  
//   isAnychartReady && anychart.onDocumentReady(() => {
//     const chartElement = document.getElementById(`container`);
//     if (chartElement !== null) chartElement.innerHTML = "";
//     // create a chart
//     var chart = anychart.bar();

//     chart.width("97%");

//     graphData?.map((each, i) => {
//       let diffInDays = getDateDiff(each?.series[i]?.high, each?.series[i]?.low);
//       const series = chart.rangeBar(each?.series);
//       //Tooltip title settings
//       var title = chart.tooltip().title();
//       title.fontFamily("Roboto,sans-serif");
//       title.fontSize(12);

//       //Tooltip Body Settings
//       let tooltip = chart.getSeries(i).tooltip();
//       tooltip.format((data: any) => {
//         return `Cost: $${data.getData("cost")}\nStart: ${data.low}\nEnd: ${
//           data.high
//         }`;
//       });
//       tooltip.fontColor("white");
//       tooltip.fontFamily("Roboto,sans-serif");
//       tooltip.fontSize(12);

//       //Series settings
//       series.stroke(null);
//       series.labels(diffInDays && diffInDays > 7 ? true : false);
//       series.labels().format("${%cost}");
//       series.labels().fontColor("white");
//       series.labels().fontSize(10);
//       series.labels().fontFamily("Roboto,sans-serif");
//       series.labels().position("center");
//     });

//     var outputDateTimeFormat = "EEE, MMM dd, yyyy";
//     var format = "MMM-DD";
//     var locale = "en-us";

//     anychart.format.outputLocale(locale);
//     anychart.format.outputDateTimeFormat(outputDateTimeFormat);

//     var dateScale = anychart.scales.dateTime();
//     chart.yScale(dateScale);
//     var yScale = chart.yScale();
//     isMobile ? yScale.minimum(minDate).maximum(getCurrentDate()) : yScale.minimum(minDate).maximum(eventDate);

//     // set highest line marker
//     var lineMarker1 = chart.lineMarker(1);
//     lineMarker1.value(getCurrentDate());
//     lineMarker1.axis(chart.yAxis());
//     lineMarker1.stroke("#4171B9", 1);

//     //origin date text marker
//     var text0 = chart.textMarker(0);
//     text0.value(minDate);
//     text0.axis(chart.yAxis());
//     text0.text(getCustomDate(minDate, format));
//     isMobile ? text0.fontSize("9px") : text0.fontSize("12px");
//     text0.fontFamily("Roboto,sans-serif");
//     text0.fontColor("#4171B9");
//     text0.align("bottom");
//     text0.anchor("right-bottom");
//     isMobile ? text0.offsetX(-15) : text0.offsetX(-20);
//     isMobile ? text0.offsetY(-20) : text0.offsetY(-25);
//     text0.rotation(0);

//     //highest line marker text
//     var text1 = chart.textMarker(1);
//     text1.value(getCurrentDate());
//     text1.axis(chart.yAxis());
//     text1.text(getCustomDate(getCurrentDate(),format));
//     isMobile ? text1.fontSize("9px") : text1.fontSize("12px");
//     text1.fontFamily("Roboto,sans-serif");
//     text1.fontColor("#4171B9");
//     isMobile ? text1.align("bottom") : text1.align("top");
//     isMobile ? text1.anchor("left-bottom") : text1.anchor("left-top");
//     isMobile ? text1.offsetX(-15) : text1.offsetX(3);
//     isMobile ? text1.offsetY(-15) : text1.offsetY(-3);
//     text1.rotation(0);

//     //event date marker
//     const days_to_event = getDateDiff(eventDate, getCurrentDate(), "d");
//     if(days_to_event && days_to_event>0){
//       var text2 = chart.textMarker(2);
//       text2.value(eventDate);
//       text2.axis(chart.yAxis());
//       text2.text(getCustomDate(eventDate, format));
//       text2.fontSize("12px");
//       text2.fontFamily("Roboto,sans-serif");
//       text2.fontColor("#4171B9");
//       text2.align("bottom");
//       text2.anchor("right-bottom");
//       text2.offsetY(-25);
//       text2.offsetX(-18);
//       text2.rotation(0);
//     }

//     //x axis labels formatting
//     var xLabels = chart.xAxis().labels();
//     xLabels.wordWrap("break-word");
//     isMobile ? xLabels.width(60) : xLabels.width(120);
//     xLabels.hAlign("left");
//     xLabels.fontFamily("Roboto,sans-serif");
//     isMobile ? xLabels.fontSize("9px") : xLabels.fontSize("12px");
//     xLabels.fontColor("#1A2A43");
//     xLabels.format((data: any) => {
//       return data.value.toUpperCase();
//     });

//     //y axis labels formatting
//     var yLabels = chart.yAxis().labels();
//     yLabels.fontColor("#4171B9");
//     yLabels.fontFamily("Roboto,sans-serif");
//     isMobile ? yLabels.fontSize("9px") : yLabels.fontSize("12px");
//     isMobile && chart.yAxis().ticks().enabled(false);
//     isMobile && chart.xAxis().ticks().enabled(false);

//     yLabels.format((data: any) => {
//       /* This here is done to fix a Safari Browser Render issue*/
//       let temp = data.value.toString().split(' ');
//       if(temp.length === 3) {
//         return `${temp[1]}-${temp[2]}`;
//       }
//       else {
//         return "";
//       }
//     });
//     isMobile ? yLabels.enabled(false) : yLabels.enabled(graphData.length);
    
//     // wait until chart is displayed
//     chart.listen("chartDraw", function () {
//       let count = chart.yAxis().labels().getLabelsCount();
//       // go to through all labels
//       for (let i = 0; i < count; i++) {
//         let label = chart.yAxis().labels().getLabel(i);
//         let value = chart.yAxis().scale().ticks().get()[i];
//         if (minDate && eventDate) {
//           let zoneStartDate = new Date(minDate.toString()).getTime().toString();
//           let zoneEndDate = new Date(eventDate.toString()).getTime().toString();
//           if (
//             value.toString() === zoneStartDate ||
//             value.toString() === zoneEndDate ||
//             parseInt(zoneEndDate) - value <= 273600000 ||
//             value - parseInt(zoneStartDate) <= 417600000
//           ) {
//             label?.enabled(false);
//             label?.draw();
//           }
//         }
//       }
//     });

//     // set the padding between bars
//     chart.barsPadding(-1);

//     // set the padding between bar groups
//     chart.barGroupsPadding(2);

//     //point width
//     chart.pointWidth(25);

//     chart.padding(20);

//     // no data settings
//     var noData = chart.noData();
//     noData.label({
//       text: "Chart has no data.",
//       fontColor: "#B0C0D7",
//       fontFamily: "Roboto",
//       fontWeight: "500",
//     });

//     // set container and draw chart
//     chart.container("container");    
//     chart.draw();
//     document?.getElementsByClassName("anychart-credits")[0]?.remove();
//   });
  
//   const getHeight = () => {
//     if(isMobile) {
//       return trendMetadata?.trendData.length ? trendMetadata?.trendData.length * 75 : 250;
//     }
//     return trendMetadata?.trendData.length ? trendMetadata?.trendData.length * 100 : 450;
//   }

//   return (
//     <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-17 ant-col-xl-17">
//       <LoadingSpinner isLoading={isLoading}>
//         <h3>Availability Trend</h3>
//         <div className={isMobile ? "chartWrapMobile" : "chartWrap"}>
//           <div className="trendGraph" style={{minHeight: `${getHeight()}px`}} id="container"></div>
//         </div>
//       </LoadingSpinner>
//     </div>
//   );
// };

// export default AvailabilityTrendGraph;

