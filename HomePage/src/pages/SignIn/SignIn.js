import React from "react";
import "./SignIn.scss";

import SignInBox from "components/SignInBox/SignInBox";
import {
  SignInKaKao,
  SignInGoogle,
  SignInNaver,
} from "components/SignInBtns/SignInBtns";

import Space from "components/Space/Space";

const SignIn = () => {
  return (
    <div className="signIn">
      <div className="signIn-title">로그인</div>
      <SignInBox />
      <Space size={36} />
      <div className="signIn-sns">sns 로그인</div>

      <Space size={17} />
      <div className="signIn-socialBtns">
        <SignInKaKao />
        <Space size={10} />
        <SignInNaver />
        <Space size={10} />
        <SignInGoogle />
      </div>
    </div>
  );
};

export default SignIn;
