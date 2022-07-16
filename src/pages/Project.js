import React from "react";
import { usePageTitle } from "../hooks/pageTitle";

const Project = () => {
  usePageTitle("Project");
  return <React.Fragment><h1>Project</h1></React.Fragment>;
};

export default Project;
