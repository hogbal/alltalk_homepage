import React from "react";
import "./ToggleBtn.scss";

const ToggleBtn = (props) => {
  return (
    <div
      className={`toggle ${
        props.active ? "toggle-active" : "toggle-nonactive"
      }`}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

export default ToggleBtn;
