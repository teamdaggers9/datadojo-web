import React, { useState } from "react";
import { AppSetting } from "../config/appSettings";
import { ColumnChart, MultiSeriesColumnChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";
import config from "../config/config";
import moment from "moment";

const ProjectGraph = () => {
  const { projects } = store((state) => state);
  const { hourly_rate } = config;

  const [isVisible, setIsVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState(1);

  const EstVsActualDuration = () => {
    const header = ["#", "Estimated", "Actual"];
    const rows = projects.map(
      ({
        project_name,
        start_date,
        estimated_completion_date,
        actual_completion_date,
        status,
      }) => {
        return [
          project_name,
          dayDiff(start_date, estimated_completion_date),
          status !== "Ongoing"
            ? dayDiff(start_date, actual_completion_date)
            : null,
        ];
      }
    );
    return {
      header,
      rows,
    };
  };

  const dayDiff = (date1, date2) => {
    return moment(date1).diff(moment(date2), "days");
  };

  const EstVsActualEffort = () => {
    const header = ["#", "Estimated", "Actual"];
    const rows = projects.map(
      ({
        project_name,
        development_activity,
        scrum_activity,
        planned_effort,
        debug_time,
      }) => {
        return [
          project_name,
          planned_effort,
          development_activity + scrum_activity + debug_time,
        ];
      }
    );
    return {
      header,
      rows,
    };
  };

  const EstCost = () => {
    const rows = projects.map(({ project_name, planned_effort }) => {
      return [project_name, planned_effort * hourly_rate];
    });
    return [...rows];
  };

  const BugsReported = () => {
    const rows = projects.map(({ project_name, bugs_reported }) => {
      return [project_name, bugs_reported];
    });
    return [...rows];
  };

  const TeamStrength = () => {
    const rows = projects.map(({ project_name, team_strength }) => {
      return [project_name, team_strength];
    });
    return [...rows];
  };

  const selectMap = (currentOption) => {
    switch (currentOption) {
      case 1:
        return (
          <MultiSeriesColumnChart
            chartTitle={"Estimated vs Actual Duration"}
            chartData={EstVsActualDuration()}
            xAxisTitle={"Project"}
            yAxisTitle={"Days"}
            cId={getRandomValue("number", 3)}
            height="400px"
          />
        );
      case 2:
        return (
          <MultiSeriesColumnChart
            chartTitle={"Planned vs Actual Effort"}
            chartData={EstVsActualEffort()}
            xAxisTitle={"Project"}
            yAxisTitle={"Hours"}
            cId={getRandomValue("number", 4)}
            height="400px"
          />
        );
      case 3:
        return (
          <ColumnChart
            chartTitle={"Estimated Cost"}
            chartData={EstCost()}
            xAxisTitle={"Project"}
            yAxisTitle={"Cost (in USD)"}
            cId={getRandomValue("number", 3)}
            height="400px"
          />
        );
      case 4:
        return (
          <ColumnChart
            chartTitle={"Bugs Reported"}
            chartData={BugsReported()}
            xAxisTitle={"Project"}
            yAxisTitle={"Bugs"}
            cId={getRandomValue("number", 3)}
            height="400px"
          />
        );
      case 5:
        return (
          <ColumnChart
            chartTitle={"Team Strength"}
            chartData={TeamStrength()}
            xAxisTitle={"Project"}
            yAxisTitle={"Team Strength"}
            cId={getRandomValue("number", 3)}
            height="400px"
          />
        );
    }
  };

  return (
    <React.Fragment>
      <div className="dropdown dropdownRight">
        <button
          type="button"
          className="btnPrimary"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {
            AppSetting.projectGraphOptions.find(
              (each) => each.value === currentOption
            ).label
          }{" "}
          <i className="downArrow"></i>
        </button>
        <div className={`dropdownMenu ${isVisible ? "show" : ""}`}>
          {AppSetting.projectGraphOptions.map((eachOption, index) => (
            <a
              className={`dropdownItem`}
              href="#"
              id={eachOption.value}
              onClick={() => {
                setCurrentOption(eachOption.value);
                setIsVisible(false);
              }}
              key={index}
            >
              {eachOption.label}
            </a>
          ))}
        </div>
      </div>
      <div className="card-body">{selectMap(currentOption)}</div>
    </React.Fragment>
  );
};

export default ProjectGraph;
