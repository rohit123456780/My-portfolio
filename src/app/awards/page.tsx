
"use client";

import React from 'react';
import AchievementsVault from '@/components/cyber/AchievementsVault';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] relative">
      <SpaceshipCursor hoveredPlanet={null} />
      
      <div className="fixed top-12 left-12 z-50">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-code text-xs group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> RETURN_TO_ORBIT
        </Link>
      </div>

      <AchievementsVault />

      {/* HUD Details */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <div className="space-y-1">
          <h1 className="text-2xl font-headline flex items-center gap-3">
            <Trophy className="w-6 h-6 text-primary" />
            Distinction Belt
          </h1>
          <p className="text-[8px] font-code text-primary/40 uppercase tracking-[0.5em]">Awards, Honours & Major Milestones</p>
        </div>
      </div>
    </main>
  );
}
