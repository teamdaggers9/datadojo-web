import React from "react";
import { Link } from "react-router-dom";
import pages from "../config/pages";

const SideNavbar = () => {
  return (
    <div className="leftNav">
      <h1 className="siteLogo">
        <Link to="/">
          <img src={require("../assets/images/logo.png")} />
        </Link>
      </h1>
      <ul className="maninMenu">
        {pages.map(({ title, url, logo }) => (
          <li key={title}>
            <Link to={url}>
              <i className="dashboard">
                <img src={logo} />
              </i>
              <span className="nav-text">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
