import React, { useEffect, useState } from "react";
import "./StoryCard.scss";

import Tag from "components/Tag/Tag";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoryCard = (props) => {
  const {
    profile,
    nickname,
    day,
    img,
    tag,
    title,
    content,
    like,
    subtitle,
    idx,
    islike,
  } = props.item;
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(like);
  const [image, setImage] = useState();
  const [profileImg, setProfile] = useState();

  const handleClick = async () => {
    const frm = new FormData();
    frm.append("id", "siugan1");
    frm.append("idx", idx);
    await axios({
      method: "POST",
      url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/like",
      data: frm,
    }).then((res) => {
      if (res.data.result) {
        setLikeCnt((prev) => {
          return prev + 1;
        });
        setLiked(true);
      }
    });
  };

  const Image = () => {
    axios({
      method: "POST",
      url: img,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );

      setImage(url);
    });
  };

  const ProfileImg = () => {
    axios({
      method: "POST",
      url: profile,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setProfile(url);
    });
  };

  const onClickDetail = (idx) => {
    navigate("/StoryDetail", { state: { idx: idx, root: "story" } });
  };

  useEffect(() => {
    Image();
    ProfileImg();
  }, []);

  return (
    <div
      className="storycard"
      style={{
        display:
          tag.split(",").find((item) => item === props.filter) === undefined &&
          props.filter !== "all" &&
          "none",
      }}
      onClick={() => onClickDetail(idx)}
    >
      <div className="storycard-profile">
        <img src={profileImg} alt="profileImg" />

        <div className="storycard-info">
          {nickname} <br />
          <span>{getDayMinuteCounter(day)}</span>
        </div>
      </div>
      {img && (
        <div className="storycard-image">
          <img src={image} />
        </div>
      )}
      <div className="storycard-detail">
        <div className="storycard-contents">
          {tag && (
            <div className="storycard-tag">
              {tag.split(",").map((tag, index) => (
                <Tag text={tag} id={index} />
              ))}
            </div>
          )}
          <div className="storycard-title">{title}</div>
          <div className="storycard-content">{subtitle}</div>
        </div>
        <div className="storycard-like">
          <button className={liked ? "liked" : ""} onClick={handleClick} />
          <span className={liked ? "liked" : ""}>{likeCnt}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
