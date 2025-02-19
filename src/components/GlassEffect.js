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

//////////////////////////
// Glass Shatter Effect Component
//////////////////////////

function GlassShatterEffect({ width, height, onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create an array of 120 shards with randomized properties.
    // Their positions are normalized within a 2x2 area.
    const newShards = Array.from({ length: 120 }).map(() => {
      const pos = [
        (Math.random() - 0.5) * 2, // x in [-1,1]
        (Math.random() - 0.5) * 2, // y in [-1,1]
        0,                       // z = 0 (glass plane)
      ];
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Randomize shard sizes (between 0.1 and 0.5)
      const shardWidth = 0.1 + Math.random() * 0.4;
      const shardHeight = 0.1 + Math.random() * 0.4;
      // Set minimal lateral drift; all shards travel forward (positive z)
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // forward burst toward viewer
      const velocity = [xVel, yVel, zVel];
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // Base dark material properties
      const baseColor = "#001F3F"; // dark blue/blackish
      const baseEmissiveIntensity = 0.2;
      const baseClearcoat = 0.8;
      // Randomly flag ~30% of shards for a flash effect.
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

      return {
        pos,
        rot,
        width: shardWidth,
        height: shardHeight,
        velocity,
        angularVelocity,
        materialProps,
        flash: isFlash,
      };
    });

    setShards(newShards);

    // Allow the shattering effect to play for 2000ms, then call onComplete.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Inner Shard component with flash animation using GSAP.
  function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
    const meshRef = React.useRef();

    useEffect(() => {
      if (flash && meshRef.current) {
        const tl = gsap.timeline({ repeat: 1, yoyo: true });
        const delay = Math.random() * 0.5; // stagger the flash start time
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
    <Canvas style={{ width: `${width}px`, height: `${height}px` }}>
      <Physics gravity={[0, 0, 0]}>
        {shards.map((shard, index) => (
          <Shard key={index} {...shard} />
        ))}
      </Physics>
    </Canvas>
  );
}

//////////////////////////
// End Glass Shatter Effect Component
//////////////////////////

// ---------- Main GlassEffect Component ----------
const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(420);
  const [isRunning, setIsRunning] = useState(true); // Controls image cycling
  const [isShattered, setIsShattered] = useState(false); // When true, show shatter effect
  const [showContent, setShowContent] = useState(false); // Underlying content visibility

  // Image cycling: change image every 1500ms.
  useEffect(() => {
    if (!isRunning || isShattered) return;

    const interval = setInterval(() => {
      setIsBanging(true);
      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => {
          // If current image is the fourth image (index 3), trigger shatter.
          if (prevIndex === 3) {
            setIsShattered(true);
            return prevIndex; // keep displaying image 3 during shatter
          }
          return (prevIndex + 1) % images.length;
        });
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, isShattered]);

  return (
    <div className={`page-container ${isBanging ? "jitter" : ""}`}>
      {/* Underlying content container (initially hidden) */}
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
        <h1 style={{ color: "#fff", textAlign: "center" }}>Content Revealed!</h1>
      </div>

      {isShattered ? (
        // When shattered, render the shatter effect in the same container.
        <GlassShatterEffect
          width={width}
          height={height}
          onComplete={() => {
            // Once shatter completes, reveal content for 2 seconds, then reset.
            setIsShattered(false);
            setShowContent(true);
            setTimeout(() => {
              setShowContent(false);
              setIndex(0);
            }, 2000);
          }}
        />
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
