"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, Shield, Terminal, BookOpen, User, Trophy, Briefcase, FileText } from 'lucide-react';
import { useUIStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const items = [
  { icon: User, label: "Identity", path: "/identity" },
  { icon: BookOpen, label: "Mission Logs", path: "/experience" },
  { icon: Briefcase, label: "Mission Select (Projects)", path: "/projects" },
  { icon: Trophy, label: "Awards & Honours", path: "/awards" },
  { icon: Terminal, label: "Internship Atlas", path: "/internships" },
  { icon: Shield, label: "Certifications Vault", path: "/certifications" },
  { icon: FileText, label: "Download Resume", path: "/resume" },
];

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[500] flex items-start justify-center pt-24 px-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl cyber-glass shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-primary/20">
              <Search className="w-5 h-5 text-primary/50" />
              <input 
                autoFocus
                placeholder="EXECUTE COMMAND..." 
                className="bg-transparent border-none outline-none flex-1 text-primary font-code placeholder:text-primary/20 uppercase"
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 border border-primary/20 rounded-sm text-[10px] text-primary/50 font-code">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
              <button onClick={() => setCommandPaletteOpen(false)}>
                <X className="w-5 h-5 text-primary/30 hover:text-primary" />
              </button>
            </div>
            
            <div className="p-2">
              <div className="px-2 py-1 text-[10px] text-primary/40 font-code tracking-widest uppercase">Quick Navigation</div>
              <div className="space-y-1 mt-1">
                {items.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      router.push(item.path);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-primary/10 group transition-colors rounded-sm text-left"
                  >
                    <item.icon className="w-4 h-4 text-primary group-hover:text-glow" />
                    <span className="text-sm font-code uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 border-t border-primary/20 flex justify-between items-center">
              <div className="text-[10px] text-primary/30 font-code uppercase tracking-widest">Aether Assistant Online</div>
              <div className="flex gap-4 text-[10px] text-primary/30 font-code">
                <span>[ENTER] SELECT</span>
                <span>[ESC] CLOSE</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
