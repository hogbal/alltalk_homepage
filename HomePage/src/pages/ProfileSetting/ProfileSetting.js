import React, { useState } from "react";
import "./ProfileSetting.scss";

import ProfileSettingMenuList from "components/ProfileSettingMenuList/ProfileSettingMenuList";
import ProfileEdit from "components/ProfileEdit/ProfileEdit";
import ProfileBasciEdit from "components/ProfileBasciEdit/ProfileBasciEdit";
import ProfileDetailsEdit from "components/ProfileDetailsEdit/ProfileDetailsEdit";
import Space from "components/Space/Space";
import ProfilePwEdit from "components/ProfilePwEdit/ProfilePwEdit";

const ProfileSetting = () => {
  const [currentPage, setCurrentPage] = useState("정보 수정");

  const onChangePage = (e) => {
    setCurrentPage(e.currentTarget.innerText);
  };

  return (
    <div className="profileSetting">
      <div className="profileSetting-menu">
        <ProfileSettingMenuList
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
      <div className="profileSetting-content">
        {currentPage === "정보 수정" ? (
          <>
            <ProfileEdit />
            <Space size={16} />
            <ProfileBasciEdit />
            <Space size={16} />
            <ProfileDetailsEdit />
            <Space size={40} />
            <button className="profileSetting-save">저장</button>
          </>
        ) : (
          <ProfilePwEdit />
        )}

        <Space size={200} />
      </div>
    </div>
  );
};

export default ProfileSetting;
