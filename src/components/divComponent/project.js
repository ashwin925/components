import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import "./project.css";

const projects = [
  { id: 1, title: "Quantum Dashboard", description: "A futuristic admin dashboard with AI analytics.", year: "2025" },
  { id: 2, title: "Cybernetic Storefront", description: "An e-commerce platform with AR integration.", year: "2024" },
  { id: 3, title: "Neon Space Blog", description: "A sci-fi themed blogging site with holographic UI.", year: "2023" },
  { id: 4, title: "AI Voice Assistant", description: "A personal AI voice assistant with real-time learning.", year: "2022" }
];

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <span className="project-year">{project.year}</span>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="timeline">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      {/* Warp Gate Navigation */}
      <div className="warp-gates">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="warp-gate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="gate-text">{project.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
