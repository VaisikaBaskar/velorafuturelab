'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotMascot() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 480;
    let height = container.clientHeight || 520;

    // ==============================================================
    // 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
    // ==============================================================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 4.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // ==============================================================
    // 2. LIGHTING RIG (Matching reference studio lighting)
    // ==============================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    // Soft daylight from top-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Cool cyan/blue fill from left
    const fillLight = new THREE.DirectionalLight(0x00d4ff, 0.9);
    fillLight.position.set(-3.5, 2, 3);
    scene.add(fillLight);

    // Subtle emerald rim light from top-rear
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.1);
    rimLight.position.set(1, 3.5, -2.5);
    scene.add(rimLight);

    // ==============================================================
    // 3. TEXTURE & MESH GEOMETRY CONFIGURATION
    // ==============================================================
    const textureLoader = new THREE.TextureLoader();

    // Plane proportions matching 1024x987 texture
    const planeW = 2.68;
    const planeH = 2.58;

    // Exact neck center calculated from reference artwork
    // pixel_x = 465 / 1024 => u = 0.4541
    // pixel_y = 415 / 987  => v = 0.5795
    const neckX = (0.4541 - 0.5) * planeW; // ~ -0.123
    const neckY = (0.5795 - 0.5) * planeH; // ~ +0.205

    // Local eye coordinates relative to neck pivot
    // eye_center = (485, 245)
    const eyesX = (485 / 1024 - 0.5) * planeW;
    const eyesY = ((987 - 245) / 987 - 0.5) * planeH;
    const localEyeX = eyesX - neckX;
    const localEyeY = eyesY - neckY;

    // ==============================================================
    // 4. ROBOT GROUPS HIERARCHY
    // ==============================================================
    // Root group for subtle floating & suspension idle
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -0.06, 0);
    scene.add(robotGroup);

    // Helper: Create 3D curved plane for natural organic depth
    const createCurvedPlane = (w: number, h: number, bulge: number, centerX: number, centerY: number, radX: number, radY: number) => {
      const geo = new THREE.PlaneGeometry(w, h, 28, 28);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dx = (x - centerX) / radX;
        const dy = (y - centerY) / radY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 1.0) {
          // Smooth cosine dome curve for 3D helmet/torso volume
          const zDisp = Math.cos(d2 * Math.PI * 0.5) * bulge;
          pos.setZ(i, zDisp);
        }
      }
      geo.computeVertexNormals();
      return geo;
    };

    // --- BODY GROUP (Tracks, Torso, Arms, Hand, Code Icon, Shadow) ---
    const bodyGroup = new THREE.Group();
    robotGroup.add(bodyGroup);

    const bodyGeo = createCurvedPlane(planeW, planeH, 0.12, 0.05, -0.25, 1.2, 0.9);
    const bodyTexture = textureLoader.load('/images/robot/robot-body.png');
    bodyTexture.colorSpace = THREE.SRGBColorSpace;
    bodyTexture.generateMipmaps = true;

    const bodyMat = new THREE.MeshStandardMaterial({
      map: bodyTexture,
      transparent: true,
      alphaTest: 0.005,
      roughness: 0.28,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.set(0, 0, 0);
    bodyGroup.add(bodyMesh);

    // --- HEAD GROUP WITH NECK PIVOT (Entire Head Shell, Face, Eyes, Headphones) ---
    // The HeadPivot is placed EXACTLY at the neck coordinate
    const headPivot = new THREE.Group();
    headPivot.position.set(neckX, neckY, 0.04);
    robotGroup.add(headPivot);

    const headGroup = new THREE.Group();
    headPivot.add(headGroup);

    // Head curved plane centered around helmet
    const headGeo = createCurvedPlane(planeW, planeH, 0.22, neckX + localEyeX, neckY + localEyeY, 0.75, 0.6);
    const headTexture = textureLoader.load('/images/robot/robot-head.png');
    headTexture.colorSpace = THREE.SRGBColorSpace;
    headTexture.generateMipmaps = true;

    const headMat = new THREE.MeshStandardMaterial({
      map: headTexture,
      transparent: true,
      alphaTest: 0.005,
      roughness: 0.22,
      metalness: 0.14,
      side: THREE.DoubleSide,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    // Offset mesh so rotation happens exactly around the neck pivot
    headMesh.position.set(-neckX, -neckY, 0);
    headGroup.add(headMesh);

    // 3D PointLight for Expressive Glowing Eyes
    // Mounted inside headPivot so it moves synchronously with the head!
    const eyePointLight = new THREE.PointLight(0x00f5ff, 2.2, 3.2);
    eyePointLight.position.set(localEyeX, localEyeY, 0.35);
    headPivot.add(eyePointLight);

    // --- CODE ICON SPARKLE & GLOW GROUP ---
    const codeIconGroup = new THREE.Group();
    const badgeX = (785 / 1024 - 0.5) * planeW; // ~ +0.71
    const badgeY = ((987 - 240) / 987 - 0.5) * planeH; // ~ +0.66
    codeIconGroup.position.set(badgeX, badgeY, 0.18);
    robotGroup.add(codeIconGroup);

    // Local green-cyan light on the code badge
    const badgeLight = new THREE.PointLight(0x10b981, 1.4, 2.2);
    badgeLight.position.set(0, 0, 0.2);
    codeIconGroup.add(badgeLight);

    // 3D Floating Tech Sparkles around the Code Icon
    const sparkleCount = 14;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleOffsets = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i / sparkleCount) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.25 + Math.random() * 0.35;
      sparklePositions[i * 3 + 0] = Math.cos(angle) * radius;
      sparklePositions[i * 3 + 1] = Math.sin(angle) * radius;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;

      sparkleOffsets[i * 3 + 0] = Math.random() * 10;
      sparkleOffsets[i * 3 + 1] = 0.8 + Math.random() * 1.5;
      sparkleOffsets[i * 3 + 2] = Math.random() * Math.PI;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0x00ffcc,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    codeIconGroup.add(sparklePoints);

    // ==============================================================
    // 5. FULL-HEAD CURSOR TRACKING LOGIC
    // ==============================================================
    // Target rotations for HeadPivot
    let targetYaw = 0;   // Left-Right (-32° to +32°)
    let targetPitch = 0; // Up-Down (-20° to +20°)
    let targetRoll = 0;  // Subtle natural roll
    let isTracking = false;
    let lastMoveTime = performance.now();

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      // Normalized coordinates relative to hero center
      const nx = (clientX - centerX) / (window.innerWidth * 0.45);
      const ny = (clientY - centerY) / (window.innerHeight * 0.45);

      const clampedX = Math.max(-1.1, Math.min(1.1, nx));
      const clampedY = Math.max(-1.1, Math.min(1.1, ny));

      // MOUSE LEFT -> HEAD TURNS LEFT (negative yaw)
      // MOUSE RIGHT -> HEAD TURNS RIGHT (positive yaw)
      targetYaw = clampedX * 0.52; // ~30 degrees

      // MOUSE UP -> HEAD TILTS UP (negative pitch)
      // MOUSE DOWN -> HEAD TILTS DOWN (positive pitch)
      targetPitch = clampedY * 0.35; // ~20 degrees

      // Subtle natural companion roll on diagonal turns
      targetRoll = -clampedX * 0.09;

      isTracking = true;
      lastMoveTime = performance.now();
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = () => {
      isTracking = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    // ==============================================================
    // 6. ANIMATION & RENDER LOOP
    // ==============================================================
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Check if mouse stopped moving / left -> smoothly return to neutral + gentle idle look
      const timeSinceMove = performance.now() - lastMoveTime;
      if (!isTracking || timeSinceMove > 2200) {
        // Idle wander: friendly inquisitive head motions
        const idleYaw = Math.sin(time * 0.7) * 0.08 + Math.cos(time * 0.35) * 0.04;
        const idlePitch = Math.sin(time * 0.9) * 0.05;
        const idleRoll = -idleYaw * 0.12;

        targetYaw = THREE.MathUtils.lerp(targetYaw, idleYaw, 0.03);
        targetPitch = THREE.MathUtils.lerp(targetPitch, idlePitch, 0.03);
        targetRoll = THREE.MathUtils.lerp(targetRoll, idleRoll, 0.03);
      }

      // --- SMOOTH FULL-HEAD ROTATION INTERPOLATION ---
      // Rotate the HeadPivot around the neck
      headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, targetYaw, 0.08);
      headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, targetPitch, 0.08);
      headPivot.rotation.z = THREE.MathUtils.lerp(headPivot.rotation.z, targetRoll, 0.08);

      // --- ROBOT BODY IDLE BEHAVIOR ---
      // Body stays stationary per user specification, with only gentle breathing suspension
      robotGroup.position.y = -0.06 + Math.sin(time * 1.6) * 0.022;
      robotGroup.rotation.z = Math.sin(time * 0.8) * 0.004;

      // Dynamic Eye Glow Pulse (Natural LED breathing)
      eyePointLight.intensity = 2.0 + Math.sin(time * 3.2) * 0.35;

      // Code Icon Badge Glow & Tech Sparkle Float
      badgeLight.intensity = 1.3 + Math.sin(time * 2.8) * 0.3;
      const sparkPos = sparkleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkleCount; i++) {
        const offset = sparkleOffsets[i * 3 + 0];
        const speed = sparkleOffsets[i * 3 + 1];
        const baseZ = sparklePositions[i * 3 + 2];
        sparkPos.setZ(i, baseZ + Math.sin(time * speed + offset) * 0.08);
      }
      sparkPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ==============================================================
    // 7. RESPONSIVE RESIZE OBSERVER
    // ==============================================================
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ==============================================================
    // 8. CLEANUP
    // ==============================================================
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      bodyTexture.dispose();
      headTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full max-w-[460px] lg:max-w-[500px] h-[440px] sm:h-[480px] lg:h-[520px] mx-auto flex items-center justify-center select-none"
      style={{
        background: 'transparent',
      }}
      aria-label="Interactive 3D Tracked Robot Mascot"
      role="img"
    />
  );
}
