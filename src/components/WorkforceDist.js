import React from "react";
import { DotMap } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";

const WorkforceDist = () => {
  const { candidates } = store((state) => state);

  const counts = {};
  candidates.forEach(function (x) {
    counts[x.location] = (counts[x.location] || 0) + 1;
  });
  const dotmapData = candidates.map((eachCandidate) => {
    const { employee_id, location, lat, long } = eachCandidate;
    return {
      id: employee_id,
      place: location,
      lat,
      long,
      count: counts[location],
    };
  });
  return (
    <React.Fragment>
      <div className="card-header">
        <h4 className="card-title">Organisation's Workforce Distribution</h4>
      </div>
      <div className="card-body">
        <DotMap
          chartTitle={''}
          chartData={dotmapData}
          cId={getRandomValue("number", 3)}
          height="400px"
        />
      </div>
    </React.Fragment>
  );
};

export default WorkforceDist;
