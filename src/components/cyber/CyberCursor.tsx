
"use client";

import React, { useEffect, useRef } from 'react';

export default function CyberCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const trailCount = 8;
    const trailPositions = Array(trailCount).fill({ x: 0, y: 0 });

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      // Update main cursor instantly using transform for performance
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      // Update trail positions
      trailPositions.unshift({ x, y });
      trailPositions.pop();

      // Update trail elements
      trailRefs.current.forEach((ref, i) => {
        if (ref) {
          const pos = trailPositions[i];
          ref.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
          ref.style.opacity = `${(1 - i / trailCount) * 0.4}`;
          ref.style.scale = `${1 - i / trailCount}`;
        }
      });

      // Hover check
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) {
        cursor.classList.add('scale-150', 'rotate-45');
      } else {
        cursor.classList.remove('scale-150', 'rotate-45');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* Optimized Main Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block transition-transform duration-150 ease-out"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
          <div className="w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_rgba(0,207,255,1)]" />
        </div>
      </div>

      {/* Neural Trail Nodes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-0.5 h-0.5 bg-accent/40 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{ transition: 'none' }}
        />
      ))}
    </>
  );
}
