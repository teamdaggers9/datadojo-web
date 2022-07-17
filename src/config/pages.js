import React from "react";

import { 
  Dashboard,
  Project,
  SkillSet,
  Workforce
} from "../pages";

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
    component: <Workforce />,
  },
];

export default pages;
