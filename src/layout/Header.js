import React from "react";
import pages from "../config/pages";
import { useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  const { title } = pages.find((page) => page.url === location.pathname);
  return (
    <div className="header">
      <div className="headerContent">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Header;
