
"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

function ThreatGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.x = t * 0.02;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y = -t * 0.08;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group>
      {/* Inner Wireframe Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.8, 48, 48]} />
        <meshBasicMaterial color="#00ff9f" wireframe transparent opacity={0.15} />
      </mesh>
      
      {/* Outer Glow Shell */}
      <mesh ref={outerMeshRef}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial color="#00cfff" wireframe transparent opacity={0.05} />
      </mesh>
      
      {/* Network Nodes and Pulsing Connections */}
      <group ref={linesRef}>
        {[...Array(30)].map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 30);
          const theta = Math.sqrt(30 * Math.PI) * phi;
          const x = 2.8 * Math.cos(theta) * Math.sin(phi);
          const y = 2.8 * Math.sin(theta) * Math.sin(phi);
          const z = 2.8 * Math.cos(phi);
          
          return (
            <group key={i}>
              <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color="#00ff9f" />
              </mesh>
              {i % 4 === 0 && (
                <line>
                  <bufferGeometry>
                    <float32BufferAttribute 
                      attach="attributes-position" 
                      count={2} 
                      array={new Float32Array([0, 0, 0, x, y, z])} 
                      itemSize={3} 
                    />
                  </bufferGeometry>
                  <lineBasicMaterial color="#00ff9f" transparent opacity={0.1} />
                </line>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
}

function HexRain() {
  const count = 1200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        speed: 0.01 + Math.random() * 0.05,
        scale: 0.2 + Math.random() * 0.8,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.y -= p.speed;
      if (p.y < -20) p.y = 20;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale * 0.05, p.scale * 0.05, p.scale * 0.05);
      dummy.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(1, 1, 1), undefined, count]}>
      <meshBasicMaterial color="#00ff9f" transparent opacity={0.1} />
    </instancedMesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ff9f" intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ThreatGlobe />
        </Float>
        
        <HexRain />
        
        <gridHelper args={[100, 100, 0x00ff9f, 0x020408]} position={[0, -10, 0]} opacity={0.1} transparent />
      </Canvas>
    </div>
  );
}
