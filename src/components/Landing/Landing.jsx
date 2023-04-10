import "./Landing.scss";
import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineCalendar } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const leftSideSlider = [
  {
    title: "Учебный центр ",
    titleSpan: "Виноградарства!",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Учебный центр ",
    titleSpan: "Виноградарства!",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Учебный центр ",
    titleSpan: "Виноградарства!",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const rightSideSlider = [
  {
    date: "6 февраля",
    hours: "12:00",
    loc: "Учебный центр Виноградарства! ",
  },

  {
    date: "6 февраля",
    hours: "12:00",
    loc: "Учебный центр Виноградарства! ",
  },

  {
    date: "6 февраля",
    hours: "12:00",
    loc: "Учебный центр Виноградарства! ",
  },
];

const Landing = () => {
  const [width, setWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const matches = useMediaQuery("(min-width: 576px)");

  const { pathname } = useLocation();

  function calculateSliderPositions(numSliders, width) {
    const sliderPositions = [];

    for (let i = 0; i < numSliders; i++) {
      sliderPositions.push(i * width);
    }

    return sliderPositions;
  }

  const numberOfSlides =
    rightSideSlider.length === leftSideSlider.length
      ? leftSideSlider.length
      : 0;

  useEffect(() => {
    if (matches) {
      setWidth(400);
    } else {
      setWidth(330);
    }
  }, [pathname, matches]);

  const sliderPositions = calculateSliderPositions(numberOfSlides, width);

   
  const handleDotClick = (index) => {
    setActiveDot(index);
    setSliderPosition(-sliderPositions[index]);
  };
  useEffect(() => {
    handleDotClick(0);
  }, [pathname, matches]);
  useEffect(() => {
    // Function to update the slider position
    const updateSlider = () => {
      // Increment the active slider index
      const nextIndex = activeDot === numberOfSlides - 1 ? 0 : activeDot + 1;
      setActiveDot(nextIndex);
      setSliderPosition(-sliderPositions[nextIndex]);
    };

    // Set the interval to update the slider every 30 seconds
    const intervalId = setInterval(updateSlider, 10000);

    // Clean up the interval when the component unmounts or when the active slider changes
    return () => clearInterval(intervalId);
  }, [activeDot, numberOfSlides, sliderPositions]);

  return (
    <section
      className="landing"
      style={{
        background: "url('/images/headerBG.png')",
      }}
    >
      <div className="landing__wrapper">
        <div className="landing__right">
          <div className="landing__slider-wrapper">
            {leftSideSlider.map(({ title, titleSpan, desc }, i) => {
              const [firstWord, ...others] = title.split(" ");

              return (
                <div
                  className={`landing__slider ${
                    activeDot === i ? "active-slider" : ""
                  }`}
                  style={{
                    transform: `translateX(${sliderPosition + 0}px)`,
                  }}
                  key={i}
                >
                  <h1 className={`${i !== 0 ? "notFirstSlide-title" : ""}`}>
                    {title} <span>{titleSpan}</span>{" "}
                  </h1>
                  {/* <p>{desc}</p> */}
                </div>
              );
            })}
          </div>
          <Link className="buy" to="/courses">
            Купить
          </Link>
        </div>
        <div className="landing__left">
          <div className="landing__slider-wrapper">
            {rightSideSlider.map(({ date, hours, loc }, i) => (
              <ul
                key={i}
                className={`landing__slider ${
                  activeDot === i ? "active-slider" : ""
                }`}
                style={{
                  transform: `translateX(${sliderPosition}px)`,
                }}
              >
                <li>
                  <span>
                    <HiOutlineCalendar />
                  </span>
                  <p>{date}</p>
                </li>
                <li>
                  <span>
                    <AiOutlineClockCircle />
                  </span>
                  <p>{hours}</p>
                </li>
                <li>
                  <span>
                    <TiLocationOutline />
                  </span>
                  <p>{loc}</p>
                </li>
              </ul>
            ))}
          </div>
          <h6>700.000 сум</h6>
        </div>
      </div>
      <div className="landing__dots-container">
        <div className="landing__dots-wrapper">
          {Array.from({ length: numberOfSlides }, (_, i) => (
            <div
              className={`slider-dots ${activeDot === i ? "active-dot" : ""}`}
              key={i}
              onClick={() => handleDotClick(i)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Landing;
