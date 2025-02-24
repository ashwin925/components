import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import "./project.css";

const projects = [
  { title: "Project 1", description: "Futuristic AI-powered tool.", img: "https://via.placeholder.com/300" },
  { title: "Project 2", description: "Next-gen blockchain app.", img: "https://via.placeholder.com/300" },
  { title: "Project 3", description: "VR immersive experience.", img: "https://via.placeholder.com/300" },
  { title: "Project 4", description: "Cutting-edge IoT solution.", img: "https://via.placeholder.com/300" },
  { title: "Project 5", description: "Quantum computing breakthrough.", img: "https://via.placeholder.com/300" },
  { title: "Project 6", description: "Neural network AI innovation.", img: "https://via.placeholder.com/300" }
];

const ProjectPage = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const firstClone = slider.firstElementChild.cloneNode(true);
    slider.appendChild(firstClone);
  }, []);

  return (
    <div className="project-container">
      <div className="projects-wrapper">
        <motion.div
          ref={sliderRef}
          className="projects-slider"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {[...projects, ...projects].map((project, index) => (
            <InView key={index} triggerOnce threshold={0.5}>
              {({ inView, ref }) => (
                <motion.div
                  ref={ref}
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px cyan" }}
                >
                  <img src={project.img} alt={project.title} className="project-image" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </motion.div>
              )}
            </InView>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="background-animation"
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ProjectPage;