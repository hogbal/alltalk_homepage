import React from "react";
import "./InfoCard.scss";

const InfoCard = (props) => {
  const { img, title, content, size } = props;
  return (
    <div className="infoCard">
      <div className={`infoCard-image ${size === "small" && "infoCard-small"}`}>
        <img src={img} alt={img} />
      </div>
      <div className="infoCard-text">
        <div className="infoCard-title">{title}</div>
        <div className="infoCard-content">{content}</div>
      </div>
    </div>
  );
};

export default InfoCard;
