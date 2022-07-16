import React from "react";
import ProjectGraph from "../components/ProjectsGraph";
import ProjectData from "../components/ProjectData";
import WorkforceDist from "../components/WorkforceDist";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Projects Data</h4>
            </div>
            <div className="card-body">
              <ProjectData />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-lg-12 col-xl-12">
          <div class="card">
            <ProjectGraph />
          </div>
        </div>
        <div class="col-lg-6 col-xl-6">
          <div class="card">
            <WorkforceDist />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
