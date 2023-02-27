import React, { useState, forwardRef } from "react";
import "./Scene5.scss";

import MemberSelect from "components/MemberSelectBtn/MemberSelectBtn";
import ceo from "assets/imgs/Scene5/ceoImg.jpg";
import ceo2 from "assets/imgs/Scene5/ceoImg2.jpg";
import cto from "assets/imgs/Scene5/ctoImg.jpg";
import Space from "components/Space/Space";

const Scene5 = forwardRef((props, ref) => {
  const [selectMember, setSelectMember] = useState({
    name: "박소영",
    number: 0,
  });
  const [memberInfo, setMemberInfo] = useState([
    {
      name: "박소영",
      title: `내가 추구하고자하는 목표에 도전하여 그 과정 속에서 경험하고 만나는
    인연에 깨달음을 얻는 과정이 즐겁습니다.`,
      position: "대표",
      list: [
        "· 2022 한국장학재단 IR 피칭대회 수상",
        "· 2022동남권 LINC3.0 노마드 캠프 & 창업아이디어 대학별 경진대회 최우수상",
        "· 2022동남권 LINC3.0 노마드 캠프 & 창업아이디어 혼합팀 경진대회 최우수상",
        "· 2022 부산 경제 진흥원 IR역량 강화 최우수상",
        "· 2021 스마트 거버넌스 R&D 부산시 관광지 추천시스템 개발 학생 연구원",
        "· 2021 KIC(Korea Innovation Center Washington D.C)해외 창업 교육 선정 수료",
        "· 2021 한국 정보 과학회 컴퓨터 종합학술대회 학부생 논문경진대회 우수상",
        "· 2020 동남권 LINC+ 노마드 캠프& 창업 아디어 경진대회 혼합팀 최우수상",
        "· 2020 부산 SW/AI 리빙랩 지원사업 수료",
        "· 2022~2020 동아대학교 창업동아리 팀장",
      ],
    },
    {
      name: "양강민",
      title: `아무거나`,
      position: "기술개발(AI/Sercurity)",
      list: [
        "· 2020 동남권 LINC+ 창업노마드 FAIR 최우수상 수상",
        "· 2021 인공지능 그랜드 ict 연구 센터 최우수상 수상",
        "· 2021동남권실험실 창업 혁신단 창업 Accelerating 프로그램 수료",
        "· 2021 KIC(Korea Innovation Center Washington DC)창업교육 수료",
        "· 2021 동아대학교 컴퓨터공학과 랩실 학생연구원",
        "· 2022 과학기술 정보통신부 I-Core 공공기술 기반 해외시장 연계 창업 탐색지원 사업 수료",
        "· 동아대학교 산학협력단 RUP 창업동아리 1기~3기",
        "· 리눅스 마스터 1급",
      ],
    },
  ]);

  const onChangeSelectedMember = (e) => {
    setSelectMember({
      name: e.currentTarget.value,
      number: e.currentTarget.id,
    });
  };

  const MemberInfo = () => {
    return (
      <>
        <div className="scene5-content-img">
          <img src={ceo2} alt="대표이미지" />
          <div className="scene5-content-img-text">
            <div className="scene5-content-img-name">
              {memberInfo[selectMember.number].name}
            </div>
            <div className="scene5-content-img-position">
              {memberInfo[selectMember.number].position}
            </div>
          </div>
        </div>
        <div className="scene5-content-textbox">
          <div className="scene5-content-title">
            {memberInfo[selectMember.number].title.split("\n").map((item) => {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            })}
          </div>
          <div className="scene5-content-history">
            {memberInfo[selectMember.number].list.map((item) => (
              <>
                {item}
                <br />
              </>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="scene5" ref={ref}>
      <div className="scene5-top">
        <div className="scene5-title">
          대표자 및<br /> 팀원 역량 소개
        </div>
        <div className="scene5-btns">
          <MemberSelect
            img={ceo}
            position="대표"
            name="박소영"
            number={0}
            active={selectMember.name === "박소영"}
            onChange={onChangeSelectedMember}
          />
          <Space size={24} />
          <MemberSelect
            img={cto}
            position="기술개발(AI/Sercurity)"
            name="양강민"
            number={1}
            active={selectMember.name === "양강민"}
            onChange={onChangeSelectedMember}
          />
        </div>
      </div>
      <div className="scene5-contents">
        <MemberInfo />
      </div>
    </div>
  );
});

export default Scene5;
