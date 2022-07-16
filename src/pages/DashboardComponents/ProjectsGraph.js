import React, { useState } from "react";
import { AppSetting } from "../../config/appSettings";
import { ColumnChart, MultiSeriesColumnChart } from "../../utils/charts";
import { projectDurationData, projectEffortData, estimatedCost, bugsReported, teamStrength } from "../../utils/charts/chartData";
import { getRandomValue } from "../../utils/commonFunctions";
const ProjectGraph = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState(1);

  const selectMap = (currentOption) => {
    switch (currentOption) {
      case 1:
        return (
          <MultiSeriesColumnChart
            chartTitle={"Estimated vs Actual Duration"}
            chartData={projectDurationData}
            xAxisTitle={"Project"}
            yAxisTitle={"Hours"}
            cId={getRandomValue("number", 3)}
          />
        );
      case 2:
        return (
          <MultiSeriesColumnChart
            chartTitle={"Planned vs Actual Effort"}
            chartData={projectEffortData}
            xAxisTitle={"Project"}
            yAxisTitle={"Hours"}
            cId={getRandomValue("number", 3)}
          />
        );
      case 3:
        return (
          <ColumnChart
            chartTitle={"Estimated Cost"}
            chartData={estimatedCost}
            xAxisTitle={"Project"}
            yAxisTitle={"Cost"}
            cId={getRandomValue("number", 3)}
          />
        );
      case 4:
        return (
          <ColumnChart
            chartTitle={"Bugs Reported"}
            chartData={bugsReported}
            xAxisTitle={"Project"}
            yAxisTitle={"Bugs"}
            cId={getRandomValue("number", 3)}
          />
        );
      case 5:
        return (
          <ColumnChart
            chartTitle={"Team Strength"}
            chartData={teamStrength}
            xAxisTitle={"Project"}
            yAxisTitle={"Team Strength"}
            cId={getRandomValue("number", 3)}
          />
        );
    }
  };

  return (
    <div class="col-lg-6 col-xl-6">
      <div class="card">
        <div class="dropdown dropdownRight">
          <button
            type="button"
            class="btnPrimary"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {AppSetting.projectGraphOptions.find((each)=>each.value===currentOption).label} <i class="downArrow"></i>
          </button>
          <div class={`dropdownMenu ${isVisible ? "show" : ""}`}>
            {AppSetting.projectGraphOptions.map((eachOption) => (
              <a
                class={`dropdownItem`}
                href="#"
                id={eachOption.value}
                onClick={() => {
                    setCurrentOption(eachOption.value);
                    setIsVisible(false);
                }}
              >
                {eachOption.label}
              </a>
            ))}
          </div>
        </div>
        <div class="card-body">{selectMap(currentOption)}</div>
      </div>
    </div>
  );
};

export default ProjectGraph;
