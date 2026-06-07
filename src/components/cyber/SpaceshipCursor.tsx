"use client";

import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

export default function SpaceshipCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      setPosition({ x: e.clientX, y: e.clientY });
      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  return (
    <div 
      className="spaceship-cursor hidden md:block"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`
      }}
    >
      <Rocket className="w-8 h-8 text-primary fill-primary/20" />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-accent/60 blur-[2px] animate-pulse" />
    </div>
  );
}