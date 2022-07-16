import React from "react";
import pages from "../config/pages";
import { useLocation } from "react-router-dom";
import { usePageTitle } from "../hooks/pageTitle";


const Header = ({ isActive }) => {
  const location = useLocation();
  const { title } = pages.find((page) => page.url === location.pathname);
  usePageTitle(title);
  return (
    <div className={isActive ? "header active" : "header"}>
      <div className="headerContent">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Header;
