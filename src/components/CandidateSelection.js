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

  const requiredSkillSetBasedOnProject = () => {
    const { required_skillset } = projects.find(
      (project) => project.project_id === selectedProject
    );
    return required_skillset;
  };

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestedCandidates, setSuggestedCandidates] = useState([]);
  const [idealCandidates, setIdealCandidates] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState(
    requiredSkillSetBasedOnProject(selectedProject)
  );

  const [showFilter, setShowFilter] = useState(false);

  //   const requiredSkills = [9];

  const compareFunc = (a, b) => {
    return b.percentile - a.percentile;
  };

  const suggeste_candidates = (is_ideal_candidates = false) => {
    // candidate list who are not working on the project
    const candidates_list = is_ideal_candidates
      ? candidates
      : candidates.filter((candidate) => {
          return !candidate.assigned_projects.includes(selectedProject);
        });

    console.log({ candidates_list, selectedProject, is_ideal_candidates });

    // candidates based on skills
    const _candidates = candidates_list.filter((candidate) => {
      return candidate.skill_set.some((skill) => {
        return requiredSkills.includes(skill.skill_id);
      });
    });

    console.log({ _candidates, requiredSkills });
    const total_points = requiredSkills.length * 4;

    // candidate points
    for (const candidate of _candidates) {
      let candidate_points = 0;
      for (const skill of candidate.skill_set) {
        if (requiredSkills.includes(skill.skill_id)) {
          candidate_points += skill.level;
        }
      }
      candidate.points = candidate_points;
      candidate.percentile = (candidate_points / total_points) * 100;
    }

    return _candidates.sort(compareFunc);
  };

  const getDesignationName = (id) => {
    const designation = designations.find((des) => des.designation_id === id);
    if (designation) return designation.designation_name;
    return "";
  };

  const [_dataSet, setDataSet] = useState(null);

  useEffect(() => {
    setRequiredSkills(requiredSkillSetBasedOnProject());
  }, [selectedProject, selectedOption]);

  useEffect(() => {
    const _suggeste_candidates = suggeste_candidates(
      selectedOption === 2 ? true : false
    );
    setSuggestedCandidates(_suggeste_candidates);
  }, [requiredSkills, selectedOption]);

  const modalHeader = () => {
    const { first_name, last_name } = selectedCandidate;
    return `${first_name} ${last_name}`;
  };

  const dataSet = (data) => {
    const { skill_set } = data;
    const _dataSet = skill_set.map(({ skill_id, level }) => {
      const { skill_name } = skillSet.find((sk) => sk.skill_id === skill_id);
      return [skill_name, level];
    });
    return { rows: _dataSet };
  };

  const setProgreessClass = (percentile) => {
    if (percentile < 50) return "progressHandel low";
    if (percentile < 75) return "progressHandel medium";
    return "progressHandel high";
  };

  const EmployeeCard = ({ data }) => (
    <div className="col-lg-6 col-md-6">
      <div className="skillItemBox">
        <div className="inner">
          <div className="thumbnail">
            <img src={data.profile_pic_url} alt="Corporate Template" />
          </div>
          <div className="content">
            <h2 className="title">
              {data.first_name} {data.last_name}
            </h2>
            <h6 className="subtitle">
              {getDesignationName(data.designation_id)}
            </h6>
            <span className="team-form">
              Employee ID:
              <br /> DAIPL/0121/0{data.employee_id}
            </span>
            <div className="team-form">
              Potential
              <div className="progressBar">
                <span
                  className={setProgreessClass(data.percentile.toFixed(2))}
                  style={{ width: `${data.percentile.toFixed(2)}%` }}
                  title={`${data.percentile.toFixed(2)}%`}
                ></span>
              </div>
              {/* <br /> {data.percentile.toFixed(2)}% */}
            </div>
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const onChangeSkill = (skill_id) => {
    const skill_index = requiredSkills.indexOf(skill_id);
    let _requiredSkills = [...requiredSkills];
    if (skill_index === -1) {
      _requiredSkills = [...requiredSkills, skill_id];
    } else {
      _requiredSkills.splice(skill_index, 1);
    }
    setRequiredSkills(_requiredSkills);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title"/>
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
        <div className="card-body plr0 card2">
          <span className="skillISlidBtn" onClick={() => setShowFilter(true)}>
            Tech Stack
          </span>
          <div
            className={showFilter ? "skillItemsWrap active" : "skillItemsWrap"}
          >
            <div className="slideHeader">
              <span>Tech Stack</span>
              <a
                class="closeSlide"
                href="javascript:void(0)"
                onClick={(e) => {
                  e.preventDefault();
                  setShowFilter(false);
                }}
              >
                ×
              </a>
            </div>
            <div className="skillItemsScroll">
              <div className="form-container">
                {requiredSkillSetBasedOnProject().map((skill_id) => {
                  const { skill_name } = skillSet.find(
                    (sk) => sk.skill_id === skill_id
                  );
                  return (
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id={skill_name}
                        checked={requiredSkills.includes(skill_id)}
                        onChange={() => onChangeSkill(skill_id)}
                      />
                      <label className="checkbox" for={skill_name}>
                        {skill_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="candidateInnerWrap">
            <div className="row">
              {suggestedCandidates.map((data, index) => {
                return <EmployeeCard data={data} key={index} />;
              })}
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
