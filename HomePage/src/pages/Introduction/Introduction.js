import React, { useRef, useEffect, useState } from "react";
import "./Introduction.scss";
import { debounce } from "lodash";

import {
  Scene1,
  Scene2,
  Scene3,
  Scene4,
  Scene5,
  Scene6,
} from "components/IntroductionPages";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

const Introduction = () => {
  const [page, setPage] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [wheelEvent, setWheelEvent] = useState(null);
  const [ref6Scroll, setRef6Scroll] = useState(false);

  const lastY = useRef(null);
  const pageIndex = useRef(0);

  let lastTime = new Date().getTime();

  const root = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);

  pageIndex.current = page;

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    if (page === 5) {
      setTimeout(() => {
        setRef6Scroll(true);
      }, 1500);
      if (wheelEvent?.deltaY && ref6Scroll) {
        if (wheelEvent?.deltaY > 0) ref6.current?.scrollBy(0, 30);
        if (wheelEvent?.deltaY < 0) ref6.current?.scrollBy(0, -30);
      }
    } else setRef6Scroll(false);
  }, [wheelEvent]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const handleScroll = (e) => {
      e.preventDefault();
      setWheelEvent(e);
      const currentTime = new Date().getTime();
      const isEnable = currentTime - lastTime > 1400;

      if (!isEnable) return;

      // Delta Y > 0 -> Page Down
      // Delta Y < 0 -> Page Up
      if (e.deltaY < 0 && pageIndex.current < 6 && pageIndex.current > 0) {
        setPage(pageIndex.current - 1);
      }
      if (e.deltaY > 0 && pageIndex.current < 6 && pageIndex.current >= 0) {
        setPage(pageIndex.current + 1);
      }
      if (
        e.deltaY < 0 &&
        pageIndex.current === 6 &&
        ref6.current?.scrollTop === 0
      )
        setPage(5);

      lastTime = currentTime;
    };

    const mobileStart = debounce((e) => {
      lastY.current = e.touches[0].clientY;
      lastTime = new Date().getTime();
    }, 35);

    const mobileMove = debounce((e) => {
      const currentTime = new Date().getTime();

      if (lastY.current && !(currentTime - lastTime > 1200)) {
        if (
          e.touches[0].clientY - lastY.current > 10 &&
          pageIndex.current < 5 &&
          pageIndex.current > 0
        ) {
          setPage(pageIndex.current - 1);
        } else if (
          lastY.current - e.touches[0].clientY > 10 &&
          pageIndex.current < 5 &&
          pageIndex.current >= 0
        ) {
          setPage(pageIndex.current + 1);
        }
        // else if (
        //   (e.touches[0].clientY - lastY.current > 10 &&
        //     pageIndex.current === 5 &&
        //     e.touches[0].target.className === "scene7-content") ||
        //   e.touches[0].target.className === "scene7-content-card animate"
        // ) {
        //   setPage(pageIndex.current - 1);
        // }
      }
      lastY.current = e.touches[0].clientY;
    }, 35);

    const mobileEnd = debounce((e) => {
      lastY.current = null;
    }, 35);

    root.current?.addEventListener("wheel", handleScroll);

    root.current?.addEventListener("touchstart", mobileStart);
    root.current?.addEventListener("touchmove", mobileMove);
    root.current?.addEventListener("touchend", mobileEnd);

    return () => {
      root.current?.removeEventListener("wheel", handleScroll);

      root.current?.removeEventListener("touchstart", mobileStart);
      root.current?.removeEventListener("touchmove", mobileMove);
      root.current?.removeEventListener("touchend", mobileEnd);

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (page === 0) {
      ref1.current?.scrollIntoView();
    }
    if (page === 1) {
      ref2.current?.scrollIntoView();
    }
    if (page === 2) {
      ref3.current?.scrollIntoView();
    }
    if (page === 3) {
      ref4.current?.scrollIntoView();
    }
    if (page === 4) {
      ref5.current?.scrollIntoView();
    }
    if (page === 5) {
      ref6.current?.scrollIntoView();
    }
    if (page === 6) {
      ref7.current?.scrollIntoView();
    }
  }, [windowHeight]);

  useEffect(() => {
    if (page === 0) {
      ref1.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 1) {
      ref2.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 2) {
      ref3.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 3) {
      ref4.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 4) {
      ref5.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 5) {
      ref6.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (page === 6) {
      ref7.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const onTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(0);
  };

  return (
    <div className="introduction" ref={root}>
      <div className="introduction-header">
        <Header landing={true} page={page} onTop={onTop} />
      </div>
      <div className="introduction-main">
        <Scene1 ref={ref1} animate={page === 0} />
      </div>
      <div className="introduction-contents">
        <Scene2 ref={ref2} animate={page === 1} />
        <Scene3 ref={ref3} animate={page === 2} />
        <Scene4 ref={ref4} animate={page === 3} />
        <Scene5 ref={ref5} animate={page === 4} />
        <Scene6 animate={page === 5} ref={ref6} />
        <Footer landing={true} ref={ref7} />
      </div>
    </div>
  );
};

export default Introduction;
