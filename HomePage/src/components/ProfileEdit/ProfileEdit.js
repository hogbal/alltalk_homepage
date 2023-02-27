import React, { useState } from "react";
import "./ProfileEdit.scss";

const ProfileEdit = () => {
  const [textLength, setTextLength] = useState("");

  const onChangeTextArea = (e) => {
    setTextLength(e.target.value);
  };
  return (
    <div className="profileEdit">
      프로필 수정
      <div className="profileEdit-info">
        <img src={require("../../assets/imgs/cat.jpg")} alt={"profileImg"} />
        <div className="profileEdit-info-btns">
          <button className="profileEdit-info-imgchange">
            프로필사진 변경
          </button>
          <button className="profileEdit-info-delete">사진 삭제</button>
        </div>
      </div>
      <div className="profileEdit-info-textarea">
        자기소개
        <textarea type="text" maxLength={150} onChange={onChangeTextArea} />
        <div className="profileEdit-info-textarea-length">{`${textLength.length}/150`}</div>
      </div>
    </div>
  );
};

export default ProfileEdit;
