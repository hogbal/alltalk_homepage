import React, { useState } from "react";
import "./ImageUploader.scss";

import { throttle } from "lodash";

const ImageUploader = (props) => {
  const { onChange, List, setlist, setPostImages } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [id, setId] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = throttle((e) => {
    e.preventDefault();
    setIsDragOver(true);
    setId(e.target.id);
  }, 500);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragOver(false);

    List.splice(e.target.id, 1);
    List.splice(id, 0, e.target.src);
  };

  const deleteImg = (e) => {
    e.preventDefault();
    setlist(List.filter((item) => item !== e.currentTarget.value));
  };

  return (
    <div className="imageuploader">
      <input type={"file"} multiple onChange={onChange} />

      {List.map((item, index) => (
        <div className="imageuploader-box">
          <img
            src={item}
            alt={`${item}`}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDrop}
            draggable
            id={index}
          />
          <button
            className="imagedeleteBtn"
            onClick={deleteImg}
            value={item}
          ></button>
          {index === 0 && <div className="imageuploader-mainImg">대표사진</div>}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
