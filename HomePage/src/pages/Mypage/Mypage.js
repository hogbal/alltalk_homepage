import React, { useState } from "react";
import "./Mypage.scss";

import MypageCard from "components/MypageCard/MypageCard";
import MypageProfile from "components/MypageProfile/MypageProfile";

import image from "assets/imgs/cat.jpg";
const Mypage = () => {
  const [selectMenu, setSelectMenu] = useState("스토리");

  const onClickMenu = (e) => {
    setSelectMenu(e.currentTarget.innerText);
  };

  const dummydata = [
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
    {
      img: image,
      title: "타이틀 최대 2줄 타이틀 최대 2줄 타이틀 최대 2줄...",
      date: "어제",
    },
  ];
  return (
    <div className="mypage">
      <MypageProfile />

      <div className="mypage-list">
        <ul className="mypage-list-menu">
          <li
            className={`${selectMenu === "스토리" && "selectedMenu"}`}
            onClick={onClickMenu}
          >
            스토리
          </li>
          <li
            className={`${selectMenu === "좋아요" && "selectedMenu"} `}
            onClick={onClickMenu}
          >
            좋아요
          </li>
          <li
            className={`${selectMenu === "신청" && "selectedMenu"}`}
            onClick={onClickMenu}
          >
            신청
          </li>
        </ul>
        <div className="mypage-itemlist">
          {dummydata.map((item) => (
            <MypageCard img={item.img} title={item.title} date={item.date} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
