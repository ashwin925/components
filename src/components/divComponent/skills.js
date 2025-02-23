import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaReact, FaGit, FaGithub, FaDocker, FaFigma } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiExpress, SiTailwindcss, SiBootstrap, SiMongodb } from "react-icons/si";
import "./skills.css"; // Importing the CSS file

const Skills = () => {
  return (
    <div className="skills-container">
      {/* Languages Row */}
      <div className="skills-row">
        <FaHtml5 className="skill-icon" title="HTML5" />
        <FaCss3Alt className="skill-icon" title="CSS3" />
        <FaJs className="skill-icon" title="JavaScript" />
        <SiTypescript className="skill-icon" title="TypeScript" />
        <FaJava className="skill-icon" title="Java" />
        <FaPython className="skill-icon" title="Python" />
      </div>

      {/* Frameworks/Libraries Row */}
      <div className="skills-row">
        <FaReact className="skill-icon" title="React" />
        <SiNextdotjs className="skill-icon" title="Next.js" />
        <SiExpress className="skill-icon" title="Express.js" />
        <SiTailwindcss className="skill-icon" title="Tailwind CSS" />
        <SiBootstrap className="skill-icon" title="Bootstrap" />
      </div>

      {/* Tools Row */}
      <div className="skills-row">
        <SiMongodb className="skill-icon" title="MongoDB" />
        <FaGit className="skill-icon" title="Git" />
        <FaGithub className="skill-icon" title="GitHub" />
        <FaFigma className="skill-icon" title="Figma" />
        <FaDocker className="skill-icon" title="Docker" />
      </div>
    </div>
  );
};

export default Skills;
