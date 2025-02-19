import React, { useEffect, useState, useRef } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";
import rect3 from "../images/rect3.webp";
import rect4 from "../images/rect4.webp";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { gsap } from "gsap";

const images = [rect1, rect3, rect4, rect2];

//////////////////////////
// Glass Shatter Effect Component (Full-Screen Overlay with Fade-Out)
//////////////////////////

function GlassShatterEffect({ onComplete }) {
  const [shards, setShards] = useState([]);
  const overlayRef = useRef();

  useEffect(() => {
    // Generate 120 shards with randomized properties (positions normalized in a 2x2 area)
    const newShards = Array.from({ length: 120 }).map(() => {
      const pos = [
        (Math.random() - 0.5) * 2, // x in [-1,1]
        (Math.random() - 0.5) * 2, // y in [-1,1]
        0,
      ];
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      const shardWidth = 0.1 + Math.random() * 0.4;
      const shardHeight = 0.1 + Math.random() * 0.4;
      // Minimal lateral drift; shards fly forward (positive z)
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2;
      const velocity = [xVel, yVel, zVel];
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];
      const baseColor = "#001F3F"; // dark blue/blackish
      const baseEmissiveIntensity = 0.2;
      const baseClearcoat = 0.8;
      const isFlash = Math.random() < 0.3;
      const materialProps = {
        color: baseColor,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: baseClearcoat,
        clearcoatRoughness: 0.05,
        emissive: baseColor,
        emissiveIntensity: baseEmissiveIntensity,
        opacity: 0.98,
        transparent: true,
      };

      return { pos, rot, width: shardWidth, height: shardHeight, velocity, angularVelocity, materialProps, flash: isFlash };
    });
    setShards(newShards);

    // After 1500ms, fade out the overlay over 1 second and then call onComplete.
    gsap.to(overlayRef.current, {
      opacity: 0,
      delay: 1.5,
      duration: 1,
      ease: "power2.inOut",
      onComplete: onComplete,
    });
  }, [onComplete]);

  // Inner Shard component with GSAP flash animation.
  function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
    const meshRef = useRef();
    useEffect(() => {
      if (flash && meshRef.current) {
        const tl = gsap.timeline({ repeat: 1, yoyo: true });
        const delay = Math.random() * 0.5;
        tl.delay(delay)
          .to(meshRef.current.material, {
            emissiveIntensity: 3.0,
            clearcoat: 1.0,
            duration: 0.15,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: 3.5,
            clearcoat: 1.0,
            duration: 0.1,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: materialProps.emissiveIntensity,
            clearcoat: materialProps.clearcoat,
            duration: 0.15,
            ease: "power2.inOut",
          });
      }
    }, [flash, materialProps.emissiveIntensity, materialProps.clearcoat]);

    return (
      <RigidBody
        colliders="hull"
        position={pos}
        rotation={rot}
        linearVelocity={velocity}
        angularVelocity={angularVelocity}
        angularDamping={0.5}
        linearDamping={0.2}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[width, height, 0.02]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </RigidBody>
    );
  }

  return (
    <div ref={overlayRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", opacity: 1, zIndex: 500 }}>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <Physics gravity={[0, 0, 0]}>
          {shards.map((shard, index) => (
            <Shard key={index} {...shard} />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}

//////////////////////////
// End Glass Shatter Effect Component
//////////////////////////

// ---------- Main GlassEffect Component (Responsive) ----------
const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  // Set initial width and height responsively.
  const [width, setWidth] = useState(window.innerWidth * 0.3 > 220 ? window.innerWidth * 0.3 : 220);
  const [height, setHeight] = useState(window.innerHeight * 0.4 > 420 ? window.innerHeight * 0.4 : 420);
  const [isRunning, setIsRunning] = useState(true); // Controls image cycling
  const [isShattered, setIsShattered] = useState(false); // When true, show shatter effect
  const [showContent, setShowContent] = useState(false); // Underlying content visibility

  // Update container dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.3 > 220 ? window.innerWidth * 0.3 : 220);
      setHeight(window.innerHeight * 0.4 > 420 ? window.innerHeight * 0.4 : 420);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Image cycle: advance image every 1500ms.
  useEffect(() => {
    if (!isRunning || isShattered) return;

    const interval = setInterval(() => {
      setIsBanging(true);
      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          // When the fourth image (index 3) is reached, trigger shattering.
          if (prevIndex === 3) {
            setIsShattered(true);
            setShowContent(true);
            return 3; // Keep displaying the fourth image as base.
          }
          return nextIndex;
        });
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, isShattered]);

  // When shattering is active, we leave content visible.
  // Once the shatter overlay fades out (via its onComplete), we reset the cycle.
  const handleShatterComplete = () => {
    setIsShattered(false);
    // Wait a moment before resetting.
    setTimeout(() => {
      setShowContent(false);
      setIndex(0);
    }, 500);
  };

  return (
    <div className={`page-container ${isBanging ? "jitter" : ""}`}>
      {/* Underlying content container (fixed, responsive) */}
      <div
        className="content"
        style={{
          position: "fixed",
          width: `${width}px`,
          height: `${height}px`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          zIndex: 1000,
        }}
      >
        <h1 style={{ color: "#fff", textAlign: "center" }}>Content Revealed!</h1>
      </div>

      {isShattered ? (
        // Render the full-screen shatter effect overlay.
        <GlassShatterEffect onComplete={handleShatterComplete} />
      ) : (
        <div
          className={`glass-container ${isBanging ? "bang" : ""}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transition: "width 0.3s ease-out, height 0.3s ease-out",
            zIndex: 500,
            position: "relative",
          }}
        >
          <div className={`shockwave ${isBanging ? "active" : ""}`} />
          <img src={images[index]} alt="Glass Effect" className="glass-image" />
        </div>
      )}

      {/* Sliders & Start/Stop Button */}
      <div className="slider-container">
        <div className="slider">
          <label>Width</label>
          <input
            type="range"
            min="100"
            max="600"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <span>{width}px</span>
        </div>
        <div className="slider">
          <label>Height</label>
          <input
            type="range"
            min="200"
            max="800"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <span>{height}px</span>
        </div>
        <button className="toggle-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default GlassEffect;
