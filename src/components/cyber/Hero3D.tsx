
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/lib/store';

function ThreatGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);
  const { mode } = useUIStore();
  
  const color = mode === 'defensive' ? "#00ff9f" : "#ff003c";
  const speedMult = mode === 'defensive' ? 1 : 4;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1 * speedMult;
      meshRef.current.rotation.x = t * 0.05 * speedMult;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y = -t * 0.15 * speedMult;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.08 * speedMult;
    }
  });

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(-1 + (2 * i) / 60);
      const theta = Math.sqrt(60 * Math.PI) * phi;
      const x = 3.5 * Math.cos(theta) * Math.sin(phi);
      const y = 3.5 * Math.sin(theta) * Math.sin(phi);
      const z = 3.5 * Math.cos(phi);
      temp.push([x, y, z]);
    }
    return temp;
  }, []);

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.5, 50, 50]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      
      <mesh ref={outerMeshRef}>
        <sphereGeometry args={[3.8, 25, 25]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
      </mesh>
      
      <group ref={linesRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={i % 7 === 0 ? "#ffffff" : color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function MatrixStream() {
  const count = 1500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mode } = useUIStore();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 60,
        speed: 0.1 + Math.random() * 0.2,
        scale: 0.05 + Math.random() * 0.1,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    const speedScale = mode === 'offensive' ? 2 : 0.5;
    particles.forEach((p, i) => {
      p.y -= p.speed * speedScale;
      if (p.y < -30) p.y = 30;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(1, 1, 1), undefined, count]}>
      <meshBasicMaterial color={mode === 'offensive' ? "#ff0000" : "#00ff9f"} transparent opacity={0.1} />
    </instancedMesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <ThreatGlobe />
        </Float>
        <MatrixStream />
        <gridHelper args={[100, 40, 0x555555, 0x222222]} position={[0, -8, 0]} rotation={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
