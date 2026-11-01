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

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // ==============================================================
    // 2. LIGHTING RIG
    // ==============================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Clean top-right daylight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 3.5);
    scene.add(keyLight);

    // Cyan fill from left
    const fillLight = new THREE.DirectionalLight(0x00d4ff, 0.9);
    fillLight.position.set(-3.5, 2, 3);
    scene.add(fillLight);

    // Emerald rim light from top-rear
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.1);
    rimLight.position.set(1, 3.5, -2.5);
    scene.add(rimLight);

    // ==============================================================
    // 3. TEXTURE & MESH GEOMETRY CONFIGURATION
    // ==============================================================
    const textureLoader = new THREE.TextureLoader();

    // Plane proportions matching 1024x682 exact reference texture
    const planeH = 2.45;
    const planeW = planeH * (1024 / 682); // ~ 3.678

    // Exact neck center calculated from reference artwork
    // pixel_x = 500 / 1024 => u = 0.4883
    // pixel_y = 295 / 682  => v = 0.5674
    const neckX = (0.4883 - 0.5) * planeW; // ~ -0.043
    const neckY = (0.5674 - 0.5) * planeH; // ~ +0.165

    // Local eye coordinates relative to neck pivot for level head
    const eyesX = (500 / 1024 - 0.5) * planeW;
    const eyesY = ((682 - 220) / 682 - 0.5) * planeH;
    const localEyeX = eyesX - neckX; // ~ 0.0
    const localEyeY = eyesY - neckY; // ~ +0.27

    // ==============================================================
    // 4. ROBOT GROUPS HIERARCHY
    // ==============================================================
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
          const zDisp = Math.cos(d2 * Math.PI * 0.5) * bulge;
          pos.setZ(i, zDisp);
        }
      }
      geo.computeVertexNormals();
      return geo;
    };

    // --- BODY GROUP (Tracks, Torso, Arms, Hand, Code Icon) ---
    const bodyGroup = new THREE.Group();
    robotGroup.add(bodyGroup);

    const bodyGeo = createCurvedPlane(planeW, planeH, 0.12, 0.0, -0.22, 1.3, 0.85);
    const bodyTexture = textureLoader.load('/images/robot/robot-exact-body.png');
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

    // --- HEAD GROUP WITH CORRECTED UPRIGHT & CENTRED NECK PIVOT ---
    const headPivot = new THREE.Group();
    headPivot.position.set(neckX, neckY, 0.04);
    headPivot.rotation.set(0, 0, 0); // Symmetrical upright neutral
    robotGroup.add(headPivot);

    const headGroup = new THREE.Group();
    headPivot.add(headGroup);

    const headGeo = createCurvedPlane(planeW, planeH, 0.22, neckX + localEyeX, neckY + localEyeY, 0.75, 0.55);
    const headTexture = textureLoader.load('/images/robot/robot-exact-head.png');
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
    headMesh.position.set(-neckX, -neckY, 0);
    headGroup.add(headMesh);

    // 3D PointLight for Expressive Glowing Eyes
    const eyePointLight = new THREE.PointLight(0x00f5ff, 2.2, 3.0);
    eyePointLight.position.set(localEyeX, localEyeY, 0.35);
    headPivot.add(eyePointLight);

    // --- CODE ICON SPARKLE & GLOW GROUP ---
    const codeIconGroup = new THREE.Group();
    const badgeX = (780 / 1024 - 0.5) * planeW; // ~ +0.96
    const badgeY = ((682 - 240) / 682 - 0.5) * planeH; // ~ +0.36
    codeIconGroup.position.set(badgeX, badgeY, 0.18);
    robotGroup.add(codeIconGroup);

    // Local green-cyan light on the code badge
    const badgeLight = new THREE.PointLight(0x10b981, 1.4, 2.2);
    badgeLight.position.set(0, 0, 0.2);
    codeIconGroup.add(badgeLight);

    // 3D Floating Tech Sparkles around Code Badge
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
    let targetYaw = 0;   // Left-Right (-30° to +30°)
    let targetPitch = 0; // Up-Down (-18° to +18°)
    let targetRoll = 0;  // Subtle natural roll
    let isTracking = false;
    let lastMoveTime = performance.now();

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      const nx = (clientX - centerX) / (window.innerWidth * 0.45);
      const ny = (clientY - centerY) / (window.innerHeight * 0.45);

      const clampedX = Math.max(-1.1, Math.min(1.1, nx));
      const clampedY = Math.max(-1.1, Math.min(1.1, ny));

      // MOUSE LEFT -> HEAD TURNS LEFT
      // MOUSE RIGHT -> HEAD TURNS RIGHT
      targetYaw = clampedX * 0.48; // ~28 degrees

      // MOUSE UP -> HEAD TILTS UP
      // MOUSE DOWN -> HEAD TILTS DOWN
      targetPitch = clampedY * 0.32; // ~18 degrees

      // Subtle natural companion roll on diagonal turns
      targetRoll = -clampedX * 0.07;

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

      // Return to neutral when mouse leaves / stops moving
      const timeSinceMove = performance.now() - lastMoveTime;
      if (!isTracking || timeSinceMove > 2200) {
        const idleYaw = Math.sin(time * 0.7) * 0.04;
        const idlePitch = Math.sin(time * 0.9) * 0.025;
        const idleRoll = -idleYaw * 0.08;

        targetYaw = THREE.MathUtils.lerp(targetYaw, idleYaw, 0.04);
        targetPitch = THREE.MathUtils.lerp(targetPitch, idlePitch, 0.04);
        targetRoll = THREE.MathUtils.lerp(targetRoll, idleRoll, 0.04);
      }

      // --- SMOOTH FULL-HEAD ROTATION INTERPOLATION ---
      headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, targetYaw, 0.08);
      headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, targetPitch, 0.08);
      headPivot.rotation.z = THREE.MathUtils.lerp(headPivot.rotation.z, targetRoll, 0.08);

      // --- ROBOT BODY IDLE BEHAVIOR ---
      robotGroup.position.y = -0.06 + Math.sin(time * 1.6) * 0.022;
      robotGroup.rotation.z = Math.sin(time * 0.8) * 0.003;

      // Dynamic Eye Glow Pulse
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
      className="relative w-full max-w-[480px] lg:max-w-[520px] h-[460px] sm:h-[500px] lg:h-[540px] mx-auto flex items-center justify-center select-none"
      style={{
        background: 'transparent',
      }}
      aria-label="Interactive 3D Tracked Robot Mascot"
      role="img"
    />
  );
}
