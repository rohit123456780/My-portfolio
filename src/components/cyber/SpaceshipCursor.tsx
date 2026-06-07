
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Rocket, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpaceshipCursor({ hoveredPlanet }: { hoveredPlanet: string | null }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const moveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      setPosition({ x: e.clientX, y: e.clientY });
      setRotation(angle);
      
      setIsMoving(true);
      setIsLanding(false);
      
      if (moveTimer.current) clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => {
        setIsMoving(false);
        if (hoveredPlanet) {
          setIsLanding(true);
        }
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, [position, hoveredPlanet]);

  return (
    <div 
      className="spaceship-cursor hidden md:block"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${isMoving ? 1.2 : isLanding ? 0.6 : 1})`,
        transition: 'transform 0.15s ease-out, scale 0.3s ease-in-out'
      }}
    >
      <div className="relative">
        <Rocket className={`w-8 h-8 text-primary transition-all duration-300 ${isLanding ? 'text-accent' : ''} fill-primary/20`} />
        
        {/* Thrusters */}
        <AnimatePresence>
          {isMoving && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 20, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-accent to-transparent blur-[2px]" 
            />
          )}
        </AnimatePresence>

        {/* Landing Indicator */}
        {isLanding && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          >
            <div className="bg-accent text-accent-foreground px-2 py-0.5 rounded-sm text-[8px] font-code uppercase whitespace-nowrap">
              Landing...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
