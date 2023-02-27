import React from "react";
import "./Layout.scss";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/Introduction" && <Header />}
      <main>{props.children}</main>
      {location.pathname !== "/Introduction" && <Footer />}
    </div>
  );
};

export default Layout;
