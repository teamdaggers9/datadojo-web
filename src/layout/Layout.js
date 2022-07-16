import Header from "./Header";
import Footer from "./Footer";
import SideNavbar from "./SideNavbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <SideNavbar />
      <div className="contentBody">
        <div className="containerFull">{children}</div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
