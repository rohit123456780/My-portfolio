'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/lib/store';

function DefensiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Infrastructure Core */}
      <Sphere ref={coreRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#00d2ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Multi-layered Shield Rings */}
      <Torus args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
      </Torus>
      <Torus args={[4.5, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
      </Torus>
      <Torus args={[5, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.05} />
      </Torus>

      {/* Orbiting Diagnostic Nodes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            Math.sin(i * (Math.PI / 6)) * 7,
            Math.cos(i * (Math.PI / 6)) * 7,
            Math.sin(i) * 2
          ]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
          </mesh>
        </Float>
      ))}

      {/* Particle Data Flow */}
      <Stars radius={20} depth={10} count={500} factor={1} saturation={0} fade speed={2} />
    </group>
  );
}

function OffensiveScene() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 4000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      
      const s = 1 + Math.sin(clock.getElapsedTime() * 15) * 0.03;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <Points ref={meshRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ff0000"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      <Float speed={8} rotationIntensity={3} floatIntensity={3}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <icosahedronGeometry args={[2.8, 0]} />
          <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* Digital Rain Drops */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Float key={i} speed={5} rotationIntensity={0} floatIntensity={0}>
          <mesh position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30]}>
            <boxGeometry args={[0.02, 0.8, 0.02]} />
            <meshBasicMaterial color="#ff3300" transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3D() {
  const { mode } = useUIStore();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color={mode === 'offensive' ? '#ff0000' : '#00ffff'} />
        <Stars 
          radius={120} 
          depth={60} 
          count={mode === 'offensive' ? 1500 : 8000} 
          factor={5} 
          saturation={0} 
          fade 
          speed={mode === 'offensive' ? 10 : 1} 
        />
        
        {mode === 'defensive' ? (
          <DefensiveScene />
        ) : (
          <OffensiveScene />
        )}

        <gridHelper 
          args={[200, 60, mode === 'offensive' ? 0xff0000 : 0x00ffff, 0x050505]} 
          position={[0, -12, 0]} 
          opacity={mode === 'offensive' ? 0.25 : 0.08}
          transparent
        />
      </Canvas>
    </div>
  );
}