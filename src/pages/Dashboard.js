import React from "react";
import {MultiSeriesColumnChart} from '../utils/charts/index'
import {multiSeriesColumnChartData} from '../utils/charts/chartData';
import {getRandomValue} from '../utils/commonFunctions';
import { usePageTitle } from "../hooks/pageTitle";
const Dashboard = () => {
  usePageTitle("Dashboard");
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
    </React.Fragment>
  );
};

export default Dashboard;
