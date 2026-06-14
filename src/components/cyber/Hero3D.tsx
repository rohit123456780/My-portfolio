
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/lib/store';

function DefensiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Sphere args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          transparent
          opacity={0.2}
        />
      </Sphere>
      
      {/* Shield Lattice */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Floating Satellites */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[
            Math.sin(i) * 6,
            Math.cos(i) * 6,
            Math.sin(i * 2) * 2
          ]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OffensiveScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mode } = useUIStore();
  const count = 1000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 40,
        y: Math.random() * 40,
        z: (Math.random() - 0.5) * 40,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    particles.forEach((p, i) => {
      p.y -= p.speed;
      if (p.y < -20) p.y = 20;
      
      // Add a bit of horizontal jitter for glitch effect
      const jitter = Math.sin(clock.getElapsedTime() * 10 + i) * 0.05;
      
      dummy.position.set(p.x + jitter, p.y, p.z);
      dummy.scale.set(0.1, 0.8, 0.1);
      dummy.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(1, 1, 1), undefined, count]}>
        <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
      </instancedMesh>
      
      {/* Central Glitch Core */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <octahedronGeometry args={[3, 0]} />
        <meshBasicMaterial color="#ff0000" wireframe />
      </mesh>
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
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars 
          radius={100} 
          depth={50} 
          count={mode === 'offensive' ? 1000 : 5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={mode === 'offensive' ? 5 : 1} 
        />
        
        {mode === 'defensive' ? (
          <DefensiveScene />
        ) : (
          <OffensiveScene />
        )}

        <gridHelper 
          args={[100, 50, mode === 'offensive' ? 0xff0000 : 0x00ffff, 0x111111]} 
          position={[0, -10, 0]} 
          rotation={[0, 0, 0]} 
          opacity={0.1}
          transparent
        />
      </Canvas>
    </div>
  );
}
