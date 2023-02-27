import React, { forwardRef, useState } from "react";
import "./Footer.scss";

import { useLocation } from "react-router-dom";

const Footer = forwardRef((props, ref) => {
  const { landing } = props;
  const location = useLocation();

  return (
    <footer
      className={`footer ${landing ? "fixed" : ""}`}
      style={{ display: `${location.pathname === "/" && "none"}` }}
      ref={ref}
    >
      <div className="footer-title">ALL TALK</div>
      <div className="footer-content">
        <img src={require("assets/imgs/instagram.jpg")} alt="instagram" />
        <p>
          부산광역시 연제구 반송로60, 2층 2사무실 | 대표 박소영 <br />
          pthdud1123@naver.com
        </p>
      </div>
    </footer>
  );
});

export default Footer;
