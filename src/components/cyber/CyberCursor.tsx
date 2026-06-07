
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CyberCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id: Math.random() }, ...prev].slice(0, 15));
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }}
      >
        <div className="relative">
          {/* Custom Targeting Reticle */}
          <motion.div 
            animate={{ 
              scale: isHovering ? 1.5 : 1,
              rotate: isHovering ? 90 : 0
            }}
            className="w-8 h-8 flex items-center justify-center"
          >
            {/* Crosshair Lines */}
            <div className="absolute w-full h-[1px] bg-primary/40" />
            <div className="absolute h-full w-[1px] bg-primary/40" />
            
            {/* Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
            
            {/* Inner Dot */}
            <div className="w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_rgba(0,207,255,1)]" />
          </motion.div>

          {/* Decryption Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className={`absolute inset-[-10px] border border-dashed border-primary/20 rounded-full transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Particle Trail */}
      {trail.map((p, i) => (
        <div
          key={p.id}
          className="fixed top-0 left-0 w-0.5 h-0.5 bg-primary/40 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{ 
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            opacity: 1 - (i / 15),
            scale: 1 - (i / 15)
          }}
        />
      ))}
    </>
  );
}
