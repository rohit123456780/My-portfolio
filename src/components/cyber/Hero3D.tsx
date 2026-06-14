
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/lib/store';

function DefensiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Infrastructure Core */}
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#00d2ff"
          attach="material"
          distort={0.2}
          speed={3}
          roughness={0.1}
          metalness={1}
          transparent
          opacity={0.4}
        />
      </Sphere>
      
      {/* Network Lattices */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
      </mesh>

      {/* Floating Server/Node Satellites */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            Math.sin(i * 0.5) * 6,
            Math.cos(i * 0.5) * 6,
            Math.sin(i) * 3
          ]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OffensiveScene() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      
      // Glitch position scaling
      const s = 1 + Math.sin(clock.getElapsedTime() * 20) * 0.02;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <Points ref={meshRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ff0000"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Central Glitch Shard */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <octahedronGeometry args={[2.5, 0]} />
          <meshBasicMaterial color="#ff0000" wireframe />
        </mesh>
      </Float>

      {/* Falling Binary Bits (Simulated with lines) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={4} rotationIntensity={0} floatIntensity={0}>
          <mesh position={[(Math.random() - 0.5) * 20, 10, (Math.random() - 0.5) * 20]}>
            <boxGeometry args={[0.05, 1, 0.05]} />
            <meshBasicMaterial color="#ff3300" transparent opacity={0.4} />
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
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={mode === 'offensive' ? '#ff0000' : '#00ffff'} />
        <Stars 
          radius={100} 
          depth={50} 
          count={mode === 'offensive' ? 1000 : 7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={mode === 'offensive' ? 8 : 1} 
        />
        
        {mode === 'defensive' ? (
          <DefensiveScene />
        ) : (
          <OffensiveScene />
        )}

        <gridHelper 
          args={[100, 40, mode === 'offensive' ? 0xff0000 : 0x00ffff, 0x111111]} 
          position={[0, -10, 0]} 
          opacity={mode === 'offensive' ? 0.2 : 0.05}
          transparent
        />
      </Canvas>
    </div>
  );
}
