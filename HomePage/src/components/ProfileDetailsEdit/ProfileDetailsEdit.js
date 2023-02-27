import React, { useState } from "react";
import "./ProfileDetailsEdit.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";
import HashtagManager, { HashtagList } from "components/Hashtag/Hashtag";

const ProfileDetailsEdit = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const onRemove = (e) => {
    e.preventDefault();
    setTags(tags.filter((hashtag) => hashtag !== e.currentTarget.value));
  };
  const onChangeInput = (e) => {
    switch (e.target.name) {
      case "name":
        break;
      case "name":
        break;
      case "name":
        break;
      default:
        break;
    }
  };
  return (
    <div className="profileDetailsEdit">
      상세정보 수정
      <div className="profileDetailsEdit-inputs">
        <div className="profileDetailsEdit-input-box">
          닉네임*
          <Space size={16} />
          <Input
            type="text"
            name="name"
            maxlength={8}
            onChange={onChangeInput}
          />
          <div className="profileDetailsEdit-input-box-nameCnt">{`${name.length}/8`}</div>
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          이름*
          <Space size={16} />
          <div className="profileDetailsEdit-input-box-btns">
            <button className="profileDetailsEdit-btn-left">남</button>
            <button className="profileDetailsEdit-btn-right">여</button>
          </div>
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          생년월일 8자리*
          <Space size={16} />
          <Input
            type="text"
            name="name"
            maxLength={8}
            onChange={onChangeInput}
          />
          <Space size={24} />
        </div>
        <div className="profileDetailsEdit-input-box">
          관심사 태그 (3개 이상)*
          <Space size={16} />
          <HashtagManager
            background={true}
            hashtags={tags}
            setHashtags={setTags}
            placeholder="관심사 태그를 입력해주세요. (ex:스포츠)"
            size={"large"}
          />
          <Space size={12} />
          <HashtagList hashtags={tags} default={true} onClick={onRemove} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsEdit;
