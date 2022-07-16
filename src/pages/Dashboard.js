import React from "react";
import {
  MultiSeriesColumnChart,
  BubbleWorldMap,
  DotMap,
  ColumnChart,
  PieChart,
} from "../utils/charts/index";
import {
  bubbleWorldMapData,
  dotmapData,
  multiSeriesColumnChartData,
  columnChartData,
  pieChartData,
} from "../utils/charts/chartData";
import { getRandomValue } from "../utils/commonFunctions";
import { usePageTitle } from "../hooks/pageTitle";
import ProjectData from "../components/ProjectData";

const Dashboard = () => {
  usePageTitle("Dashboard");
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="card">
            <div class="card-header">
              <h4 class="card-title">Projects Data</h4>
            </div>
            <div className="card-body">
              <ProjectData />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="card">
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
              <ColumnChart chartData={columnChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="card">
            <div className="card-body">
              <PieChart chartData={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
