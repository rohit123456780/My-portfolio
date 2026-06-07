"use client";

import React from 'react';
import InternshipAtlas from '@/components/cyber/InternshipAtlas';
import SpaceshipCursor from '@/components/cyber/SpaceshipCursor';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] p-6 pt-24">
      <SpaceshipCursor />
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-12 font-code text-xs">
          <ArrowLeft className="w-4 h-4" /> RETURN_TO_ORBIT
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl font-headline mb-4 flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Growth Sector
          </h1>
          <p className="text-xs font-code text-primary/50 uppercase tracking-widest">27+ Cybersecurity Deployments & Internships</p>
          <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent mt-4" />
        </div>

        <InternshipAtlas />
      </div>
    </main>
  );
}