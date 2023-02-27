import React, { useState } from "react";
import "./ProfileBasciEdit.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const ProfileBasciEdit = () => {
  const [inputs, setInputs] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const onChangeInput = (e) => {
    switch (e.target.name) {
      case "name":
        setInputs({ ...inputs, name: e.target.value });
        break;
      case "phoneNumber":
        setInputs({ ...inputs, phoneNumber: e.target.value });
        break;
      case "email":
        setInputs({ ...inputs, email: e.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="profileBasciEdit">
      기본정보 수정
      <div className="profileBasciEdit-inputs">
        <div className="profileBasciEdit-input-box">
          이름*
          <Space size={16} />
          <Input
            type="text"
            name="name"
            maxLength={8}
            onChange={onChangeInput}
          />
          <div className="profileBasciEdit-input-box-nameCnt">{`${inputs.name.length}/8`}</div>
          <Space size={24} />
        </div>
        <div className="profileBasciEdit-input-box">
          휴대폰번호*
          <Space size={16} />
          <Input type="number" name="phoneNumber" />
          <Space size={24} />
        </div>
        <div className="profileBasciEdit-input-box">
          이메일*
          <Space size={16} />
          <Input type="email" name="email" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBasciEdit;
