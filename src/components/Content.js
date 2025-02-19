// Content.js
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Content() {
  const ref = useRef();
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.inOut" });
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "2rem",
      color: "#333"
    }}>
      Revealed Content!
    </div>
  );
}
