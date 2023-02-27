import React from "react";
import "./MypageCard.scss";

const MypageCard = (props) => {
  const { img, title, date } = props;

  return (
    <div className="mypageCard">
      <img src={img} alt={img} />
      <div className="mypageCard-description">
        <div className="mypageCard-description-title">{title}</div>
        <div className="mypageCard-description-date">{date}</div>
      </div>
    </div>
  );
};

export default MypageCard;
