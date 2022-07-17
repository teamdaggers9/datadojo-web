import React, { useRef, useEffect } from "react";
import { PieChart, RangeBarChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";
import DropDown from "../utils/components/DropDown";
import { pieChartData, rangeBarChartData } from "../utils/charts/chartData";

const Project = ({
  projects,
  dropdown_list,
  getSelectedOption,
  TotalEffort,
  RevisionHistory,
  Designations,
  Skills,
  selectedProject,
  renderAllCharts = false,
  setSelectedProject,
}) => {
  const [selectedOption, setSelectedOption] = React.useState(
    renderAllCharts ? null : dropdown_list[0].id
  );

  const Chart = (selectedOption) => {
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
          chartData={TotalEffort(selectedProject)}
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
          chartData={RevisionHistory(selectedProject)}
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
          chartData={Designations(selectedProject)}
          xAxisTitle={"Project"}
          yAxisTitle={"Days"}
          cId={getRandomValue("number", 3)}
          height="400px"
        />
      );
    }
    if (selectedOption === 5) {
      return (
        <PieChart
          chartTitle={title}
          chartData={Skills(selectedProject)}
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
      <div className="card">
        <div className="card-header">
          {renderAllCharts ? (
            <h4 className="card-title">
              {getSelectedOption(
                "project_name",
                selectedProject,
                "project_id",
                projects
              )}{" "}
            </h4>
          ) : (
            <h4 className="card-title">
              {getSelectedOption(
                "project_name",
                selectedProject,
                "project_id",
                projects
              )}{" "}
              |{" "}
              {getSelectedOption("title", selectedOption, "id", dropdown_list)}
            </h4>
          )}
          <div className="card-header-right">
            {renderAllCharts ? (
              <DropDown
                dropdown_list={projects}
                selected_field_name="project_name"
                unique_field_name="project_id"
                onChange={(selected_option) =>
                  setSelectedProject(selected_option)
                }
                selected_option={selectedProject}
              />
            ) : (
              <DropDown
                dropdown_list={dropdown_list}
                selected_field_name="title"
                unique_field_name="id"
                onChange={(selected_option) =>
                  setSelectedOption(selected_option)
                }
                selected_option={selectedOption}
              />
            )}
          </div>
        </div>
        <div className="card-body">
          {renderAllCharts
            ? dropdown_list.map(({ id }) => Chart(id))
            : Chart(selectedOption)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Project;
