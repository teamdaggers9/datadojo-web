import React from "react";
import { MultiSeriesColumnChart, BubbleWorldMap, DotMap } from "../utils/charts/index";
import { bubbleWorldMapData, dotmapData, multiSeriesColumnChartData } from "../utils/charts/chartData";
import { getRandomValue } from "../utils/commonFunctions";
import { usePageTitle } from "../hooks/pageTitle";
const Dashboard = () => {
  usePageTitle("Dashboard");
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <MultiSeriesColumnChart
        chartTitle={"Project Duration"}
        chartData={multiSeriesColumnChartData}
        xAxisTitle={"Project Name"}
        yAxisTitle={"Hours"}
        cId={getRandomValue("string", 3)}
      />
      <BubbleWorldMap
        chartTitle={"Project Duration"}
        chartData={bubbleWorldMapData}
        cId={getRandomValue("string", 3)}
      />
      <DotMap
        chartTitle={"Project Duration"}
        chartData={dotmapData}
        cId={getRandomValue("string", 3)}
      />

    </React.Fragment>
  );
};

export default Dashboard;
