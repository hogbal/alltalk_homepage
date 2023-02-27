import React, { forwardRef } from "react";
import "./Scene4.scss";

import video from "assets/imgs/Scene4/play.mp4";

const Scene4 = forwardRef((props, ref) => {
  return (
    <div className="scene4" ref={ref}>
      <div className="scene4-textbox">
        <div className="scene4-title">
          실시간 관리
          <br /> 무인분리수거함
        </div>
        <div className="scene4-question">
          우리는 올바른 분리수거를 하고 있음에도
          <br /> 왜 쓰레기 문제는 계속 발생하고
          <br />
          분리수거함은 관리가 되지 않을까요?
        </div>
        <div className="scene4-answer">
          ALL TALK의
          <br /> 쓰레기도 쉽게 버리고 포인트도 제공하는 <br />
          'AI기반 실시간 관리 무인 분리수거함'을 참여해보세요!
        </div>
      </div>
      <div className="scene4-videobox">
        <video src={video} controls></video>
      </div>
    </div>
  );
});

export default Scene4;
