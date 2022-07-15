import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import SkillSet from "./pages/SkillSet";
import Layout from "./layout/Layout";
import Error from "./pages/Error";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const pages = [
  {
    title: "Dashboard",
    url: "/",
    component: <Dashboard />,
  },
  {
    title: "Project",
    url: "/project",
    component: <Project />,
  },
  {
    title: "Skill Set",
    url: "/skill-set",
    component: <SkillSet />,
  },
];

const Routes = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {pages.map(({ url, component }) => (
            <Route key={url} path={url} exact>
              <Layout>{component}</Layout>
            </Route>
          ))}
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Routes;
