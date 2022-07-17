import React from "react";
import { Link, useLocation } from "react-router-dom";
import pages from "../config/pages";

const SideNavbar = ({ isActive, clicked }) => {
  const location = useLocation();
  return (
    <div className={isActive ? "leftNav active" : "leftNav"}>
      <h1 className="siteLogo">
        <Link to="/"></Link>
        <span
          className={isActive ? "menuToggler active" : "menuToggler"}
          onClick={clicked}
        >
          <img
            src={require("../assets/images/icon-arrow-left.svg")}
            alt="Data Dojo"
          />
        </span>
      </h1>
      <ul className="maninMenu">
        {pages.map(({ title, url, logo }) => (
          <li key={title}>
            <Link to={url} className={ location.pathname === url ? "active" : ""}>
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
