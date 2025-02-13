"use client"

import React, { useState, useEffect, useRef, MouseEvent, CSSProperties } from "react"
import styles from "./ice-reveal.css";

export default function IceRevealCard() {
  const [stage, setStage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>

    const interval = () => {
      setStage((prev) => {
        if (prev < 4) {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 1500)
          return prev + 1
        }
        return prev
      })
    }

    timer = setInterval(interval, 1500)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => {
        if (prev < 4) {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 1500)
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 1500)
  
    return () => clearInterval(timer) // Cleanup on unmount
  }, [])
  

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x: `${x}%`, y: `${y}%` })
  }

  const getIceImage = () => {
    const images = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ice1.webp-xdSxsSCgLoZgjgmSBKZ29VGZ7JaHdZ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ice1.webp-xdSxsSCgLoZgjgmSBKZ29VGZ7JaHdZ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ice2.webp-ZnVV91ekRVTViFr7bySopPmq3mbqGp.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ice3.webp-RLqoiWwZ9ku2J4C6eHzkbR5V9OO3yA.png"
    ]
    return images[stage] || null
  }

  return (
    <div ref={containerRef} className={styles.container} onMouseMove={handleMouseMove}>
      <div className={`${styles.card} ${stage >= 4 ? styles.revealed : ""}`}>
        <div
          className={styles.glowEffect}
          style={
            {
              "--x": mousePosition.x,
              "--y": mousePosition.y,
            } as CSSProperties
          }
        />
        <div className={styles.cardContent}>
          <h3 className={styles.title}>Hidden Content</h3>
          <p className={styles.description}>
            This mysterious content was frozen in ice, but now it&apos;s breaking free!
          </p>
        </div>
      </div>

      {stage < 4 && (
        <div className={`${styles.iceOverlay} ${isAnimating ? styles.shaking : ""}`}>
          <img src={getIceImage() || "/placeholder.svg"} alt="Ice overlay" />
          <div ref={particlesRef} className={styles.particles} />
        </div>
      )}
    </div>
  )
}
