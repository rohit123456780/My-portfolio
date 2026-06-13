
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/lib/store';
import { Activity, Terminal } from 'lucide-react';

function GlobeCore() {
  const { mode } = useUIStore();
  const meshRef = useRef<THREE.Mesh>(null);
  
  const color = mode === 'defensive' ? "#00f2ff" : "#ff0000";

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function AttackArcs() {
  const { mode } = useUIStore();
  const groupRef = useRef<THREE.Group>(null);
  const [arcs, setArcs] = useState<{ id: number, points: THREE.Vector3[], progress: number }[]>([]);

  const color = mode === 'defensive' ? "#00f2ff" : "#ff3300";

  useEffect(() => {
    const interval = setInterval(() => {
      setArcs(prev => {
        if (prev.length > 6) return prev;
        
        const start = new THREE.Vector3().setFromSphericalCoords(2.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
        const end = new THREE.Vector3().setFromSphericalCoords(2.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
        const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(3);
        
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return [...prev, { id: Date.now(), points: curve.getPoints(20), progress: 0 }];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    setArcs(prev => prev.map(arc => ({ ...arc, progress: arc.progress + delta * 0.5 })).filter(arc => arc.progress < 1));
  });

  return (
    <group ref={groupRef}>
      {arcs.map(arc => (
        <line key={arc.id}>
          <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(arc.points)} />
          <lineBasicMaterial attach="material" color={color} transparent opacity={1 - arc.progress} />
        </line>
      ))}
    </group>
  );
}

export default function AttackGlobeWidget() {
  const { mode } = useUIStore();
  const [counter, setCounter] = useState(142);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => c + 1);
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.x.x`;
      const port = [22, 80, 443, 3306, 8080][Math.floor(Math.random() * 5)];
      const msg = mode === 'defensive' 
        ? `${ip} → Port ${port} — Blocked`
        : `Exploit delivered to ${ip}:${port}`;
      setLogs(prev => [msg, ...prev].slice(0, 3));
    }, 3000);
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="cyber-glass w-full max-w-[350px] aspect-square flex flex-col p-4 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-2 z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[10px] font-headline uppercase tracking-widest text-primary">Live Threats</span>
        </div>
        <span className="text-[9px] font-code text-primary/60">Events: {counter}</span>
      </div>

      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <GlobeCore />
            <AttackArcs />
          </Float>
        </Canvas>
      </div>

      <div className="mt-4 space-y-1 bg-black/40 p-2 border border-primary/10">
        {logs.map((log, i) => (
          <div key={i} className="text-[8px] font-code text-primary/70 flex gap-2 overflow-hidden whitespace-nowrap">
            <span className="text-primary/30">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]</span>
            <span className="truncate">{log}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 text-[6px] font-code text-primary/20 text-center uppercase tracking-widest">
        Simulated honeypot data (Cowrie-inspired)
      </div>
    </div>
  );
}
