
"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Deep Space Background (Galaxy Dust)
    const dustGeometry = new THREE.BufferGeometry();
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x4444ff,
      size: 1.2,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const dustVertices = [];
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 4000;
      const y = (Math.random() - 0.5) * 4000;
      const z = (Math.random() - 0.5) * 4000;
      dustVertices.push(x, y, z);
    }
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustVertices, 3));
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // Stellar Cluster (Bright Stars)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const starVertices = [];
    for (let i = 0; i < 6000; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Orbital Rings
    const createOrbit = (radius: number, color: number) => {
      const geometry = new THREE.RingGeometry(radius, radius + 0.5, 128);
      const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.1 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;
      return mesh;
    };

    [200, 280, 360, 440, 520, 600].forEach(r => scene.add(createOrbit(r, 0x00C2FF)));

    // Milky Way Core Glow (Central Sphere)
    const coreGroup = new THREE.Group();
    const coreGeometry = new THREE.SphereGeometry(100, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
      transparent: true,
      opacity: 0.08,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Add a bright point at center
    const light = new THREE.PointLight(0x00C2FF, 2, 1000);
    scene.add(light);

    scene.add(coreGroup);

    camera.position.z = 1000;
    camera.position.y = 200;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isMouseDown = false;

    const onMouseMove = (event: MouseEvent) => {
      if (isMouseDown) {
        targetX += event.movementX * 0.5;
        targetY += event.movementY * 0.5;
      }
    };

    const onMouseDown = () => isMouseDown = true;
    const onMouseUp = () => isMouseDown = false;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      
      stars.rotation.y += 0.0001;
      dust.rotation.y += 0.00005;
      coreGroup.rotation.y += 0.001;
      
      // Smooth world rotation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      scene.rotation.y = mouseX * 0.001;
      scene.rotation.x = mouseY * 0.001;
      
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 bg-[#02040a]" />;
}
