import React from "react";
import { usePageTitle } from "../hooks/pageTitle";

const Error = () => {
  usePageTitle("404");
  return <React.Fragment>
    <h1>404</h1>
  </React.Fragment>;
};

export default Error;