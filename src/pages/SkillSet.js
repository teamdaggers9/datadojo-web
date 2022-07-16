import React from "react";
import { usePageTitle } from "../hooks/pageTitle";
import {SpiderWeb} from '../utils/charts/index';
import {spiderWebData} from '../utils/charts/chartData';
import { getRandomValue } from "../utils/commonFunctions";

const SkillSet = () => {
  usePageTitle("Skill Set");
  return (
    <React.Fragment>
      <h1>SkillSet</h1>
      <SpiderWeb 
        chartTitle={"Employee Skill Set"}
        chartData={spiderWebData}
        cId={getRandomValue("number", 3)}
      />
    </React.Fragment>
  );
};

export default SkillSet;
