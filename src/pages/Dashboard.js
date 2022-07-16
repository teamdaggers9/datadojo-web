import React from "react";
import {
  MultiSeriesColumnChart,
  BubbleWorldMap,
  DotMap,
  ColumnChart,
  PieChart,
  RangeBarChart
} from "../utils/charts";
import {
  bubbleWorldMapData,
  dotmapData,
  multiSeriesColumnChartData,
  columnChartData,
  pieChartData,
  rangeBarChartData
} from "../utils/charts/chartData";
import { getRandomValue } from "../utils/commonFunctions";
import { usePageTitle } from "../hooks/pageTitle";
const Dashboard = () => {
  usePageTitle("Dashboard");
  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="className">
          <div className="card-body">
            <MultiSeriesColumnChart
              chartTitle={"Project Duration"}
              chartData={multiSeriesColumnChartData}
              xAxisTitle={"Project Name"}
              yAxisTitle={"Hours"}
              cId={getRandomValue("string", 3)}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-body">
            <BubbleWorldMap
              chartTitle={"Project Duration"}
              chartData={bubbleWorldMapData}
              cId={getRandomValue("string", 3)}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-body">
            <DotMap
              chartTitle={"Project Duration"}
              chartData={dotmapData}
              cId={getRandomValue("string", 3)}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-body">
            <ColumnChart
              chartData={columnChartData}
              chartTitle={"Column Chart"}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-body">
            <PieChart
              chartData={pieChartData}
              chartTitle={"Pie chart"}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="card">
          <div className="card-body">
            <RangeBarChart
              chartData={rangeBarChartData}
              chartTitle={"Range Bar Chart"}
              xAxisTitle={"X-Title"}
              yAxisTitle={"Y-Title"}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
