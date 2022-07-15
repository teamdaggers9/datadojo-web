import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;