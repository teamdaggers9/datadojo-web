import React, { useState } from "react";
import store from "../store/MasterStore";
import Modal from "../utils/components/Modal";
import { SpiderWeb } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";

const Workforce = () => {
  const { candidates, skillSet, designations } = store((state) => state);

  //   console.log({
  //     candidates,
  //     skillSet,
  //     designations,
  //   });

  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [showModal, setShowModal] = useState(false);
  const [_dataSet, setDataSet] = useState([]);

  const getDesignationName = (id) => {
    const designation = designations.find((des) => des.designation_id === id);
    if (designation) return designation.designation_name;
    return "";
  };

  const EmployeeCard = ({ data }) => (
    <div className="col-lg-3 col-md-6 col-12">
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

  return (
    <React.Fragment>
      <div className="containerFull">
        {/* <h2 className="txtCenter innerTitle">Team</h2> */}
        <div className="row row--15">
          {candidates.map((data, ind) => (
            <EmployeeCard key={ind} data={data} />
          ))}
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

export default Workforce;
