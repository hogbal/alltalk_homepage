import React, { useLayoutEffect, useRef, useEffect, useState } from "react";

import "./Slider.scss";
import "./SliderItem.scss";

import image1 from "assets/imgs/image1.png";
import image2 from "assets/imgs/image2.png";
import image3 from "assets/imgs/image3.jpeg";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Slider = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const items = [image1, image2, image3];
  const itemSize = items.length;
  const transitionTime = 1000;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const copyImageData = 2;
  const [currentIndex, setCurrentIndex] = useState(copyImageData);
  const [slideTransition, setTransition] = useState(transitionStyle);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideX, setSlideX] = useState(null);
  const [prevSlideX, setPrevSlideX] = useState(false);
  let isResizing = useRef(false);

  let slides = setSlides();
  function setSlides() {
    let addedFront = [];
    let addedLast = [];
    var index = 0;
    while (index < copyImageData) {
      addedLast.push(items[index % items.length]);
      addedFront.unshift(items[items.length - 1 - (index % items.length)]);
      index++;
    }
    return [...addedFront, ...items, ...addedLast];
  }

  useEffect(() => {
    isResizing.current = true;
    setIsSwiping(true);
    setTransition("");
    setTimeout(() => {
      isResizing.current = false;
      if (!isResizing.current) setIsSwiping(false);
    }, 1000);
  }, [windowWidth]);

  useInterval(
    () => {
      handleSlide(currentIndex + 1);
    },
    !isSwiping && !prevSlideX ? 3000 : null
  );

  function replaceSlide(index) {
    setTimeout(() => {
      setTransition("");
      setCurrentIndex(index);
    }, transitionTime);
  }

  function handleSlide(index) {
    setCurrentIndex(index);
    if (index - copyImageData < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - copyImageData >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  }

  function getItemIndex(index) {
    index -= copyImageData;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  }

  function getClientX(event) {
    return event._reactName === "onTouchStart"
      ? event.touches[0].clientX
      : event._reactName === "onTouchMove" || event._reactName === "onTouchEnd"
      ? event.changedTouches[0].clientX
      : event.clientX;
  }

  function handleTouchStart(e) {
    setPrevSlideX((prevSlideX) => getClientX(e));
  }

  function handleTouchMove(e) {
    if (prevSlideX) {
      setSlideX((slideX) => getClientX(e) - prevSlideX);
    }
  }

  function handleMouseSwipe(e) {
    if (slideX) {
      const currentTouchX = getClientX(e);
      if (prevSlideX > currentTouchX + 100) {
        handleSlide(currentIndex + 1);
      } else if (prevSlideX < currentTouchX - 100) {
        handleSlide(currentIndex - 1);
      }
      setSlideX((slideX) => null);
    }
    setPrevSlideX((prevSlideX) => null);
  }

  return (
    <div className="slider-area">
      <div className="slider-btn">
        <button
          className="slider-btn-arrow"
          onClick={() => handleSlide(currentIndex - 1)}
        >
          <img
            src={require("../../assets/imgs/SlideArrowLeft.png")}
            alt={`sliderBtnleft`}
          />
        </button>
        {`${(currentIndex % itemSize) + 1}/${itemSize}`}
        <button
          className="slider-btn-arrow"
          onClick={() => handleSlide(currentIndex + 1)}
        >
          <img
            src={require("../../assets/imgs/SlideArrowRight.png")}
            alt={`sliderBtnright`}
          />
        </button>
      </div>
      <div className="slider">
        <div className="slider-list">
          <div
            className="slider-track"
            onMouseOver={() => setIsSwiping(true)}
            onMouseOut={() => setIsSwiping(false)}
            style={{
              transform: `translateX(calc(${
                (-100 / slides.length) * (0.5 + currentIndex)
              }% + ${slideX || 0}px))`,
              transition: slideTransition,
            }}
          >
            {slides.map((slide, slideIndex) => {
              const itemIndex = getItemIndex(slideIndex);
              return (
                <div
                  key={slideIndex}
                  className={`slider-item ${
                    currentIndex === slideIndex ? "current-slide" : ""
                  }`}
                  onMouseDown={handleTouchStart}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onMouseMove={handleTouchMove}
                  onMouseUp={handleMouseSwipe}
                  onTouchEnd={handleMouseSwipe}
                  onMouseLeave={handleMouseSwipe}
                >
                  <img src={items[itemIndex]} alt={`banner${itemIndex}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
