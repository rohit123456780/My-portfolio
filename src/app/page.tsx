"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import BootSequence from '@/components/cyber/BootSequence';
import HeroScene from '@/components/cyber/HeroScene';
import TerminalPanel from '@/components/cyber/TerminalPanel';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { Shield, Award, Cpu, Globe, Trophy, Briefcase, Rocket, Sparkles, User } from 'lucide-react';

const PLANETS = [
  { id: 'identity', name: 'Identity Node', icon: User, path: '/', color: 'text-primary' },
  { id: 'experience', name: 'Orbital Deployments', icon: Briefcase, path: '/experience', color: 'text-blue-400' },
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
        <HeroScene />
        
        {/* IMMERSIVE HEADER SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isBooted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="z-10 relative space-y-12 max-w-5xl"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[10px] font-code uppercase tracking-[1em] text-primary/40 block"
              >
                Operational Excellence in Cyberspace
              </motion.span>
              <h1 className="text-7xl md:text-[10rem] font-headline leading-tight tracking-tighter text-glow">
                ROHIT ROY
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left bg-background/5 backdrop-blur-sm border border-white/5 p-8 rounded-lg">
              <div className="space-y-6">
                <p className="font-code text-sm md:text-base leading-relaxed text-primary/80">
                  Technical Engineer & OT Engineering Administrator bridging the divide between technical resilience and industrial safety. 
                  Specializing in high-stakes operational technology and cybersecurity ecosystems, I navigate complex risk landscapes through 
                  proactive defense and administrative precision.
                </p>
                <div className="flex gap-6">
                  <Link href="mailto:dashingraj447@gmail.com" className="group text-accent hover:text-white transition-all flex items-center gap-2 font-code text-xs">
                    <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                    TRANSMIT_DATA
                  </Link>
                  <Link href="https://linkedin.com/in/rohit-roy-rrr" target="_blank" className="text-primary/60 hover:text-primary transition-colors flex items-center gap-2 font-code text-xs">
                    LINKEDIN_SIGNAL
                  </Link>
                </div>
              </div>
              <TerminalPanel />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-code uppercase tracking-[0.5em] animate-pulse">Engage Orbital Map</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* ORBITAL NAVIGATION SECTION */}
        <section className="relative h-screen flex items-center justify-center bg-black/20">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center overflow-visible">
            {/* The Sun / Center */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: 360
              }}
              transition={{ 
                scale: { duration: 4, repeat: Infinity },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="w-40 h-40 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center z-10 backdrop-blur-md"
            >
              <Sparkles className="w-16 h-16 text-primary/40" />
            </motion.div>

            {/* Orbiting Planets */}
            {PLANETS.map((planet, index) => (
              <PlanetNode key={planet.id} planet={planet} index={index} total={PLANETS.length} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 px-6 border-t border-white/5 text-center bg-black/40">
          <p className="text-[10px] font-code opacity-30 uppercase tracking-[1em]">
            Rohit Roy | Intelligence Node v2.0
          </p>
        </footer>
      </div>
    </main>
  );
}

function PlanetNode({ planet, index, total }: { planet: any, index: number, total: number }) {
  const radius = 250 + index * 55;
  const speed = 25 + index * 8;
  const delay = index * 0.3;
  
  return (
    <motion.div
      initial={{ opacity: 0, rotate: index * (360 / total) }}
      animate={{ 
        opacity: 1,
        rotate: 360 + (index * (360 / total))
      }}
      transition={{ 
        opacity: { duration: 1, delay },
        rotate: { duration: speed, repeat: Infinity, ease: "linear" }
      }}
      className="absolute top-1/2 left-1/2 origin-center"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
        style={{ transform: `translateX(-50%) translateY(-50%) rotate(-${360}deg)` }} // To keep icon upright (simplified)
      >
        <Link href={planet.path}>
          <motion.div
            whileHover={{ scale: 1.15 }}
            className={`flex flex-col items-center gap-3 ${planet.color} cursor-none transition-all`}
          >
            <div className="p-5 rounded-full bg-black/80 border border-current shadow-[0_0_20px_currentColor] group-hover:shadow-[0_0_40px_currentColor] backdrop-blur-xl transition-all duration-500">
              <planet.icon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-code whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest bg-black/60 px-3 py-1.5 border border-white/5">
              {planet.name}
            </span>
          </motion.div>
        </Link>
      </div>
      {/* Orbit Line */}
      <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none group-hover:border-white/10" />
    </motion.div>
  );
}
