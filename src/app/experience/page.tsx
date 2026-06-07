"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MissionLogs from '@/components/cyber/MissionLogs';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { ArrowLeft, Terminal as TerminalIcon } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24">
      <SpaceshipCursor />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-12 font-code text-xs">
          <ArrowLeft className="w-4 h-4" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl font-headline mb-4 flex items-center gap-3">
            <TerminalIcon className="w-8 h-8 text-primary" />
            Orbital Deployments
          </h1>
          <p className="text-xs font-code text-primary/50 uppercase tracking-widest">Historical Work Record & System Maintenance</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent mt-4" />
        </div>

        <MissionLogs />
      </div>
    </main>
  );
}