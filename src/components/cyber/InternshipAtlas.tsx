"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const internships = [
  "CyberDosti", "Springboard", "TechnoHacks EduTech", "DeltaClause", "Cyber Secured India", 
  "SecureSphere Foundation", "Let's We Hack", "Pinnacle Labs", "ShadowFox", "Sturtle Security Pvt Ltd", 
  "NexaSynergy Innovations", "StartHere", "Msinterface Technologies", "ITPS", "TechnoTrench", 
  "Trimbak Infotech", "Sutantras.in", "BH Security Plus", "Edunet Foundation", "GrowIntern", 
  "Brainwave Matrix Solutions", "Navodita Infotech", "Hack Secure", "The Red Users", "Redynox", 
  "Razz Security", "Secuerium Technologies"
];

export default function InternshipAtlas() {
  const [filter, setFilter] = useState('');

  const filtered = internships.filter(i => i.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
          <input 
            type="text" 
            placeholder="FILTER NODES..." 
            className="w-full bg-primary/5 border border-primary/20 p-3 pl-10 font-code text-xs uppercase focus:border-primary outline-none"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 bg-primary/5 border border-primary/20 font-code text-[10px] text-primary/60 uppercase">
          <Filter className="w-3 h-3" />
          <span>Active Nodes: {filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item, idx) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative h-24 cyber-glass flex items-center justify-center p-4 text-center hover:border-accent transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-accent transition-opacity" />
            <span className="text-[10px] font-headline tracking-tighter leading-tight group-hover:text-accent transition-colors">{item}</span>
            <div className="absolute top-1 right-1 w-1 h-1 bg-primary/20 group-hover:bg-accent" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
