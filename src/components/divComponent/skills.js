import React from "react";
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

  return (
    <div className="skills-container">
      {skillsData.map((category, index) => (
        <div key={index} className="skills-section">
          <h2 className="skills-title">{category.title}</h2>
          <div className="skills-row">
            {category.skills.map((skill, i) => (
              <motion.div
                key={i}
                className="skill-item"
                whileHover={{ scale: 1.15 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="skill-icon">{skill.icon}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
