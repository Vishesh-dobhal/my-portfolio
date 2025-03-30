"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
//import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

export function Card3D({ project }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position
    // Limit rotation to a reasonable range
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-xl font-bold">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded flex items-center text-sm"
          >
            <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center text-sm"
          >
            <Github className="h-4 w-4 mr-1" /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
