import React, { forwardRef } from "react";
import "./Scene6.scss";

const Scene6 = forwardRef((props, ref) => {
  return (
    <div className="scene6" ref={ref}>
      <div className="scene6-title">
        최선의 서비스 제공을 위해
        <br /> 시도하고, 열정을 가지고, 책임을 가지며 문제를 해결하는
        <br /> <span>핵심 키</span>가 되어드리겠습니다.
      </div>
      <div className="scene6-image">
        <img
          src={require("../../../assets/imgs/Scene6/Scene6Img.jpg")}
          alt="scene6img"
        />
      </div>
      <button className="scene6-btn">wealltalk 둘러보기</button>
    </div>
  );
});
export default Scene6;
