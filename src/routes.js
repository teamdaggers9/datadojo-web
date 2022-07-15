import Layout from "./layout/Layout";
import Error from "./pages/Error";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import pages from "./config/pages";

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
