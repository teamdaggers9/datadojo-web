import React, { useState } from "react";
import { SpiderWeb } from "../utils/charts/index";
import { spiderWebData } from "../utils/charts/chartData";
import { getRandomValue } from "../utils/commonFunctions";
import store from "../store/MasterStore";

const idealMark = 60;

const SkillSet = () => {
  const { candidates, skillSet } = store((state) => state);

  const [selectedSkill, setSelectedSkill] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [empType, setEmptype] = useState("suggested");

  return (
    <React.Fragment>
      <h1>SkillSet</h1>
      {/* <SpiderWeb 
        chartTitle={"Employee Skill Set"}
        chartData={spiderWebData}
        cId={getRandomValue("number", 3)}
      /> */}
      <div>
        <select
          value={empType}
          onChange={(e) => {
            setEmptype(e.target.value);
          }}
        >
          <option value={"ideal"}>Ideal Candidate</option>
          <option value={"suggested"}>Suggested Candidate</option>
        </select>
      </div>
      <p>IdealMark: {idealMark}</p>
      <br />
      <div>
        {skillSet.map((skill) => (
          <>
            <input
              id={skill.skill_id}
              value={skill.skill_id}
              checked={selectedSkill.includes(skill.skill_id)}
              type={"checkbox"}
              onChange={(e) => {
                const value = +e.target.value;

                if (selectedSkill.includes(value)) {
                  setSelectedSkill(
                    selectedSkill.filter((val) => val !== value)
                  );
                } else {
                  setSelectedSkill([...selectedSkill, value]);
                }
              }}
            />
            <label htmlFor={skill.skill_id}> {skill.skill_name}</label>
          </>
        ))}
      </div>
      <div>
        {candidates
          .filter((data) => {
            const skillPercentage =
              Math.round(
                (data.skill_set.reduce((acc, curr) => {
                  return acc + curr.level;
                }, 0) /
                  (data.skill_set.length * 4)) *
                  100 *
                  100
              ) / 100;

            const condn1 =
              empType === "suggested"
                ? skillPercentage <= idealMark
                : skillPercentage > idealMark;
            const condn2 = data.skill_set.some((data) => {
              const isSkillPresent = selectedSkill.find(
                (skillId) => data.skill_id === skillId
              );
              if (isSkillPresent) return true;
              else return false;
            });

            return condn1 && condn2;
          })
          .map((data, ind) => (
            <div key={ind}>
              <h2>
                {data.first_name} {data.last_name}
              </h2>
              <p className="description">
                Skill Set:
                <br />
                {data.skill_set
                  .map((skill) => {
                    const skillData = skillSet.find(
                      (sk) => sk.skill_id === skill.skill_id
                    );

                    if (skillData)
                      return " " + skillData.skill_name + " " + skill.level;
                    else return "";
                  })
                  .toString()}
              </p>
              <p className="description">
                Skill Level Sum:{" "}
                {data.skill_set.reduce((acc, curr) => {
                  return acc + curr.level;
                }, 0)}
                <br />
                Total Skill: {data.skill_set.length * 4}
                <br />
                category:{" "}
                {(data.skill_set.reduce((acc, curr) => {
                  return acc + curr.level;
                }, 0) /
                  (data.skill_set.length * 4)) *
                  100 >
                idealMark
                  ? "Ideal "
                  : "Suggested "}
                {Math.round(
                  (data.skill_set.reduce((acc, curr) => {
                    return acc + curr.level;
                  }, 0) /
                    (data.skill_set.length * 4)) *
                    100 *
                    100
                ) / 100}
                %
              </p>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default SkillSet;
