import React from "react";
import "./Tag.scss";

const Tag = (props) => {
  return (
    <div className={`tag ${props.id <= 1 && "tag-margin"}`}>{props.text}</div>
  );
};

export default Tag;
