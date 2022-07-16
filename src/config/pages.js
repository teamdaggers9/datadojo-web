import Dashboard from "../pages/Dashboard";
import Project from "../pages/Project";
import SkillSet from "../pages/SkillSet";
import React from "react";

const pages = [
  {
    title: "Dashboard",
    url: "/",
    logo: require("../assets/images/icon-dashboard.svg"),
    component: <Dashboard />,
  },
  {
    title: "Project",
    url: "/project",
    logo: require("../assets/images/icon-projects.svg"),
    component: <Project />,
  },
  {
    title: "Skill Set",
    url: "/skill-set",
    logo: require("../assets/images/icon-skillset.svg"),
    component: <SkillSet />,
  },
  {
    title: "Workforce",
    url: "/workforce",
    logo: require("../assets/images/icon-workforce.svg"),
    component: <SkillSet />,
  },
];

export default pages;
