import React from "react";
import { DotMap } from "../utils/charts";
import { getRandomValue } from "../utils/commonFunctions";
import {dotmapData} from "../utils/charts/chartData";

const WorkforceDist = () => {
    return ( 
        <div class="card-body">
            <DotMap chartTitle={"Workforce Distribution"} chartData={dotmapData} cId={getRandomValue("number", 3)} height="400px" />
        </div>
     );
}
 
export default WorkforceDist;