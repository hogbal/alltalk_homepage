import Space from "components/Space/Space";
import React from "react";
import "./StoryDetailUserInfo.scss";

const StoryDetailUserInfo = (props) => {
  const { user } = props;

  return (
    <div className="storyDetailUserInfo">
      <img src={require("../../assets/imgs/cat.jpg")} alt={"userprofile"} />
      <div className="storyDetailUserInfo-user">
        {user.nickname}
        <Space size={8} />
        <button>프로필 수정</button>
      </div>
      <div className="storyDetailUserInfo-text">{user.introduce}</div>
    </div>
  );
};

export default StoryDetailUserInfo;
