"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    // Add event listeners for cursor states
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setCursorVariant("hover"));
      link.addEventListener("mouseleave", () => setCursorVariant("default"));
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setCursorVariant("hover"));
        link.removeEventListener("mouseleave", () =>
          setCursorVariant("default")
        );
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 102, 255, 0)",
      border: "2px solid rgba(0, 102, 255, 0.5)",
      transition: {
        type: "spring",
        mass: 0.3,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(0, 102, 255, 0.1)",
      border: "2px solid rgba(0, 102, 255, 0.8)",
      transition: {
        type: "spring",
        mass: 0.5,
      },
    },
  };

  // Only show custom cursor on desktop
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={variants}
      animate={cursorVariant}
    />
  );
}
