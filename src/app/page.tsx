"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import BootSequence from '@/components/cyber/BootSequence';
import HeroScene from '@/components/cyber/HeroScene';
import TerminalPanel from '@/components/cyber/TerminalPanel';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { Shield, Award, Cpu, Globe, Trophy, Briefcase, Rocket, Sparkles } from 'lucide-react';

const PLANETS = [
  { id: 'experience', name: 'Orbital Deployments', icon: Briefcase, path: '/experience', color: 'text-primary' },
  { id: 'projects', name: 'Mission Matrix', icon: Cpu, path: '/projects', color: 'text-accent' },
  { id: 'awards', name: 'Distinction Belt', icon: Trophy, path: '/awards', color: 'text-yellow-400' },
  { id: 'internships', name: 'Growth Sector', icon: Globe, path: '/internships', color: 'text-emerald-400' },
  { id: 'certifications', name: 'Credential Nebula', icon: Shield, path: '/certifications', color: 'text-cyan-400' },
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
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <HeroScene />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isBooted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="z-10 relative space-y-8 max-w-4xl"
          >
            <h1 className="text-6xl md:text-9xl font-headline leading-tight tracking-tighter text-glow mb-4">
              ROHIT ROY
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-4">
                <p className="font-code text-sm md:text-base leading-relaxed text-primary/80">
                  Technical Engineer & OT Engineering Administrator specializing in high-stakes operational technology and cybersecurity ecosystems. 
                  With a track record spanning 27+ internships and 97+ certifications, I bridge the gap between technical resilience and industrial safety.
                </p>
                <div className="flex gap-4">
                  <Link href="mailto:dashingraj447@gmail.com" className="text-accent hover:text-white transition-colors flex items-center gap-2 font-code text-xs">
                    <Rocket className="w-4 h-4" /> TRANSMIT_DATA
                  </Link>
                </div>
              </div>
              <TerminalPanel />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-[10px] font-code uppercase tracking-[0.5em]">Navigate the System</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </section>

        {/* ORBITAL NAVIGATION SECTION */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
            {/* The Sun / Center */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center z-10"
            >
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            </motion.div>

            {/* Orbiting Planets */}
            {PLANETS.map((planet, index) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="absolute"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <PlanetNode planet={planet} index={index} total={PLANETS.length} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-code opacity-30 uppercase tracking-[1em]">
            Rohit Roy | System Voyager v2.0
          </p>
        </footer>
      </div>
    </main>
  );
}

function PlanetNode({ planet, index, total }: { planet: any, index: number, total: number }) {
  const radius = 220 + index * 40;
  const speed = 15 + index * 5;
  
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
        <Link href={planet.path}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`flex flex-col items-center gap-2 ${planet.color} cursor-none transition-all`}
          >
            <div className="p-4 rounded-full bg-background border border-current shadow-[0_0_15px_currentColor] group-hover:shadow-[0_0_30px_currentColor]">
              <planet.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-code whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest bg-background/80 px-2 py-1">
              {planet.name}
            </span>
          </motion.div>
        </Link>
      </div>
      {/* Orbit Line */}
      <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
    </motion.div>
  );
}