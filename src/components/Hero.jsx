import React, { useState } from "react";
import "../css/main.css";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();
  const [reference, setReference] = useState("Hello There!");

  const handleMouseEnter = () => setReference("General Kenobi!");
  const handleMouseLeave = () => setReference("Hello There!");
  return (
    <>
      <div className="hero">
        <div className="greetings">
          <span
            className="referenceText"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {reference}
          </span>
          &nbsp;I am
          <h1 data-text="Sitesh Roy">Sitesh Roy,</h1>
          <div className="glitch-text">
            a<span>&nbsp;Software Engineer</span>
            <span>&nbsp;Full Stack Developer</span>
            <span>n AI/ML Engineer</span>
            <span>&nbsp;Fast Learner</span>
            <span>&nbsp;Problem Solver</span>
            <span>&nbsp;Creative Thinker</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
