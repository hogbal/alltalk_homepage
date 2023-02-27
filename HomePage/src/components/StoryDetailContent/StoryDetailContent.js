import React, { useEffect, useState } from "react";
import "./StoryDetailContent.scss";

import axios from "axios";

import Gallery from "components/Gallery/Gallery";
import StoryDetailUserInfo from "components/StoryDetailUserInfo/StoryDetailUserInfo";
import Space from "components/Space/Space";

import calendar from "assets/imgs/calendar.jpg";
import memberNumber from "assets/imgs/memberNumber2x.jpg";

const StoryDetailContent = (props) => {
  const { story, imgs, user } = props;

  const ManagerInfo = ({ img, text, number, dday = "" }) => {
    return (
      <div className="storyDetailContent-managerInfo">
        <img src={img} />
        <Space size={8} />
        <div className="storyDetailContent-managerInfo-text">{text}</div>
        <span>{`${number} ${dday && `· ${dday}`}`}</span>
      </div>
    );
  };
  const Line = () => {
    return <div className="Line"></div>;
  };
  return (
    <div className="storyDetailContent">
      <div className="storyDetailContent-contents">
        <Gallery imgs={imgs} />
        <div className="storyDetailContent-contents-textarea">
          {story.content.split("\n").map((line) => {
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </div>
        <Line />
        <div className="storyDetailContent-taglist">
          {story.tag.split(",").map((tag) => (
            <div className="storyDetailContent-tag">{tag}</div>
          ))}
        </div>
      </div>
      <div className="storyDetailContent-contentsinfo">
        {localStorage.getItem("admin") && (
          <div className="storyDetailContent-manager">
            <ManagerInfo
              img={calendar}
              text="마감일"
              number={"2023.01.30"}
              dday={"D-1"}
            />
            <Space size={25} />

            <ManagerInfo img={memberNumber} text="모집인원" number={15} />
            <Space size={25} />

            <ManagerInfo img={memberNumber} text="신청인원" number={13} />
          </div>
        )}
        <StoryDetailUserInfo user={user} />
        <Space size={15} />
        <div className="storyDetailContent-tagbox">
          <div className="storyDetailContent-tagbox-title">태그</div>
          <div className="storyDetailContent-tagbox-list">
            {story.tag.split(",").map((tag) => (
              <div className="storyDetailContent-tagbox-tag">{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailContent;
