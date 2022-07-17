import React, { useState } from "react";
import { AppSetting } from "../config/appSettings";
import { ColumnChart, MultiSeriesColumnChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";
import config from "../config/config";
import moment from "moment";
import DropDown from "../utils/components/DropDown";

const ProjectGraph = () => {
  const { projects } = store((state) => state);
  const { hourly_rate } = config;

  const [selectedOption, setSelectedOption] = useState(
    AppSetting.projectGraphOptions[0].value
  );

  const EstVsActualDuration = () => {
    const header = ["#", "Estimated", "Actual"];
    console.log(projects);
    const rows = projects.map(
      ({
        project_name,
        start_date,
        estimated_completion_date,
        actual_completion_date,
        status,
      }) => {
        if (project_name === "Voyatouch") {
          console.log({
            project_name,
            start_date,
            estimated_completion_date,
            actual_completion_date,
            days: moment(start_date).diff(moment(null), "days"),
            val1: dayDiff(start_date, estimated_completion_date),
            val2: dayDiff(start_date, actual_completion_date),
          });
        }
        return [
          project_name,
          dayDiff(start_date, estimated_completion_date),
          status !== "Ongoing"
            ? dayDiff(start_date, actual_completion_date)
            : null,
        ];
      }
    );
    console.log({ rows });
    return {
      header,
      rows,
    };
  };

  const dayDiff = (date1, date2) => {
    return Math.abs(moment(date1).diff(moment(date2), "days"));
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

  const selectMap = (selectedOption) => {
    switch (selectedOption) {
      case 1:
        return (
          <MultiSeriesColumnChart
            chartTitle={""}
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
            chartTitle={""}
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
            chartTitle={""}
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
            chartTitle={""}
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
            chartTitle={""}
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
      <div className="card-header">
        <h4 className="card-title">
          {
            AppSetting.projectGraphOptions.find(
              (each) => each.value === selectedOption
            ).label
          }
        </h4>
        <DropDown
          dropdown_list={AppSetting.projectGraphOptions}
          selected_field_name="label"
          unique_field_name="value"
          onChange={(selected_option) => setSelectedOption(selected_option)}
          selected_option={selectedOption}
        />
      </div>
      <div className="card-body">{selectMap(selectedOption)}</div>
    </React.Fragment>
  );
};

export default ProjectGraph;
