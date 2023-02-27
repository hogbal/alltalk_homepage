import React, { useState } from "react";
import "./Hashtag.scss";

const HashtagManager = (props) => {
  const HashtagInput = ({ hashtags, setHashtags }) => {
    const [newTag, setNewTag] = useState("");

    const handleSubmit = (e) => {
      // 스페이스바 32 엔터 13
      if (e.which === 32 || e.which === 13) {
        e.preventDefault();
        props.setHashtags([...props.hashtags, newTag]);
        setNewTag("");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleSubmit}
          placeholder={props.placeholder}
          className={`${
            props.size === "large" ? "hashtag-input-large" : "hashtag-input"
          }`}
          style={{ background: props.background ? "none" : "" }}
        />
      </form>
    );
  };

  return (
    <>
      <HashtagInput hashtags={props.hashtags} setHashtags={props.setHashtags} />
    </>
  );
};
export const HashtagList = (props) => {
  const Hashtag = ({ tag }) => {
    return (
      <button
        className={`${props.default ? "hashtagDefault" : "hashtag"}`}
        onClick={props.onClick}
        value={tag}
      >
        {tag}
      </button>
    );
  };
  return (
    <div>
      {props.hashtags.map((tag) => (
        <Hashtag key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default HashtagManager;
