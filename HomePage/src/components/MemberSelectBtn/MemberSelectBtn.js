import React from "react";
import "./MemberSelectBtn.scss";

const MemberSelectBtn = (props) => {
  const { img, position, name, number, active, onChange } = props;
  return (
    <button
      className={`memberSelectBtn ${active && "active"}`}
      value={name}
      id={number}
      onClick={onChange}
    >
      <img src={img} alt="name" />
      <div className="memberSelectBtn-position">{position}</div>
      <div className="memberSelectBtn-name">{name}</div>
    </button>
  );
};

export default React.memo(MemberSelectBtn);
