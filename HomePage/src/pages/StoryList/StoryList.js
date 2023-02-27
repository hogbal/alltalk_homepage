import React, { useEffect, useState } from "react";
import "./StoryList.scss";

import { throttle } from "lodash";
import axios from "axios";

import TagList from "components/TagList/TagList";
import { HashtagList } from "components/Hashtag/Hashtag";
import StoryCard from "components/StoryCard/StoryCard";

const DATA_LOAD_MAX_LENGTH = 5;

const StoryList = () => {
  const [serverTag, setServerTag] = useState("all");

  const [btnsListSelect, setBtnsListSelect] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [beerList, setBeerList] = useState([]); // 보여줄 전체 리스트
  const [offset, setOffset] = useState(0); // back에 요청할 페이지 데이터 순서 정보
  // offset 이후 순서의 데이터부터 8개씩 데이터를 받아올 것임
  const [target, setTarget] = useState(null); // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // 요청이 여러번 가는 것을 방지하기 위해서
  const [stop, setStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지
  const [contentsCnt, setContentsCnt] = useState(0);

  const onClickList = (e) => {
    setBtnsListSelect(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case 0:
        setServerTag("all");

        break;
      case 1:
        setServerTag("tag1");

        break;
      case 2:
        setServerTag("tag2");

        break;
      case 3:
        setServerTag("tag3");
        break;
      case 4:
        setServerTag("tag4");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.9,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
    if (isLoaded) {
      loadContents(contentsCnt, contentsCnt + DATA_LOAD_MAX_LENGTH);
    }
  }, [isLoaded]);

  const getMoreItem = () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };

  // callback
  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      await getMoreItem();

      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
  };

  const loadContents = throttle((start, end) => {
    let frm = new FormData();
    frm.append("id", "siugan");
    frm.append("start", start);
    frm.append("end", end);

    axios({
      method: "POST",
      url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/story/list/all",
      data: frm,
    })
      .then((res) => {
        console.log(res.data);
        // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
        setBeerList((beerList) => beerList.concat(res.data));
        // 다음 요청할 데이터 offset 정보
        setOffset((offset) => offset + res.data.length);
        // 다음 요청 전까지 요청 그만 보내도록 false로 변경
        setIsLoaded(false);
        setContentsCnt((prev) => prev + DATA_LOAD_MAX_LENGTH);
      })
      .catch((e) => console.log(e));
  }, 1500);
  return (
    <div className="storylist">
      <div className="storylist-content">
        <TagList
          onClick={onClickList}
          btnsListSelect={btnsListSelect}
          hashtags={hashtags}
          setHashtags={setHashtags}
        />

        <div className="storylist-line"></div>
        {hashtags.length !== 0 && (
          <div className="storylist-hashtag-list">
            태그 검색:&nbsp;
            <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
          </div>
        )}
        <div className="storylist-grid">
          {beerList.map((item, index) => (
            <StoryCard item={item} filter={serverTag} key={`${index}${item}`} />
          ))}
        </div>
      </div>
      <div ref={setTarget} style={{ color: "transparent" }}>
        bottom
      </div>
    </div>
  );
};

export default StoryList;
