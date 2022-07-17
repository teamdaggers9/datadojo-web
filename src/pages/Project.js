import React, { useRef, useEffect } from "react";
import { PieChart, RangeBarChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";
import DropDown from "../utils/components/DropDown";
import { pieChartData, rangeBarChartData } from "../utils/charts/chartData";
import ProjectComponent from "../components/Project";
import ProjectComparison from "../components/ProjectComparison";

const dropdown_list = [
  {
    title: "Project Duration vs Total Effort",
    id: 1,
  },
  {
    title: "Project Duration vs Revision History",
    id: 2,
  },
  // {
  //   title: "Project Duration vs Stories",
  //   id: 3,
  // },
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
  const { projects, candidates, skillSet, designations } = store(
    (state) => state
  );

  const [selectedProject, setSelectedProject] = React.useState(
    projects[0].project_id
  );

  const [showProjectComparison, setShowProjectComparison] =
    React.useState(true);

  const getSelectedOption = (
    field_name,
    selected_option,
    unique_field_name,
    dropdown_list
  ) => {
    console.log({
      field_name,
      selected_option,
      unique_field_name,
      dropdown_list,
    });
    const _selected_option = dropdown_list.find(
      (data) => data[unique_field_name] === selected_option
    );
    if (field_name === null) {
      return _selected_option;
    }
    return _selected_option[field_name];
  };

  const TotalEffort = (selectedProject) => {
    const { development_activity, scrum_activity, debug_time } =
      getSelectedOption(null, selectedProject, "project_id", projects);
    return [
      { x: "Development Time", value: development_activity },
      { x: "Scrum Activity", value: scrum_activity },
      { x: "Debug Time", value: debug_time },
    ];
  };

  const RevisionHistory = (selectedProject) => {
    const revision_history = getSelectedOption(
      "revision history",
      selectedProject,
      "project_id",
      projects
    );
    return revision_history
      .map((data, index) => {
        const { start_date, end_date } = data;
        return {
          low: start_date,
          high: end_date,
          model: "Revision " + (index + 1),
        };
      })
      .reverse();
  };

  const Designations = (selectedProject) => {
    const assigned_members = candidates.filter((data) =>
      data.assigned_projects.includes(selectedProject)
    );
    const _designations = assigned_members.map((data) => {
      const { designation_id } = data;
      return {
        designation_id,
        count: 1,
      };
    });
    let designations_count = [];
    for (const { designation_id } of _designations) {
      const existing_skill = designations_count.find(
        (data) => data.designation_id === designation_id
      );
      if (existing_skill) {
        existing_skill.count += 1;
      } else {
        designations_count = [
          ...designations_count,
          { designation_id, count: 1 },
        ];
      }
    }
    return designations_count.map((data) => {
      const { designation_id, count } = data;
      const { designation_name } = designations.find(
        (data) => data.designation_id === designation_id
      );
      console.log({ designation_name, count, designation_id });
      return { x: designation_name, value: count };
    });
  };

  const Skills = (selectedProject) => {
    const assigned_members = candidates.filter((data) =>
      data.assigned_projects.includes(selectedProject)
    );
    const skills = assigned_members.map((data) => data.skill_set).flat();
    console.log({ skills });
    let skills_count = [];
    for (const { skill_id } of skills) {
      const existing_skill = skills_count.find(
        (data) => data.skill_id === skill_id
      );
      if (existing_skill) {
        existing_skill.count += 1;
      } else {
        skills_count = [...skills_count, { skill_id, count: 1 }];
      }
    }
    console.log({ skills_count });
    return skills_count.map((data) => {
      const { skill_id, count } = data;
      const { skill_name } = skillSet.find(
        (data) => data.skill_id === skill_id
      );
      return { x: skill_name, value: count };
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-xl-12 txtRight">
          <div className="flexSpaceCenterBetween">
            <span></span>
            <div className="checkSwitch">
              <span className="left">OFF</span>
              <input
                type="checkbox"
                id="switch"
                defaultChecked={showProjectComparison}
                onChange={() => setShowProjectComparison((prev) => !prev)}
              />
              <label for="switch">
                <span>Toggle</span>
              </label>
              <span className="right">ON</span>
            </div>
          </div>
        </div>
      </div>
      <div className="projectInnerWrap">
        {showProjectComparison ? (
          <React.Fragment>
            <ProjectComparison
              projects={projects}
              candidates={candidates}
              skillSets={skillSet}
              designations={designations}
              dropdown_list={dropdown_list}
              getSelectedOption={getSelectedOption}
              TotalEffort={TotalEffort}
              RevisionHistory={RevisionHistory}
              Designations={Designations}
              Skills={Skills}
              selectedProject={selectedProject}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row">
              <div className="col-lg-12 col-xl-12 txtRight">
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
            <div className="row">
              <div className="col-lg-12 col-xl-12">
                <div className="">
                  <div className="">
                    <h4 className=""></h4>
                    <div className="card-header-right"></div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-lg-6 col-xl-6">
                        <ProjectComponent
                          projects={projects}
                          candidates={candidates}
                          skillSets={skillSet}
                          designations={designations}
                          dropdown_list={dropdown_list}
                          getSelectedOption={getSelectedOption}
                          TotalEffort={TotalEffort}
                          RevisionHistory={RevisionHistory}
                          Designations={Designations}
                          Skills={Skills}
                          selectedProject={selectedProject}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Project;
