
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import BootSequence from '@/components/cyber/BootSequence';
import HeroScene from '@/components/cyber/HeroScene';
import TerminalPanel from '@/components/cyber/TerminalPanel';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { Shield, Cpu, Globe, Trophy, Briefcase, Sparkles, User, CircleDot } from 'lucide-react';

const PLANETS = [
  { id: 'identity', name: 'Identity Node', icon: User, path: '/', color: 'text-primary', orbitRadius: 200, angle: 0 },
  { id: 'experience', name: 'Orbital Deployments', icon: Briefcase, path: '/experience', color: 'text-blue-400', orbitRadius: 280, angle: 45 },
  { id: 'projects', name: 'Mission Matrix', icon: Cpu, path: '/projects', color: 'text-accent', orbitRadius: 360, angle: 120 },
  { id: 'awards', name: 'Distinction Belt', icon: Trophy, path: '/awards', color: 'text-yellow-400', orbitRadius: 440, angle: 190 },
  { id: 'internships', name: 'Growth Sector', icon: Globe, path: '/internships', color: 'text-emerald-400', orbitRadius: 520, angle: 260 },
  { id: 'certifications', name: 'Credential Nebula', icon: Shield, path: '/certifications', color: 'text-cyan-400', orbitRadius: 600, angle: 320 },
];

export default function Home() {
  const { isBooted } = useUIStore();

  return (
    <main className="relative min-h-screen bg-[#02040a] overflow-hidden">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      <SpaceshipCursor />

      <div className={`transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <HeroScene />
        
        {/* TOP HUD */}
        <div className="fixed top-8 left-8 z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isBooted ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center bg-primary/5 backdrop-blur-md">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-headline tracking-tighter text-glow">ROHIT ROY</h1>
              <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">System Architect v2.5</p>
            </div>
          </motion.div>
        </div>

        {/* ORBITAL NAVIGATION SYSTEM */}
        <section className="relative w-screen h-screen flex items-center justify-center">
          {/* Galactic Center / Sun */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isBooted ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="w-48 h-48 rounded-full bg-primary/10 border border-primary/30 flex flex-col items-center justify-center backdrop-blur-2xl shadow-[0_0_80px_hsla(var(--primary),0.2)]">
              <Sparkles className="w-12 h-12 text-primary animate-pulse mb-2" />
              <div className="text-center">
                <p className="text-[8px] font-code text-primary/60 uppercase tracking-widest">Core Status</p>
                <p className="text-xs font-headline text-white tracking-widest uppercase">Operational</p>
              </div>
            </div>
            
            {/* Inner Ring Glow */}
            <div className="absolute inset-[-40px] border border-primary/10 rounded-full animate-spin-slow pointer-events-none" />
          </motion.div>

          {/* Planetary Orbits */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {PLANETS.map((planet) => (
              <div 
                key={`orbit-${planet.id}`}
                className="absolute border border-white/5 rounded-full"
                style={{ 
                  width: planet.orbitRadius * 2, 
                  height: planet.orbitRadius * 2 
                }}
              />
            ))}
          </div>

          {/* Planets */}
          {PLANETS.map((planet, index) => (
            <PlanetNode key={planet.id} planet={planet} index={index} />
          ))}

          {/* Bottom Terminal Overlay */}
          <div className="absolute bottom-12 right-12 w-80 z-50">
            <TerminalPanel />
          </div>
        </section>

        {/* BACKGROUND SCANLINES */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </main>
  );
}

function PlanetNode({ planet, index }: { planet: any, index: number }) {
  // Convert polar coordinates to Cartesian for initial positioning
  const radian = (planet.angle * Math.PI) / 180;
  const x = Math.cos(radian) * planet.orbitRadius;
  const y = Math.sin(radian) * planet.orbitRadius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
      className="absolute z-20"
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Link href={planet.path}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="group relative flex flex-col items-center gap-4 cursor-none"
        >
          {/* Planet Body */}
          <div className={`relative w-16 h-16 rounded-full bg-black border-2 border-current shadow-[0_0_20px_currentColor] flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_currentColor] group-hover:border-white ${planet.color}`}>
            <planet.icon className="w-8 h-8 group-hover:text-white transition-colors" />
            
            {/* Atmospheric Ring */}
            <div className="absolute inset-[-6px] border border-current opacity-20 rounded-full group-hover:opacity-100 group-hover:scale-110 transition-all" />
          </div>

          {/* Label */}
          <div className="absolute top-20 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-2">
            <span className="text-[10px] font-code text-white uppercase tracking-[0.3em] whitespace-nowrap bg-black/80 px-4 py-2 border border-white/10 backdrop-blur-md">
              {planet.name}
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent" />
          </div>

          {/* Coordinates Pointer */}
          <div className="absolute -top-6 text-[8px] font-code text-primary/30 opacity-40 group-hover:opacity-100 transition-opacity">
            X:{Math.round(x)} Y:{Math.round(y)}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
