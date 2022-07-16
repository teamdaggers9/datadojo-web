import React from "react";
import { usePageTitle } from "../hooks/pageTitle";
import Layout from "../layout/Layout";
import ProjectGraph from './DashboardComponents/ProjectsGraph';
const Dashboard = () => {
  usePageTitle("Dashboard");
  return (
    <Layout>
      <div class="row">
        <ProjectGraph/>
        <div class="col-lg-6 col-xl-6">
          <div class="card">
            <div class="card-body">zxczx</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
