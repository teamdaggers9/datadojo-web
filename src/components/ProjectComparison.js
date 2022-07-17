import React from "react";
import { PieChart, RangeBarChart } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import DropDown from "../utils/components/DropDown";
import Project from "./Project";

const ProjectComparison = ({
  projects,
  candidates,
  skillSet,
  designations,
  dropdown_list,
  getSelectedOption,
  TotalEffort,
  RevisionHistory,
  Designations,
  Skills,
}) => {
  const [selectedProject1, setSelectedProject1] = React.useState(
    projects[0].project_id
  );

  const [selectedProject2, setSelectedProject2] = React.useState(
    projects[1].project_id
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <Project
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
            selectedProject={selectedProject1}
            renderAllCharts={true}
            setSelectedProject={(selected_option) =>
              setSelectedProject1(selected_option)
            }
          />
        </div>
        <div className="col-lg-6 col-xl-6">
          <Project
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
            selectedProject={selectedProject2}
            renderAllCharts={true}
            setSelectedProject={(selected_option) =>
              setSelectedProject2(selected_option)
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectComparison;
