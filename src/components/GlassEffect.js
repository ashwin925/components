import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";
import rect3 from "../images/rect3.webp";
import rect4 from "../images/rect4.webp";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { gsap } from "gsap";

const images = [rect1, rect3, rect4, rect2];

//////////////////////
// Glass Shatter Effect Component
//////////////////////

function GlassShatterEffect({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create an array of 120 shards with randomized properties.
    const newShards = Array.from({ length: 120 }).map(() => {
      // Position shards within a 2x2 area (simulating the glass panel)
      const pos = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        0,
      ];
      // Random rotation for natural tumbling
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Random dimensions for varied shard sizes (between 0.1 and 0.5)
      const width = 0.1 + Math.random() * 0.4;
      const height = 0.1 + Math.random() * 0.4;

      // Minimal lateral drift; shards come straight toward the viewer.
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // controlled forward burst
      const velocity = [xVel, yVel, zVel];

      // Angular velocity for natural tumbling
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // Base material: dark color for all shards.
      const baseColor = "#001F3F"; // dark blue/blackish
      const baseEmissiveIntensity = 0.2;
      const baseClearcoat = 0.8;

      // Randomly flag ~30% of shards for an enhanced flash effect.
      const isFlash = Math.random() < 0.3;

      // Material properties for all shards (uniform dark base)
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

      return { pos, rot, width, height, velocity, angularVelocity, materialProps, flash: isFlash };
    });

    setShards(newShards);

    // Delay onComplete (2000ms) to allow the full shatter effect to play out.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Inner Shard component with enhanced flash animation
  function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
    const meshRef = React.useRef();

    useEffect(() => {
      if (flash && meshRef.current) {
        // Create a GSAP timeline for an intense flash sequence.
        const tl = gsap.timeline({ repeat: 1, yoyo: true });
        const delay = Math.random() * 0.5; // random delay for natural effect.
        tl.delay(delay)
          .to(meshRef.current.material, {
            emissiveIntensity: 3.0, // first flash boost.
            clearcoat: 1.0,
            duration: 0.15,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: 3.5, // peak flash.
            clearcoat: 1.0,
            duration: 0.1,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: materialProps.emissiveIntensity, // revert.
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
    // Render the shatter effect in a Canvas sized to match the glass container.
    <Canvas style={{ width: "220px", height: "420px" }}>
      <Physics gravity={[0, 0, 0]}>
        {shards.map((shard, index) => (
          <Shard key={index} {...shard} />
        ))}
      </Physics>
    </Canvas>
  );
}

//////////////////////
// End Glass Shatter Effect Component
//////////////////////

// ---------- Main GlassEffect Component (with automatic shatter) ----------

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(420);
  const [isRunning, setIsRunning] = useState(true); // Control animation
  const [isShattered, setIsShattered] = useState(false); // Trigger shattering automatically
  const [hasShattered, setHasShattered] = useState(false); // Ensure one-time shatter
  const [showContent, setShowContent] = useState(false); // Underlying content revealed

  // Cycle images as before.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIsBanging(true);

      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % images.length;
          // If we've just shown the third image (index 2) and haven't shattered yet, trigger shatter.
          if (newIndex === 2 && !hasShattered) {
            setIsShattered(true);
            setHasShattered(true);
          }
          return newIndex;
        });
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, hasShattered]);

  return (
    <div className={`page-container ${isBanging ? "jitter" : ""}`}>
      {/* Underlying content - initially hidden */}
      <div
        className="content"
        style={{
          position: "absolute",
          width: `${width}px`,
          height: `${height}px`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          zIndex: 0,
        }}
      >
        {/* Replace with your desired content */}
        <h1 style={{ color: "#fff", textAlign: "center" }}>Content Revealed!</h1>
      </div>

      {isShattered ? (
        // Render the shattering effect; once complete, reveal content.
        <GlassShatterEffect onComplete={() => {
          setIsShattered(false);
          setShowContent(true);
        }} />
      ) : (
        <div
          className={`glass-container ${isBanging ? "bang" : ""}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transition: "width 0.3s ease-out, height 0.3s ease-out",
          }}
        >
          <div className={`shockwave ${isBanging ? "active" : ""}`} />
          <img src={images[index]} alt="Glass Effect" className="glass-image" />
        </div>
      )}

      {/* Sliders & Stop/Start Button */}
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
