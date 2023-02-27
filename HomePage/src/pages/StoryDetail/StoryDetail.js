import React, { useEffect, useState } from "react";
import "./StoryDetail.scss";
import { useLocation } from "react-router";

import StoryDetailTitle from "components/StoryDetailTitle/StoryDetailTitle";
import StoryDetailContent from "components/StoryDetailContent/StoryDetailContent";

import image from "../../assets/imgs/cat.jpg";
import image2 from "../../assets/imgs/cat.jpg";
import image3 from "../../assets/imgs/midbtn.jpg";
import axios from "axios";

const StoryDetail = ({ navigate }) => {
  const { state } = useLocation();

  const [page, setPage] = useState({
    left: state.idx - 1 > 0,
    mid: true,
    right: true,
  });
  const [imgs, setImgs] = useState([]);
  const [story, setStory] = useState({
    idx: "",
    content: "",
    day: "",
    subtitle: "",
    tag: "",
    title: "",
  });
  const [user, setUser] = useState({
    introduce: "",
    nickname: "",
    profile: "",
  });
  const [content, setContent] = useState({
    content: "",
    day: "",
    deadline: "",
    idx: "",
    maxMember: "",
    member: "",
    subtitle: "",
    tag: "",
    title: "",
  });

  const [nextContent, setNextContent] = useState({
    day: "",
    idx: "",
    img: "",
    title: "",
  });
  const [preContent, setPreContent] = useState({
    day: "",
    idx: "",
    img: "",
    title: "",
  });

  const loadData = () => {
    axios({
      method: "POST",
      url: `http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/${state.root}/${state.idx}`,
    }).then((res) => {
      if (!res.data.result) {
        setImgs(res.data.img);
        setUser(res.data.user);
        setStory(res.data.story);
        setContent(res.data.content);
        setNextContent(res.data.nextContent);
        setPreContent(res.data.preContent);
      }
      console.log(content, res.data.user);
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="storyDetail">
      <div className="storyDetail-title">
        {state.root === "content" ? (
          <StoryDetailTitle story={content} user={user} />
        ) : (
          <StoryDetailTitle story={story} user={user} />
        )}
      </div>
      <div className="storyDetail-content">
        {state.root === "content" ? (
          <StoryDetailContent story={content} user={user} imgs={imgs} />
        ) : (
          <StoryDetailContent story={story} user={user} imgs={imgs} />
        )}
      </div>
      <div className="storyDetail-bottom">
        {page.left && (
          <button className="storyDetail-btn-left">
            <img src={image} />
            <div className="storyDetail-btn-title">이전 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}

        {page.mid && (
          <button
            className="storyDetail-btn-mid"
            style={{
              borderRadius: `${
                !page.left
                  ? "10px 0px 0px 10px"
                  : !page.right && "0px 10px 10px 0px"
              }`,
            }}
          >
            <img src={image3} />
            <div className="storyDetail-btn-title">현재 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}
        {page.right && (
          <button className="storyDetail-btn-right">
            <img src={image2} />

            <div className="storyDetail-btn-title">다음 스토리</div>
            <div className="storyDetail-btn-content">
              타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄
              타이틀 최대 2줄 타이틀 최대 2줄...
            </div>
            <div className="storyDetail-btn-time">3시간 전</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
