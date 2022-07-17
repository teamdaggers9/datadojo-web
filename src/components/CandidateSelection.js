import React, { useEffect, useState } from "react";
import DropDown from "../utils/components/DropDown";
import { SpiderWeb } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import Modal from "../utils/components/Modal";

const CandidateSelection = ({
  candidate_suggestion_list,
  selectedProject,
  projects,
  candidates,
  skillSet,
  designations,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedOption, setSelectedOption] = React.useState(
    candidate_suggestion_list[0].id
  );

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestedCandidates, setSuggestedCandidates] = useState([]);
  const [idealCandidates, setIdealCandidates] = useState([]);

  console.log({ candidates, selectedProject });

  const requiredSkills = [9];

  const suggeste_candidates = () => {
    // candidate list who are not working on the project
    const candidates_list = candidates.filter((candidate) => {
      return !candidate.assigned_projects.includes(selectedProject);
    });

    console.log({ candidates_list, selectedProject });

    // candidates based on skills
    const _candidates = candidates_list.filter((candidate) => {
      return candidate.skill_set.some((skill) => {
        return requiredSkills.includes(skill.skill_id);
      });
    });

    console.log({ _candidates, requiredSkills });

    // candidate points
    for (const candidate of _candidates) {
      let candidate_points = 0;
      for (const skill of candidate.skill_set) {
        if (requiredSkills.includes(skill.skill_id)) {
          candidate_points += skill.level;
        }
      }
      candidate.points = candidate_points;
    }

    return _candidates;
  };

  const getDesignationName = (id) => {
    const designation = designations.find((des) => des.designation_id === id);
    if (designation) return designation.designation_name;
    return "";
  };

  const [_dataSet, setDataSet] = useState(null);

  useEffect(() => {
    const _suggeste_candidates = suggeste_candidates();
    setSuggestedCandidates(_suggeste_candidates);
    console.log({ _suggeste_candidates });
  }, [candidates]);

  const modalHeader = () => {
    const { first_name, last_name } = selectedCandidate;
    return `${first_name} ${last_name}`;
  };

  const dataSet = (data) => {
    console.log({ data, skillSet });
    const { skill_set } = data;
    const _dataSet = skill_set.map(({ skill_id, level }) => {
      const { skill_name } = skillSet.find((sk) => sk.skill_id === skill_id);
      return [skill_name, level];
    });
    return { rows: _dataSet };
  };

  const EmployeeCard = ({ data }) => (
    <div className="col-lg-4 col-md-4 col-12">
      <div className="team-style-default">
        <div className="inner">
          <div className="thumbnail">
            <img src={data.profile_pic_url} alt="Corporate Template" />
          </div>
          <div className="content">
            <h2 className="title">
              {data.first_name} {data.last_name}
            </h2>
            <h6 className="subtitle theme-gradient">
              {getDesignationName(data.designation_id)}
            </h6>
            <span className="team-form">
              Employee ID:
              <br /> DAIPL/0121/0{data.employee_id}
            </span>
            <span className="team-form">
              <i className="flag">
                <img
                  src={require(`../assets/images/flags/4x3/${data.country_code}.svg`)}
                  alt=""
                />
              </i>
              <span className="location">{data.location}</span>
            </span>
            <p className="description">
              <button
                type="button"
                className="btnBorder skillsetBtn"
                onClick={() => {
                  setSelectedCandidate(data);
                  setShowModal(true);
                  setDataSet(dataSet(data));
                }}
              >
                Skill Set
              </button>
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <div className="card-header-right">
            <DropDown
              dropdown_list={candidate_suggestion_list}
              selected_field_name="title"
              unique_field_name="id"
              onChange={(selected_option) => setSelectedOption(selected_option)}
              selected_option={selectedOption}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="containerFull">
            <div className="row row--15">
              {suggestedCandidates.map((data, index) => (
                <EmployeeCard key={index} data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={(value) => setShowModal(value)}
          modalHeader={modalHeader()}
          modalBody={
            <SpiderWeb
              chartTitle={"Employee Skill Set"}
              chartData={_dataSet}
              cId={getRandomValue("number", 3)}
            />
          }
          dataSet={_dataSet}
        />
      )}
    </React.Fragment>
  );
};

export default CandidateSelection;
