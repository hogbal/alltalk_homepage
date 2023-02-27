import React, { forwardRef } from "react";
import "./Scene2.scss";

import HistoryList from "components/HistoryList/HistoryList";

const Scene2 = forwardRef((props, ref) => {
  const { animate } = props;

  return (
    <div className="scene2" ref={ref}>
      <div className="scene2-backgroundimg"></div>
      <div className="scene2-left">
        ALLTALK는
        <br />
        <span>사회적 트렌드를</span>
        <br />
        추구하고 성장합니다.
      </div>
      <div className="scene2-right">
        <HistoryList animate={animate} />
      </div>
    </div>
  );
});

export default Scene2;
