import React from "react";
import "./ProfilePwEdit.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const ProfilePwEdit = () => {
  return (
    <div className="profilePwEdit">
      비밀번호 변경
      <div className="profilePwEdit-inputs">
        <div className="profilePwEdit-input-box">
          현재 비밀번호
          <Space size={16} />
          <Input placeholder="현재 비밀번호를 입력해주세요." />
          <Space size={24} />
        </div>
        <div className="profilePwEdit-input-box">
          새 비밀번호
          <Space size={16} />
          <Input placeholder="8~15자의 영문, 숫자,특수문자 사용" />
          <Space size={8} />
          <Input placeholder="비밀번호를 한 번 더 입력해주세요." />
        </div>
        <Space size={60} />
        <div className="profilePwEdit-btn">
          <button>변경</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePwEdit;
