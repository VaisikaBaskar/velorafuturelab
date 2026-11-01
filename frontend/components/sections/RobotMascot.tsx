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

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 4.6);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ==============================================================
    // 2. STUDIO LIGHTING RIG (Blue & Green Accents)
    // ==============================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    // Key Light (Clean daylight from top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3.5, 4.5, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cool Electric Cyan Fill Light (from left)
    const fillLight = new THREE.DirectionalLight(0x00d4ff, 1.1);
    fillLight.position.set(-3.5, 2.0, 3.0);
    scene.add(fillLight);

    // Emerald Green Rim Light (from top-rear)
    const rimLight = new THREE.DirectionalLight(0x22c55e, 1.6);
    rimLight.position.set(0, 3.5, -2.5);
    scene.add(rimLight);

    // Subtle Bottom Blue Uplight
    const bottomLight = new THREE.DirectionalLight(0x1d4ed8, 0.8);
    bottomLight.position.set(0, -3.0, 2.0);
    scene.add(bottomLight);

    // ==============================================================
    // 3. TEXTURE GENERATORS (HTML5 Canvas)
    // ==============================================================
    // (a) Expressive Glowing Blue Eye Texture with Double Catchlights
    const createEyeCanvasTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const cx = 256;
      const cy = 256;
      const r = 210;

      // Soft outer cyan neon glow
      const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
      outerGlow.addColorStop(0, 'rgba(0, 245, 255, 0.95)');
      outerGlow.addColorStop(0.55, 'rgba(0, 180, 255, 0.85)');
      outerGlow.addColorStop(0.85, 'rgba(0, 100, 255, 0.4)');
      outerGlow.addColorStop(1, 'rgba(0, 50, 255, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Sharp glowing cyan ring
      const ringGrad = ctx.createRadialGradient(cx, cy, r * 0.58, cx, cy, r * 0.82);
      ringGrad.addColorStop(0, '#00b4d8');
      ringGrad.addColorStop(0.35, '#00f5ff');
      ringGrad.addColorStop(0.7, '#38bdf8');
      ringGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Deep dark pupil
      const pupilGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.62);
      pupilGrad.addColorStop(0, '#040d21');
      pupilGrad.addColorStop(0.8, '#030814');
      pupilGrad.addColorStop(1, '#061a3a');
      ctx.fillStyle = pupilGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.62, 0, Math.PI * 2);
      ctx.fill();

      // Inner electric-blue crescent sheen
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.65)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(cx, cy + 10, r * 0.48, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();

      // Specular Highlight 1: Large circular catchlight (top-right)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + 52, cy - 52, 44, 0, Math.PI * 2);
      ctx.fill();

      // Specular Highlight 2: Small circular catchlight (bottom-left)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(cx - 58, cy + 56, 24, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // (b) Programming Icon Badge Texture (`</>` in Blue-Green Gradient)
    const createCodeBadgeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Rounded rectangle badge background
      const roundRect = (x: number, y: number, w: number, h: number, rad: number) => {
        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + w - rad, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad);
        ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.closePath();
      };

      // Blue to Green Diagonal Gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#2563eb');
      grad.addColorStop(0.5, '#0284c7');
      grad.addColorStop(1, '#22c55e');

      ctx.fillStyle = grad;
      roundRect(24, 24, 464, 464, 90);
      ctx.fill();

      // Subtle glossy rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 12;
      roundRect(28, 28, 456, 456, 86);
      ctx.stroke();

      // Crisp White `</>` Symbol
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 240px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      ctx.fillText('</>', 256, 260);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // (c) Ground Drop Shadow
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.55)');
      grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.32)');
      grad.addColorStop(0.75, 'rgba(15, 23, 42, 0.12)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(256, 256, 240, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // ==============================================================
    // 4. PBR MATERIALS
    // ==============================================================
    // Futuristic White Ceramic Armor
    const whiteCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.14,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
    });

    // Metallic Royal Blue Armor & Details
    const metallicBlueMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.22,
      metalness: 0.65,
    });

    // Neon / Lime Green Accent Trim
    const limeGreenMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.2,
      metalness: 0.35,
      emissive: 0x15803d,
      emissiveIntensity: 0.45,
    });

    // Dark Obsidian Glossy Screen / Visor
    const glossyScreenMat = new THREE.MeshPhysicalMaterial({
      color: 0x050c1e,
      roughness: 0.06,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    // Dark Metallic Joints & Mechanics
    const darkMechanicsMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.32,
      metalness: 0.82,
    });

    // Rubber Tank Treads
    const rubberTreadMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.72,
      metalness: 0.08,
    });

    // Glowing Eye Material
    const eyeTexture = createEyeCanvasTexture();
    const eyeMaterial = new THREE.MeshBasicMaterial({
      map: eyeTexture,
      transparent: true,
    });

    // Programming Badge Material
    const codeBadgeTexture = createCodeBadgeTexture();
    const codeBadgeMat = new THREE.MeshStandardMaterial({
      map: codeBadgeTexture,
      roughness: 0.18,
      metalness: 0.15,
      emissive: 0x10b981,
      emissiveIntensity: 0.15,
    });

    // Ground Shadow Material
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      depthWrite: false,
    });

    // ==============================================================
    // 5. ROBOT MODEL ASSEMBLY
    // ==============================================================
    // Root group for gentle idle floating / suspension
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -0.05, 0);
    scene.add(robotGroup);

    // Ground Contact Shadow Plane
    const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.4), shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.set(0, -1.02, 0.05);
    scene.add(groundShadow);

    // --------------------------------------------------------------
    // 5A. BODY GROUP (Torso, Tracks, Arms, Hands, Badge)
    // --------------------------------------------------------------
    const bodyGroup = new THREE.Group();
    robotGroup.add(bodyGroup);

    // --- (1) DUAL TRACKED WHEELS (Tank Crawler Treads) ---
    const buildTrackAssembly = (isRight: boolean) => {
      const trackGroup = new THREE.Group();
      const sign = isRight ? 1 : -1;
      trackGroup.position.set(sign * 0.88, -0.72, 0.02);

      // Track body housing
      const trackHousing = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.48, 1.3),
        rubberTreadMat
      );
      trackHousing.castShadow = true;
      trackHousing.receiveShadow = true;
      trackGroup.add(trackHousing);

      // Front Big Wheel with Lime-Green Outer Rim
      const frontWheelGroup = new THREE.Group();
      frontWheelGroup.position.set(0, 0.02, 0.42);
      trackGroup.add(frontWheelGroup);

      const frontRim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.4, 24),
        limeGreenMat
      );
      frontRim.rotation.z = Math.PI / 2;
      frontWheelGroup.add(frontRim);

      const frontHub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.41, 24),
        darkMechanicsMat
      );
      frontHub.rotation.z = Math.PI / 2;
      frontWheelGroup.add(frontHub);

      // Rear Wheels with Blue Rims
      for (let i = 0; i < 2; i++) {
        const rearWheel = new THREE.Group();
        rearWheel.position.set(0, -0.04, -0.15 - i * 0.35);
        trackGroup.add(rearWheel);

        const rim = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.4, 20),
          metallicBlueMat
        );
        rim.rotation.z = Math.PI / 2;
        rearWheel.add(rim);

        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.41, 16),
          darkMechanicsMat
        );
        hub.rotation.z = Math.PI / 2;
        rearWheel.add(hub);
      }

      // Segmented Tread Pads
      const treadCount = 12;
      for (let i = 0; i < treadCount; i++) {
        const treadPad = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.04, 0.09),
          rubberTreadMat
        );
        // Top and bottom runs
        if (i < 6) {
          treadPad.position.set(0, 0.25, -0.5 + i * 0.2);
        } else {
          treadPad.position.set(0, -0.25, -0.5 + (i - 6) * 0.2);
        }
        trackGroup.add(treadPad);
      }

      return trackGroup;
    };

    bodyGroup.add(buildTrackAssembly(false)); // Left track
    bodyGroup.add(buildTrackAssembly(true));  // Right track

    // Chassis Bridge / Axle
    const chassisBridge = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.2, 0.6),
      darkMechanicsMat
    );
    chassisBridge.position.set(0, -0.65, 0);
    bodyGroup.add(chassisBridge);

    // --- (2) MAIN BODY / TORSO ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.12, 0);
    bodyGroup.add(torsoGroup);

    // Sculpted White Ceramic Torso
    const mainTorso = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.82, 0.76),
      whiteCeramicMat
    );
    mainTorso.castShadow = true;
    mainTorso.receiveShadow = true;
    torsoGroup.add(mainTorso);

    // Torso Blue Base Trim
    const torsoBaseTrim = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 0.12, 0.78),
      metallicBlueMat
    );
    torsoBaseTrim.position.set(0, -0.38, 0);
    torsoGroup.add(torsoBaseTrim);

    // Torso Top Lime-Green Accent Bevels
    const torsoTopTrim = new THREE.Mesh(
      new THREE.BoxGeometry(1.18, 0.05, 0.72),
      limeGreenMat
    );
    torsoTopTrim.position.set(0, 0.42, 0);
    torsoGroup.add(torsoTopTrim);

    // Chest Screen Outer Frame
    const chestFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.74, 0.48, 0.04),
      limeGreenMat
    );
    chestFrame.position.set(0, 0.02, 0.385);
    torsoGroup.add(chestFrame);

    // Glossy Obsidian Chest Display
    const chestDisplay = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.42, 0.04),
      glossyScreenMat
    );
    chestDisplay.position.set(0, 0.02, 0.395);
    torsoGroup.add(chestDisplay);

    // Chest LED Slots (Lime Green)
    const createLedSlot = (w: number, x: number, y: number) => {
      const led = new THREE.Mesh(new THREE.BoxGeometry(w, 0.03, 0.02), limeGreenMat);
      led.position.set(x, y, 0.4);
      return led;
    };
    torsoGroup.add(createLedSlot(0.14, -0.22, 0.26));
    torsoGroup.add(createLedSlot(0.14, -0.22, 0.20));
    torsoGroup.add(createLedSlot(0.14, -0.22, -0.24));

    // Top Right Camera / Blue Sensor
    const chestSensor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16),
      metallicBlueMat
    );
    chestSensor.rotation.x = Math.PI / 2;
    chestSensor.position.set(0.24, 0.23, 0.4);
    torsoGroup.add(chestSensor);

    // --- (3) ARTICULATED ROBOTIC ARMS ---
    // Left Arm (Viewer's Left - Resting naturally near track)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.68, 0.12, 0);
    bodyGroup.add(leftArmGroup);

    // Shoulder gimbal
    const leftShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 18, 18),
      metallicBlueMat
    );
    leftArmGroup.add(leftShoulder);

    // Upper arm
    const leftUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.32, 16),
      whiteCeramicMat
    );
    leftUpperArm.rotation.z = Math.PI * 0.18;
    leftUpperArm.position.set(-0.14, -0.15, 0.08);
    leftArmGroup.add(leftUpperArm);

    // Elbow joint
    const leftElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 14, 14),
      darkMechanicsMat
    );
    leftElbow.position.set(-0.25, -0.32, 0.15);
    leftArmGroup.add(leftElbow);

    // Forearm
    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.08, 0.28, 16),
      whiteCeramicMat
    );
    leftForearm.rotation.z = Math.PI * 0.35;
    leftForearm.rotation.x = -Math.PI * 0.12;
    leftForearm.position.set(-0.35, -0.42, 0.25);
    leftArmGroup.add(leftForearm);

    // Left Hand (Articulated fingers resting near track)
    const leftHand = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.12, 0.18),
      darkMechanicsMat
    );
    leftHand.position.set(-0.48, -0.48, 0.35);
    leftHand.rotation.y = -Math.PI * 0.15;
    leftArmGroup.add(leftHand);

    // Right Arm (Viewer's Right - Raised upright holding Code Icon)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.68, 0.12, 0);
    bodyGroup.add(rightArmGroup);

    // Shoulder gimbal
    const rightShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 18, 18),
      metallicBlueMat
    );
    rightArmGroup.add(rightShoulder);

    // Upper arm (raised up & outwards)
    const rightUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.36, 16),
      whiteCeramicMat
    );
    rightUpperArm.rotation.z = -Math.PI * 0.32;
    rightUpperArm.position.set(0.2, 0.1, 0.06);
    rightArmGroup.add(rightUpperArm);

    // Elbow joint
    const rightElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 14, 14),
      darkMechanicsMat
    );
    rightElbow.position.set(0.38, 0.24, 0.12);
    rightArmGroup.add(rightElbow);

    // Forearm pointing upright
    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.08, 0.32, 16),
      whiteCeramicMat
    );
    rightForearm.rotation.z = -Math.PI * 0.1;
    rightForearm.position.set(0.44, 0.42, 0.18);
    rightArmGroup.add(rightForearm);

    // Wrist ring (Lime Green)
    const rightWristRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.04, 16),
      limeGreenMat
    );
    rightWristRing.position.set(0.46, 0.58, 0.2);
    rightArmGroup.add(rightWristRing);

    // Mechanical Right Hand gripping badge
    const rightHand = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.14, 0.12),
      darkMechanicsMat
    );
    rightHand.position.set(0.47, 0.67, 0.22);
    rightArmGroup.add(rightHand);

    // --- (4) PROGRAMMING ICON BADGE (</>) ---
    const codeBadgeGroup = new THREE.Group();
    codeBadgeGroup.position.set(0.52, 0.94, 0.24);
    rightArmGroup.add(codeBadgeGroup);

    // 3D Rounded Badge Tile
    const badgeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.46, 0.06),
      codeBadgeMat
    );
    badgeMesh.castShadow = true;
    codeBadgeGroup.add(badgeMesh);

    // Local Glow Light on Code Icon
    const badgeLight = new THREE.PointLight(0x22c55e, 1.8, 2.5);
    badgeLight.position.set(0, 0, 0.2);
    codeBadgeGroup.add(badgeLight);

    // Floating Tech Particles around Code Badge
    const sparkleCount = 14;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleOffsets = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i / sparkleCount) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.26 + Math.random() * 0.25;
      sparklePositions[i * 3 + 0] = Math.cos(angle) * radius;
      sparklePositions[i * 3 + 1] = Math.sin(angle) * radius;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

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
    codeBadgeGroup.add(sparklePoints);

    // --------------------------------------------------------------
    // 5B. NECK JOINT & HEAD PIVOT (Perfect Alignment & Rotation Center)
    // --------------------------------------------------------------
    // Segmented Dark Mechanical Neck Base
    const neckBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.2, 0.18, 24),
      darkMechanicsMat
    );
    neckBase.position.set(0, 0.36, 0);
    bodyGroup.add(neckBase);

    // The HeadPivot is placed at the center of the neck connection
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.44, 0);
    headPivot.rotation.set(0, 0, 0); // Perfectly straight neutral rotation
    robotGroup.add(headPivot);

    // --------------------------------------------------------------
    // 5C. HEAD GROUP (Symmetrical, Centred & Fully Controllable)
    // --------------------------------------------------------------
    const headGroup = new THREE.Group();
    // Centered above the neck pivot
    headGroup.position.set(0, 0.46, 0);
    headPivot.add(headGroup);

    // --- (1) Head Outer Helmet Shell (White Ceramic + Blue Casing + Green Ridge) ---
    // White Ceramic Front Bezel
    const headBezel = new THREE.Mesh(
      new THREE.BoxGeometry(1.48, 0.9, 0.84),
      whiteCeramicMat
    );
    headBezel.castShadow = true;
    headGroup.add(headBezel);

    // Blue Outer Shell Casing (Slightly larger rear shell)
    const headRearShell = new THREE.Mesh(
      new THREE.BoxGeometry(1.52, 0.92, 0.72),
      metallicBlueMat
    );
    headRearShell.position.set(0, 0, -0.1);
    headGroup.add(headRearShell);

    // Top Neon/Lime-Green Accent Ridge
    const headTopRidge = new THREE.Mesh(
      new THREE.BoxGeometry(1.44, 0.06, 0.78),
      limeGreenMat
    );
    headTopRidge.position.set(0, 0.47, -0.04);
    headGroup.add(headTopRidge);

    // --- (2) Glossy Dark Obsidian Face Display ---
    const faceDisplay = new THREE.Mesh(
      new THREE.BoxGeometry(1.32, 0.74, 0.06),
      glossyScreenMat
    );
    faceDisplay.position.set(0, 0, 0.415);
    headGroup.add(faceDisplay);

    // --- (3) Large Expressive Glowing Blue Eyes (Symmetrical ±0.34) ---
    const eyeGeometry = new THREE.PlaneGeometry(0.44, 0.44);

    const leftEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEyeMesh.position.set(-0.34, 0.01, 0.455);
    headGroup.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEyeMesh.position.set(0.34, 0.01, 0.455);
    headGroup.add(rightEyeMesh);

    // Real-Time 3D Cyan Point Light for Eyes
    const eyePointLight = new THREE.PointLight(0x00f5ff, 2.5, 3.5);
    eyePointLight.position.set(0, 0.05, 0.85);
    headGroup.add(eyePointLight);

    // --- (4) Symmetrical Headphones (Left & Right) ---
    const buildHeadphone = (isRight: boolean) => {
      const hpGroup = new THREE.Group();
      const sign = isRight ? 1 : -1;
      hpGroup.position.set(sign * 0.77, 0, 0.02);

      // Blue Ear Cylinder
      const earCylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.16, 24),
        metallicBlueMat
      );
      earCylinder.rotation.z = Math.PI / 2;
      hpGroup.add(earCylinder);

      // Lime-Green Center Core Ring
      const greenCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.18, 20),
        limeGreenMat
      );
      greenCore.rotation.z = Math.PI / 2;
      hpGroup.add(greenCore);

      // Dark Center Accent Pin
      const centerPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.2, 16),
        darkMechanicsMat
      );
      centerPin.rotation.z = Math.PI / 2;
      hpGroup.add(centerPin);

      return hpGroup;
    };

    headGroup.add(buildHeadphone(false)); // Left headphone (symmetrical at -0.77)
    headGroup.add(buildHeadphone(true));  // Right headphone (symmetrical at +0.77)

    // ==============================================================
    // 6. FULL-HEAD CURSOR TRACKING
    // ==============================================================
    let targetYaw = 0;   // Left-Right (-30° to +30°)
    let targetPitch = 0; // Up-Down (-20° to +20°)
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

      // MOUSE LEFT -> COMPLETE HEAD TURNS LEFT
      // MOUSE RIGHT -> COMPLETE HEAD TURNS RIGHT
      targetYaw = clampedX * 0.52; // ~30 degrees

      // MOUSE UP -> COMPLETE HEAD TILTS UP
      // MOUSE DOWN -> COMPLETE HEAD TILTS DOWN
      targetPitch = clampedY * 0.35; // ~20 degrees

      // Subtle natural companion roll on diagonal turns
      targetRoll = -clampedX * 0.08;

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
    // 7. ANIMATION & RENDER LOOP
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
        const idleRoll = -idleYaw * 0.06;

        targetYaw = THREE.MathUtils.lerp(targetYaw, idleYaw, 0.04);
        targetPitch = THREE.MathUtils.lerp(targetPitch, idlePitch, 0.04);
        targetRoll = THREE.MathUtils.lerp(targetRoll, idleRoll, 0.04);
      }

      // --- SMOOTH FULL-HEAD ROTATION INTERPOLATION ---
      // Rotate the entire HeadPivot around the neck
      headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, targetYaw, 0.08);
      headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, targetPitch, 0.08);
      headPivot.rotation.z = THREE.MathUtils.lerp(headPivot.rotation.z, targetRoll, 0.08);

      // --- ROBOT BODY IDLE BEHAVIOR ---
      // Body stays stationary with only gentle breathing suspension
      robotGroup.position.y = -0.05 + Math.sin(time * 1.5) * 0.02;
      robotGroup.rotation.z = Math.sin(time * 0.75) * 0.003;

      // Dynamic Eye Glow Pulse (Natural breathing)
      eyePointLight.intensity = 2.4 + Math.sin(time * 3.0) * 0.4;

      // Natural Eye Blink Cycle (Every 4.5s)
      const blinkCycle = time % 4.5;
      if (blinkCycle > 4.35) {
        // Quick blink
        leftEyeMesh.scale.y = 0.1;
        rightEyeMesh.scale.y = 0.1;
      } else {
        leftEyeMesh.scale.y = 1.0;
        rightEyeMesh.scale.y = 1.0;
      }

      // Code Icon Badge Float & Tech Sparkles
      badgeLight.intensity = 1.6 + Math.sin(time * 2.5) * 0.35;
      codeBadgeGroup.position.y = 0.94 + Math.sin(time * 2.0) * 0.015;

      const sparkPos = sparkleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkleCount; i++) {
        const offset = sparkleOffsets[i * 3 + 0];
        const speed = sparkleOffsets[i * 3 + 1];
        const baseZ = sparklePositions[i * 3 + 2];
        sparkPos.setZ(i, baseZ + Math.sin(time * speed + offset) * 0.06);
      }
      sparkPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ==============================================================
    // 8. RESPONSIVE RESIZE OBSERVER
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
    // 9. CLEANUP
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

      eyeTexture.dispose();
      codeBadgeTexture.dispose();
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
      aria-label="Interactive 3D Robot Mascot"
      role="img"
    />
  );
}
