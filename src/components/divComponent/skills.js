import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaJava, FaPython, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiExpress, SiTailwindcss, SiBootstrap, SiMongodb, SiFigma, SiFirebase } from "react-icons/si";
import "./skills.css";

const Skills = () => {
  const skillsData = [
    {
      title: "Languages",
      skills: [
        { icon: <FaHtml5 /> },
        { icon: <FaCss3Alt /> },
        { icon: <FaJs /> },
        { icon: <SiTypescript /> },
        { icon: <FaJava /> },
        { icon: <FaPython /> },
      ],
    },
    {
      title: "Frameworks",
      skills: [
        { icon: <FaReact /> },
        { icon: <SiNextdotjs /> },
        { icon: <SiExpress /> },
        { icon: <FaNodeJs /> },
        { icon: <SiTailwindcss /> },
        { icon: <SiBootstrap /> },
      ],
    },
    {
      title: "Tools",
      skills: [
        { icon: <SiMongodb /> },
        { icon: <FaGitAlt /> },
        { icon: <FaGithub /> },
        { icon: <SiFigma /> },
        { icon: <FaDocker /> },
        { icon: <SiFirebase /> },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const totalSkills = skillsData.reduce((acc, category) => acc + category.skills.length, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(activeIndex); 
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalSkills);
    }, 750); // Shortened duration for seamless effect

    return () => clearInterval(interval);
  }, [activeIndex, totalSkills]);

  let indexCounter = 0;

  return (
    <div className="skills-container">
      {skillsData.map((category, index) => (
        <div key={index} className="skills-section">
          <h2 className="skills-title">{category.title}</h2>
          <div className="skills-row">
            {category.skills.map((skill, i) => {
              const isActive = indexCounter === activeIndex;
              const isPrevious = indexCounter === previousIndex;
              indexCounter++;
              
              return (
                <motion.div
                  key={i}
                  className={`skill-item ${isActive ? "active" : ""} ${isPrevious ? "previous" : ""}`}
                >
                  <div className="skill-icon">{skill.icon}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
