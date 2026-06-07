
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import BootSequence from '@/components/cyber/BootSequence';
import HeroScene from '@/components/cyber/HeroScene';
import TerminalPanel from '@/components/cyber/TerminalPanel';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { Shield, Globe, Trophy, Briefcase, Sparkles, User, Cpu, MousePointer2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PLANETS = [
  { id: 'certifications', name: 'Jupiter: Credential Nebula', icon: Shield, path: '/certifications', color: 'from-cyan-400 to-blue-600', orbitRadius: 100, angle: 0, size: 'w-16 h-16' },
  { id: 'awards', name: 'Mercury: Distinction Belt', icon: Trophy, path: '/awards', color: 'from-orange-400 to-red-600', orbitRadius: 150, angle: 72, size: 'w-12 h-12' },
  { id: 'internships', name: 'Venus: Growth Sector', icon: Globe, path: '/internships', color: 'from-emerald-400 to-teal-700', orbitRadius: 200, angle: 144, size: 'w-14 h-14' },
  { id: 'projects', name: 'Earth: Mission Matrix', icon: Cpu, path: '/projects', color: 'from-blue-400 to-indigo-800', orbitRadius: 250, angle: 216, size: 'w-16 h-16' },
  { id: 'experience', name: 'Mars: Orbital Deployments', icon: Briefcase, path: '/experience', color: 'from-red-500 to-red-900', orbitRadius: 300, angle: 288, size: 'w-14 h-14' },
];

export default function Home() {
  const { isBooted } = useUIStore();
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-[#02040a] overflow-hidden">
      <AnimatePresence>
        {!isBooted && <BootSequence />}
      </AnimatePresence>

      <SpaceshipCursor hoveredPlanet={hoveredPlanet} />

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
              <p className="text-[10px] font-code text-primary/40 uppercase tracking-widest">Technical Engineer | v2.5</p>
            </div>
          </motion.div>
        </div>

        {/* DRAG TO EXPLORE HINT */}
        <div className="fixed top-12 left-1/2 -translate-x-1/2 pointer-events-none z-40 opacity-30">
          <div className="flex flex-col items-center gap-2">
            <MousePointer2 className="w-6 h-6 text-primary animate-bounce" />
            <p className="text-[8px] font-code text-primary uppercase tracking-[0.4em]">Drag to Explore System</p>
          </div>
        </div>

        {/* ORBITAL NAVIGATION SYSTEM */}
        <section className="relative w-screen h-screen flex items-center justify-center pointer-events-none">
          {/* Galactic Center / Sun (Identity) */}
          <Link href="/identity" className="pointer-events-auto">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={isBooted ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative z-30 cursor-none"
              onMouseEnter={() => setHoveredPlanet('identity')}
              onMouseLeave={() => setHoveredPlanet(null)}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_100px_rgba(255,165,0,0.6)] flex flex-col items-center justify-center backdrop-blur-3xl group">
                <Sparkles className="w-10 h-10 text-white animate-pulse mb-1 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <p className="text-[8px] font-code text-white/80 uppercase tracking-widest">Identity Core</p>
                  <p className="text-[10px] font-headline text-white tracking-widest uppercase">THE SUN</p>
                </div>
              </div>
              <div className="absolute inset-[-40px] border border-orange-500/20 rounded-full animate-pulse pointer-events-none" />
            </motion.div>
          </Link>

          {/* Planets UI Layer */}
          {PLANETS.map((planet, index) => (
            <PlanetNode 
              key={planet.id} 
              planet={planet} 
              index={index} 
              isBooted={isBooted} 
              onHover={setHoveredPlanet}
            />
          ))}

          {/* Bottom Terminal Overlay */}
          <div className="absolute bottom-12 right-12 w-80 z-50 pointer-events-auto">
            <TerminalPanel />
          </div>
        </section>

        {/* BACKGROUND SCANLINES */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </main>
  );
}

function PlanetNode({ planet, index, isBooted, onHover }: { planet: any, index: number, isBooted: boolean, onHover: (id: string | null) => void }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { x, y } = useMemo(() => {
    const radian = (planet.angle * Math.PI) / 180;
    return {
      x: (Math.cos(radian) * planet.orbitRadius).toFixed(2),
      y: (Math.sin(radian) * planet.orbitRadius).toFixed(2)
    };
  }, [planet.angle, planet.orbitRadius]);

  if (!mounted) return null;

  const handleLanding = () => {
    setIsLanding(true);
    setTimeout(() => {
      router.push(planet.path);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isBooted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
      className="absolute z-20 pointer-events-auto"
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        onMouseEnter={() => onHover(planet.id)}
        onMouseLeave={() => onHover(null)}
        onClick={handleLanding}
        className="group relative flex flex-col items-center gap-4 cursor-none"
      >
        <div className={`relative ${planet.size} rounded-full bg-gradient-to-br ${planet.color} shadow-[0_0_30px_currentColor] flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_60px_currentColor] group-hover:scale-110 text-white ${isLanding ? 'animate-ping' : ''}`}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
          <planet.icon className="w-1/2 h-1/2 drop-shadow-lg" />
          
          {planet.id === 'certifications' && (
            <div className="absolute inset-[-15px] border-2 border-white/20 rounded-full scale-y-[0.3] rotate-[15deg] pointer-events-none" />
          )}
        </div>

        <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-2 pointer-events-none">
          <span className="text-[8px] font-code text-white uppercase tracking-[0.3em] whitespace-nowrap bg-black/90 px-4 py-2 border border-primary/40 backdrop-blur-md">
            {planet.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
