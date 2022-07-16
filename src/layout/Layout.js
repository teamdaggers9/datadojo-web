import Header from "./Header";
import Footer from "./Footer";
import SideNavbar from "./SideNavbar";
import React from "react";

const Layout = ({ children }) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <React.Fragment>
      <Header isActive={isActive} />
      <main>
        <SideNavbar isActive={isActive} clicked={() => setIsActive((prevState) => !prevState)} />
        <div className={isActive ? "contentBody active" : "contentBody"}>
          <div className="containerFull">{children}</div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
