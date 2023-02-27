import React, { useState } from "react";
import "./WriteArticle.scss";

import Input from "components/Input/Input";
import Calendar from "components/Calendar/Calendar";
import Imageuploader from "components/ImageUploader/ImageUploader";
import axios from "axios";
import Header from "components/Header/Header";

const WriteArticle = () => {
  const [inputData, setInputData] = useState({
    title: "",
    subTitle: "",
    contents: "",
    member: "",
  });
  const [errorCheck, setErrorCheck] = useState({
    title: false,
    contents: false,
    member: false,
    hashtags: false,
  });
  const [hashtags, setHashtags] = useState([]);
  const [duedate, setDuedate] = useState("7일 후");
  const [selectDate, setSelectDate] = useState(" ");
  const [activeCalendar, setActiveCalendar] = useState(false);

  const onChangeInputs = (type, e) => {
    switch (type) {
      case "title":
        setInputData({ ...inputData, title: e.target.value });
        break;
      case "subTitle":
        setInputData({ ...inputData, subTitle: e.target.value });
        break;
      case "contents":
        setInputData({ ...inputData, contents: e.target.value });
        break;
      case "member":
        setInputData({ ...inputData, member: e.target.value });
        break;
      default:
        break;
    }
  };

  const onClickDuedate = (e) => {
    setDuedate(e.currentTarget.value);
  };

  const handleCalendar = () => {
    setActiveCalendar(!activeCalendar);
  };
  const onClickCalendar = (e) => {
    setSelectDate(e);
  };
  const titleCheck = () => {
    return inputData.title.length === 0;
  };
  const contentsCheck = () => {
    return inputData.contents.length === 0;
  };
  const memberCheck = () => {
    return inputData.member.length === 0;
  };
  const tagsCheck = () => {
    return hashtags.length < 3;
  };

  const uploadBtn = () => {
    const { title, subTitle, contents, member } = inputData;

    setErrorCheck({
      ...errorCheck,
      title: titleCheck(),
      contents: contentsCheck(),
      member: memberCheck(),
      hashtags: tagsCheck(),
    });

    if (
      !errorCheck.contents &&
      !errorCheck.hashtags &&
      !errorCheck.member &&
      !errorCheck.title
    ) {
      try {
        let date = selectDate.split(".");
        const frm = new FormData();
        console.log(postImages, detailImages);
        frm.append("id", "user");
        frm.append("title", title);
        frm.append("name", "user");
        frm.append("subtitle", subTitle);
        frm.append("content", contents);
        frm.append("file[]", detailImages);
        frm.append("maxMember", member.toString());
        frm.append("tag", hashtags);
        frm.append("deadline", new Date(date[0], date[1] - 1, date[2]));
        axios({
          method: "POST",
          url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/write/story",
          data: frm,
        })
          .then((res) => {
            console.log(res.data);
            if (res.data.result) {
              // navigate("/");
            }
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }
  };
  const saveBtn = async () => {
    try {
      const { title, subTitle, contents, member } = inputData;
      console.log(postImages, detailImages);

      const frm = new FormData();
      frm.append("id", "user");
      frm.append("title", title);
      frm.append("name", "user");
      frm.append("subtitle", subTitle);
      frm.append("content", contents);
      frm.append("file[]", detailImages);
      frm.append("maxMember", member.toString());
      frm.append("tag", hashtags);
      // frm.append("deadline", new Date(date[0], date[1] - 1, date[2]));
      // frm.append("admin", true);

      await axios({
        method: "POST",
        url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/write/story/temp",
        data: frm,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.result) {
            // navigate("/");
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const HashtagInput = ({ hashtags, setHashtags, placeholder, error }) => {
    const [newTag, setNewTag] = useState("");

    const handleSubmit = (e) => {
      if (newTag !== " " && newTag.length > 0) {
        // 스페이스바 32 엔터 13
        if (e.which === 32 || e.which === 13) {
          e.preventDefault();
          setHashtags([...hashtags, newTag]);
          setNewTag("");
        }
      }
    };

    return (
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={handleSubmit}
        placeholder={placeholder}
        className="writearticle-hashtag-input"
        style={{ borderColor: error && "red" }}
      />
    );
  };

  const HashtagList = (props) => {
    const onRemove = (e) => {
      e.preventDefault();
      setHashtags(
        hashtags.filter((hashtag) => hashtag !== e.currentTarget.value)
      );
    };
    const Hashtag = ({ tag }) => {
      return (
        <button className="writearticle-hashtag" onClick={onRemove} value={tag}>
          {tag}
          <span>X</span>
        </button>
      );
    };
    return (
      <div className="writearticle-hashtag-list">
        {props.hashtags.map((tag) => (
          <Hashtag key={tag} tag={tag} />
        ))}
      </div>
    );
  };

  const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [detailImages, setDetailImages] = useState([]); // 프리뷰 보여줄 이미지 데이터

  const uploadFile = (e) => {
    let fileArr = e.target.files; //  사용자가 선택한 파일들

    setPostImages(Array.from(fileArr)); //
    let fileURLs = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개

    // 프리뷰
    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setDetailImages([...detailImages, ...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="writearticle">
      <button onClick={uploadBtn}>aa</button>
      <button onClick={saveBtn}>save</button>
      <form className="writearticle-box">
        <ul>
          <li style={{ marginTop: "60px" }}>
            <span className="writearticle-subtitle">제목*</span>
            <span className="writearticle-input">
              <Input
                type={"text"}
                placeholder="제목을 입력해주세요."
                onChange={(e) => onChangeInputs("title", e)}
                error={errorCheck.title}
              />
              {errorCheck.title && (
                <div className="error-message">제목을 입력해주세요.</div>
              )}
            </span>
          </li>
          <li>
            <span className="writearticle-subtitle">부제목</span>
            <span className="writearticle-input">
              <Input
                type={"text"}
                placeholder="내용을 요약하는 부제목을 입력해주세요."
                onChange={(e) => onChangeInputs("subTitle", e)}
              />
            </span>
          </li>
          <li className="writearticle-subtitle-flexstart">
            <span className="writearticle-subtitle ">내용*</span>
            <span className="writearticle-input">
              <textarea
                placeholder="내용을 입력해주세요. (10글자 이상)"
                onChange={(e) => onChangeInputs("contents", e)}
                error={errorCheck.contents}
                style={{ borderColor: errorCheck.contents && "red" }}
              ></textarea>
              {errorCheck.contents && (
                <div className="error-message">
                  내용을 10글자 이상 입력해주세요.
                </div>
              )}
            </span>
          </li>
          <li
            className="writearticle-subtitle-flexstart"
            style={{ marginTop: "32px" }}
          >
            <span className="writearticle-subtitle ">이미지</span>
            <span className="writearticle-input">
              <Imageuploader
                List={detailImages}
                setlist={setDetailImages}
                onChange={uploadFile}
                setPostImages={setPostImages}
              />
            </span>
          </li>
          <li
            className="writearticle-subtitle-flexstart"
            style={{ marginBottom: "112px", marginTop: "32px" }}
          >
            <span className="writearticle-subtitle ">태그*</span>
            <span className="writearticle-input">
              <HashtagInput
                hashtags={hashtags}
                setHashtags={setHashtags}
                placeholder={"태그를 입력해주세요. (3개 이상)"}
                error={errorCheck.hashtags}
              />
              {errorCheck.hashtags && (
                <div className="error-message">
                  3개 이상의 태그를 입력해주세요.
                </div>
              )}
              {hashtags.length !== 0 && (
                <div>
                  <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
                </div>
              )}
            </span>
          </li>
        </ul>
      </form>
      {localStorage.getItem("admin") && (
        <>
          <div
            className="writearticle-box"
            style={{ paddingTop: "60px", paddingBottom: "60px" }}
          >
            <ul>
              <li>
                <span className="writearticle-subtitle">참여인원*</span>
                <span className="writearticle-input writearticle-manager">
                  <Input
                    type={"text"}
                    placeholder="단위 없이 숫자만 입력해주세요."
                    onChange={(e) => onChangeInputs("member", e)}
                    error={errorCheck.member}
                  />
                  <span style={{ paddingLeft: "12px" }}>명</span>
                  {errorCheck.member && (
                    <div className="error-message">
                      참여인원을 입력해주세요.
                    </div>
                  )}
                </span>
              </li>
              <li style={{ marginTop: "45px" }}>
                <span className="writearticle-subtitle">마감 기간*</span>
                <span className="writearticle-manager-input">
                  <button
                    onClick={onClickDuedate}
                    value={"7일 후"}
                    id="writearticle-input-button"
                    className={`${
                      duedate === "7일 후" && "writearticle-duedate"
                    } writearticle-input-button`}
                  >
                    7일 후
                  </button>
                  <button
                    onClick={onClickDuedate}
                    value={"14일 후"}
                    id="writearticle-input-button"
                    className={`${
                      duedate === "14일 후" && "writearticle-duedate"
                    } writearticle-input-button`}
                  >
                    14일 후
                  </button>
                  <button
                    onClick={onClickDuedate}
                    value={"1달 후"}
                    id="writearticle-input-button"
                    className={`${
                      duedate === "1달 후" && "writearticle-duedate"
                    } writearticle-input-button`}
                  >
                    1달 후
                  </button>
                  <div className="writearticle-calendar-box">
                    {/* {activeCalendar && ( */}
                    <div
                      className="writearticle-calendar"
                      style={{
                        visibility: activeCalendar ? "visible" : "hidden",
                      }}
                    >
                      <Calendar onClick={onClickCalendar} />
                    </div>
                    {/* )} */}
                    <button
                      className="writearticle-calendarBtn"
                      onClick={handleCalendar}
                      value={selectDate}
                    >
                      {selectDate}
                    </button>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WriteArticle;
