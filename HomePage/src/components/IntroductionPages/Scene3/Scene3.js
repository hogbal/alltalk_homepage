import React, { forwardRef } from "react";
import InfoCard from "./InfoCard/InfoCard";
import "./Scene3.scss";

import image1 from "assets/imgs/Scene3/Scene3-infocard-1.jpg";
import image2 from "assets/imgs/Scene3/Scene3-infocard-2.jpg";
import image3 from "assets/imgs/Scene3/Scene3-infocard-3.jpg";

const Scene3 = forwardRef((props, ref) => {
  return (
    <div className="scene3" ref={ref}>
      <div className="scene3-textbox">
        <div className="scene3-title">사업 소개</div>
        <div className="scene3-content">
          분리수거함은 우리의 환경 속에 늘 함께 있습니다.
          <br /> ALL TALK는 실시간 관리 무인분리수거함 서비스를 제공해
          <br /> 쓰레기로 인한 외부적 시각 문제를 해결하고 올바른 분리수거
          문화를 개선하고자 합니다.
        </div>
      </div>
      <div className="scene3-cardlist">
        <InfoCard
          img={image1}
          size={"small"}
          title={"RUP"}
          content={
            "Return me Used Plsatic trash 사용한 플라스틱 쓰레기 및 재활용 쓰레기들을 ALL TALK에게 반환해달라는 의미를 담은 로고 제작"
          }
        />
        <InfoCard
          img={image2}
          title={"재활용 쓰레기 식별 AI 모델"}
          content={
            "재활용 쓰레기 소재를 식별하고 추가적으로 한국 환경 공단에서 정의한 재활용 코드 중 PET, PP, PS를 추가적으로 학습시켜 플라스틱 소재를 식별할 수 있는 차별성 보유"
          }
        />
        <InfoCard
          img={image3}
          title={"IOT 실시간 무인 분리수거함"}
          content={
            "IOT 실시간 무인 분리수거함으로 부터 데이터를 받아 올 수 있도록 제작하였으며 사용자들의 참여도 개선을 위해 포인트를 적립할 수 있는 APP연동 서비스 제공"
          }
        />
      </div>
    </div>
  );
});

export default Scene3;
