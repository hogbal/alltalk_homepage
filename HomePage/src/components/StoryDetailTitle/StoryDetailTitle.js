import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import Space from "components/Space/Space";
import React from "react";
import "./StoryDetailTitle.scss";

const StoryDetailTitle = (props) => {
  const { story, user } = props;

  return (
    <div className="storyDetailTitle">
      {localStorage.getItem("admin") && (
        <div className="storyDetailTitle-cards">
          <span className="dday-card">
            {`D-${getDayMinuteCounter(story.day).slice(0, 1)}`}
          </span>
          <Space size={8} />
          <span className="deadline-card">마감임박</span>
        </div>
      )}

      <div className="storyDetailTitle-texts">
        <div className="storyDetailTitle-title">{story.title}</div>
        <div className="storyDetailTitle-subtitle">{story.subtitle}</div>
      </div>

      <div className="storyDetailTitle-userInfo">
        <div className="storyDetailTitle-userInfo-left">
          <img src={require("../../assets/imgs/cat.jpg")} alt={"userimage"} />
          <div className="storyDetailTitle-name">{user.nickname}</div>
          <div className="storyDetailTitle-date">{`${new Date(
            story.day
          ).getFullYear()}.${new Date(story.day).getMonth() + 1}.${new Date(
            story.day
          ).getDate()}
    ${new Date(story.day).getHours()}:${new Date(
            story.day
          ).getMinutes()}`}</div>
        </div>

        <div className="storyDetailTitle-userInfo-right">
          <div className="storyDetailTitle-btns">
            <button className="storyDetailTitle-btn">수정</button>
            <Space size={4} />
            <button className="storyDetailTitle-btn" style={{ color: "red" }}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailTitle;
