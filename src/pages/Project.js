import React, { useRef, useEffect } from "react";
import { PieChart, RangeBarChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";
import DropDown from "../utils/components/DropDown";
import { pieChartData, rangeBarChartData } from "../utils/charts/chartData";

const dropdown_list = [
  {
    title: "Project Duration vs Total Effort",
    id: 1,
  },
  {
    title: "Project Duration vs Revision History",
    id: 2,
  },
  {
    title: "Project Duration vs Stories",
    id: 3,
  },
  {
    title: "Team Members Roles",
    id: 4,
  },
  {
    title: "Team Members Skills ",
    id: 5,
  },
];

const Project = () => {
  const { projects } = store((state) => state);

  useEffect(() => {
    console.log({ projects });
  }, [projects]);

  const [selectedOption, setSelectedOption] = React.useState(
    dropdown_list[0].id
  );

  const [selectedProject, setSelectedProject] = React.useState(
    projects[0].project_id
  );

  const getSelectedOption = (
    field_name,
    selected_option,
    unique_field_name,
    dropdown_list
  ) => {
    const _selected_option = dropdown_list.find(
      (data) => data[unique_field_name] === selected_option
    );
    if (field_name === null) {
      return _selected_option;
    }
    return _selected_option[field_name];
  };

  const TotalEffort = () => {
    const { development_activity, scrum_activity, debug_time } =
      getSelectedOption(null, selectedProject, "project_id", projects);
    return [
      { x: "Development Time", value: development_activity },
      { x: "Scrum Activity", value: scrum_activity },
      { x: "Debug Time", value: debug_time },
    ];
  };

  const RevisionHistory = () => {
    const revision_history = getSelectedOption(
      "revision history",
      selectedProject,
      "project_id",
      projects
    );
    return revision_history.map((data, index) => {
      const { start_date, end_date } = data;
      return {
        low: start_date,
        high: end_date,
        model: "Revision " + (index + 1),
      };
    }).reverse();
  };

  const selectMap = () => {
    const title = getSelectedOption(
      "title",
      selectedOption,
      "id",
      dropdown_list
    );
    if (selectedOption === 1) {
      return (
        <PieChart
          chartTitle={title}
          chartData={TotalEffort()}
          xAxisTitle={"Project"}
          yAxisTitle={"Days"}
          cId={getRandomValue("number", 3)}
          height="400px"
        />
      );
    }
    if (selectedOption === 2) {
      return (
        <RangeBarChart
          chartTitle={title}
          chartData={RevisionHistory()}
          xAxisTitle={"Project"}
          yAxisTitle={"Days"}
          cId={getRandomValue("number", 3)}
          height="400px"
        />
      );
    }
    if (selectedOption === 4) {
      return (
        <PieChart
          chartTitle={title}
          chartData={TotalEffort()}
          xAxisTitle={"Project"}
          yAxisTitle={"Days"}
          cId={getRandomValue("number", 3)}
          height="400px"
        />
      );
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {getSelectedOption(
                  "project_name",
                  selectedProject,
                  "project_id",
                  projects
                )}{" "}
                |{" "}
                {getSelectedOption(
                  "title",
                  selectedOption,
                  "id",
                  dropdown_list
                )}
              </h4>
              <div className="card-header-right">
                <DropDown
                  dropdown_list={dropdown_list}
                  selected_field_name="title"
                  unique_field_name="id"
                  onChange={(selected_option) =>
                    setSelectedOption(selected_option)
                  }
                  selected_option={selectedOption}
                />
                <DropDown
                  dropdown_list={projects}
                  selected_field_name="project_name"
                  unique_field_name="project_id"
                  onChange={(selected_option) =>
                    setSelectedProject(selected_option)
                  }
                  selected_option={selectedProject}
                />
              </div>
            </div>
            <div className="card-body">{selectMap()}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Project;
