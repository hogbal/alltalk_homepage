import Space from "components/Space/Space";
import React, { useState } from "react";
import "./ProfileSettingMenuList.scss";

const ProfileSettingMenuList = (props) => {
  const { currentPage, onChangePage } = props;
  // const [currentPage, setCurrentPage] = useState("정보 수정");
  return (
    <div className="profileSettingMenuList">
      <div className="profileSettingMenuList-title">프로필 설정</div>
      <ul>
        <li
          className={`${
            currentPage === "정보 수정" && "profilesettingCurrent"
          }`}
          onClick={onChangePage}
        >
          정보 수정
        </li>
        <Space size={32} />
        <li
          className={`${
            currentPage === "비밀번호 변경" && "profilesettingCurrent"
          }`}
          onClick={onChangePage}
        >
          비밀번호 변경
        </li>
        <Space size={32} />
        <li
          className={`${currentPage === "회원탈퇴" && "profilesettingCurrent"}`}
        >
          회원탈퇴
        </li>
      </ul>
    </div>
  );
};

export default ProfileSettingMenuList;
