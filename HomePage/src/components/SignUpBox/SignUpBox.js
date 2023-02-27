import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpBox.scss";

const SignUpBox = () => {
  const navigate = useNavigate();

  return (
    <div className="signUpBox">
      <div className="signUpBox-title">ALL TALK</div>
      <div className="signUpBox-content">
        <div className="signUpBox-description">
          콘텐츠소개 콘텐츠소개 웹사이트 소개 문구 두 줄 정도 콘텐츠소개
        </div>
        <div className="signUpBox-btn">
          <button onClick={() => navigate("/SignUpInput")}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpBox;
