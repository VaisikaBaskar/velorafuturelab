'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotMascot() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 460;
    let height = container.clientHeight || 520;

    // ==============================================================
    // 1. THREE.JS SCENE, CAMERA & RENDERER SETUP
    // ==============================================================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 4.8);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key Light (Clean top-right daylight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3.5, 4, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light (Cool electric blue from left)
    const fillLight = new THREE.DirectionalLight(0x00d4ff, 1.4);
    fillLight.position.set(-3.5, 2.5, 2.5);
    scene.add(fillLight);

    // Rim / Edge Light (Emerald green accent rim from top-rear)
    const rimLight = new THREE.DirectionalLight(0x00ff88, 2.0);
    rimLight.position.set(0, 3.5, -3);
    scene.add(rimLight);

    // Cyan Bottom Uplight
    const bottomLight = new THREE.DirectionalLight(0x0052cc, 1.0);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // ==============================================================
    // 3. PBR MATERIALS
    // ==============================================================
    // White Ceramic Robot Armor (Glossy pearl finish)
    const whiteArmorMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    });

    // Metallic Silver Trim & Joints
    const silverTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd0d7de,
      roughness: 0.22,
      metalness: 0.85,
    });

    // Velora Electric Blue Plastic / Metal (Accent color)
    const veloraBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0052cc,
      roughness: 0.25,
      metalness: 0.4,
    });

    // Emerald Green Accent
    const emeraldGreenMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.25,
      metalness: 0.35,
    });

    // Dark Rubber / Charcoal Track Tread
    const trackTreadMat = new THREE.MeshStandardMaterial({
      color: 0x18202c,
      roughness: 0.75,
      metalness: 0.25,
    });

    // Dark Glossy Obsidian Display Face
    const darkDisplayMat = new THREE.MeshPhysicalMaterial({
      color: 0x030611,
      roughness: 0.04,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });

    // Glowing Cyan Core / Eyes
    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
    });

    // Glowing Emerald Green
    const greenGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
    });

    // ==============================================================
    // 4. HIERARCHICAL 3D MODEL ASSEMBLY
    // ==============================================================
    // Helper function to generate clean rounded rectangle shapes
    const createRoundedRectShape = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      return s;
    };

    // Root Robot Object
    const robotGroup = new THREE.Group();
    robotGroup.position.y = -0.05;
    scene.add(robotGroup);

    // --------------------------------------------------------------
    // 4A. BODY GROUP (Tracks, Chassis, Torso, Chest Display & Arms)
    // --------------------------------------------------------------
    const bodyGroup = new THREE.Group();
    robotGroup.add(bodyGroup);

    // --- TRACKED WHEELS (LeftTrack & RightTrack) ---
    const createTrackedWheelAssembly = (isLeft: boolean) => {
      const trackAssembly = new THREE.Group();
      const side = isLeft ? -1 : 1;
      const xPos = side * 0.72;
      trackAssembly.position.set(xPos, -0.68, 0);

      // Track Belt Geometry (Continuous tank crawler belt)
      const trackShape = new THREE.Shape();
      const tLen = 0.65;
      const tRad = 0.22;
      trackShape.moveTo(-tLen / 2, -tRad);
      trackShape.lineTo(tLen / 2, -tRad);
      trackShape.absarc(tLen / 2, 0, tRad, -Math.PI / 2, Math.PI / 2, false);
      trackShape.lineTo(-tLen / 2, tRad);
      trackShape.absarc(-tLen / 2, 0, tRad, Math.PI / 2, (3 * Math.PI) / 2, false);

      const trackExtrudeSettings = {
        depth: 0.28,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      };
      const beltGeo = new THREE.ExtrudeGeometry(trackShape, trackExtrudeSettings);
      const beltMesh = new THREE.Mesh(beltGeo, trackTreadMat);
      beltMesh.position.z = -0.14;
      beltMesh.castShadow = true;
      beltMesh.receiveShadow = true;
      trackAssembly.add(beltMesh);

      // Outer Side Armor Cover Plate (White ceramic with blue accent trim)
      const plateShape = new THREE.Shape();
      const pLen = 0.58;
      const pRad = 0.18;
      plateShape.moveTo(-pLen / 2, -pRad);
      plateShape.lineTo(pLen / 2, -pRad);
      plateShape.absarc(pLen / 2, 0, pRad, -Math.PI / 2, Math.PI / 2, false);
      plateShape.lineTo(-pLen / 2, pRad);
      plateShape.absarc(-pLen / 2, 0, pRad, Math.PI / 2, (3 * Math.PI) / 2, false);

      const plateGeo = new THREE.ExtrudeGeometry(plateShape, {
        depth: 0.04,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      });
      const plateMesh = new THREE.Mesh(plateGeo, whiteArmorMat);
      plateMesh.position.z = side > 0 ? 0.145 : -0.185;
      trackAssembly.add(plateMesh);

      // Blue & Green LED Accent Stripe along track armor
      const ledStripeGeo = new THREE.BoxGeometry(0.5, 0.025, 0.01);
      const ledStripe = new THREE.Mesh(
        ledStripeGeo,
        isLeft ? cyanGlowMat : greenGlowMat
      );
      ledStripe.position.set(0, 0, side > 0 ? 0.2 : -0.2);
      trackAssembly.add(ledStripe);

      // Road Wheels & Drive Sprockets inside track
      const wheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.32, 24);
      wheelGeo.rotateZ(Math.PI / 2);

      // Front Wheel
      const frontWheel = new THREE.Mesh(wheelGeo, silverTrimMat);
      frontWheel.position.set(tLen / 2, 0, 0);
      trackAssembly.add(frontWheel);

      // Rear Wheel
      const rearWheel = new THREE.Mesh(wheelGeo, silverTrimMat);
      rearWheel.position.set(-tLen / 2, 0, 0);
      trackAssembly.add(rearWheel);

      // Center Idler Wheels
      const idlerGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16);
      idlerGeo.rotateZ(Math.PI / 2);
      const idler1 = new THREE.Mesh(idlerGeo, silverTrimMat);
      idler1.position.set(-0.11, -0.04, 0);
      trackAssembly.add(idler1);

      const idler2 = new THREE.Mesh(idlerGeo, silverTrimMat);
      idler2.position.set(0.11, -0.04, 0);
      trackAssembly.add(idler2);

      // Wheel Hub Cap (Blue center badge)
      const hubGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16);
      hubGeo.rotateZ(Math.PI / 2);
      const hub1 = new THREE.Mesh(hubGeo, veloraBlueMat);
      hub1.position.set(tLen / 2, 0, side > 0 ? 0.17 : -0.17);
      trackAssembly.add(hub1);

      const hub2 = new THREE.Mesh(hubGeo, veloraBlueMat);
      hub2.position.set(-tLen / 2, 0, side > 0 ? 0.17 : -0.17);
      trackAssembly.add(hub2);

      return trackAssembly;
    };

    bodyGroup.add(createTrackedWheelAssembly(true));
    bodyGroup.add(createTrackedWheelAssembly(false));

    // --- CHASSIS BASE PLATFORM (Connecting Left and Right Tracks) ---
    const chassisGeo = new THREE.BoxGeometry(1.25, 0.14, 0.72);
    const chassis = new THREE.Mesh(chassisGeo, silverTrimMat);
    chassis.position.set(0, -0.64, 0);
    bodyGroup.add(chassis);

    // --- MAIN BODY / TORSO ---
    // Sculpted aerodynamic white robotic torso
    const torsoShape = createRoundedRectShape(0.92, 0.76, 0.24);
    const torsoGeo = new THREE.ExtrudeGeometry(torsoShape, {
      depth: 0.62,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    const torso = new THREE.Mesh(torsoGeo, whiteArmorMat);
    torso.position.set(0, -0.28, -0.31);
    torso.castShadow = true;
    torso.receiveShadow = true;
    bodyGroup.add(torso);

    // Torso Side Accent Insets (Blue & Green)
    const sideBarGeo = new THREE.BoxGeometry(0.04, 0.44, 0.48);
    const leftSideBar = new THREE.Mesh(sideBarGeo, veloraBlueMat);
    leftSideBar.position.set(-0.48, -0.28, 0);
    bodyGroup.add(leftSideBar);

    const rightSideBar = new THREE.Mesh(sideBarGeo, emeraldGreenMat);
    rightSideBar.position.set(0.48, -0.28, 0);
    bodyGroup.add(rightSideBar);

    // --- CHEST DISPLAY ---
    // Outer Bezel for chest display
    const chestBezelShape = createRoundedRectShape(0.64, 0.36, 0.1);
    const chestBezelGeo = new THREE.ExtrudeGeometry(chestBezelShape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    const chestBezel = new THREE.Mesh(chestBezelGeo, silverTrimMat);
    chestBezel.position.set(0, -0.22, 0.33);
    bodyGroup.add(chestBezel);

    // Glossy Dark Chest Screen
    const chestScreenShape = createRoundedRectShape(0.58, 0.30, 0.08);
    const chestScreenGeo = new THREE.ExtrudeGeometry(chestScreenShape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
    const chestScreen = new THREE.Mesh(chestScreenGeo, darkDisplayMat);
    chestScreen.position.set(0, -0.22, 0.355);
    bodyGroup.add(chestScreen);

    // Chest Screen Animated Glowing Tech Graphics
    const chestHUDGroup = new THREE.Group();
    chestHUDGroup.position.set(0, -0.22, 0.375);
    bodyGroup.add(chestHUDGroup);

    // Glowing Circular Core in chest
    const chestCoreRingGeo = new THREE.RingGeometry(0.05, 0.075, 24);
    const chestCoreRing = new THREE.Mesh(chestCoreRingGeo, cyanGlowMat);
    chestCoreRing.position.set(-0.16, 0, 0);
    chestHUDGroup.add(chestCoreRing);

    const chestCoreDotGeo = new THREE.CircleGeometry(0.032, 20);
    const chestCoreDot = new THREE.Mesh(chestCoreDotGeo, greenGlowMat);
    chestCoreDot.position.set(-0.16, 0, 0.001);
    chestHUDGroup.add(chestCoreDot);

    // Energy / Code Lines on Chest Display
    const createHUDBar = (yOff: number, width: number, isGreen: boolean) => {
      const barGeo = new THREE.PlaneGeometry(width, 0.02);
      const barMesh = new THREE.Mesh(
        barGeo,
        isGreen ? greenGlowMat : cyanGlowMat
      );
      barMesh.position.set(0.08, yOff, 0);
      return barMesh;
    };
    chestHUDGroup.add(createHUDBar(0.06, 0.28, false));
    chestHUDGroup.add(createHUDBar(0.01, 0.22, true));
    chestHUDGroup.add(createHUDBar(-0.04, 0.26, false));

    // --- ARTICULATED ROBOTIC ARMS & HANDS ---
    // RIGHT ARM (Resting forward naturally)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.52, -0.15, 0);
    bodyGroup.add(rightArmGroup);

    // Right Shoulder gimbal
    const rightShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 20, 20),
      veloraBlueMat
    );
    rightArmGroup.add(rightShoulder);

    // Right Upper Arm
    const rUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.06, 0.3, 16),
      whiteArmorMat
    );
    rUpperArm.position.set(0.1, -0.14, 0.08);
    rUpperArm.rotation.x = Math.PI / 5;
    rUpperArm.rotation.z = -0.2;
    rightArmGroup.add(rUpperArm);

    // Right Elbow
    const rElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 16, 16),
      silverTrimMat
    );
    rElbow.position.set(0.14, -0.26, 0.18);
    rightArmGroup.add(rElbow);

    // Right Forearm
    const rForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.05, 0.28, 16),
      whiteArmorMat
    );
    rForearm.position.set(0.16, -0.34, 0.32);
    rForearm.rotation.x = Math.PI / 2.8;
    rightArmGroup.add(rForearm);

    // Right Hand
    const rHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 16, 16),
      silverTrimMat
    );
    rHand.scale.set(1.0, 0.8, 1.2);
    rHand.position.set(0.17, -0.38, 0.46);
    rightArmGroup.add(rHand);

    // LEFT ARM (Raised up holding the Code Icon)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.52, -0.15, 0);
    bodyGroup.add(leftArmGroup);

    // Left Shoulder gimbal
    const leftShoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 20, 20),
      emeraldGreenMat
    );
    leftArmGroup.add(leftShoulder);

    // Left Upper Arm (Angled upward and forward)
    const lUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.06, 0.3, 16),
      whiteArmorMat
    );
    lUpperArm.position.set(-0.12, 0.04, 0.14);
    lUpperArm.rotation.x = -Math.PI / 6;
    lUpperArm.rotation.z = 0.55;
    leftArmGroup.add(lUpperArm);

    // Left Elbow
    const lElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 16, 16),
      silverTrimMat
    );
    lElbow.position.set(-0.22, 0.16, 0.24);
    leftArmGroup.add(lElbow);

    // Left Forearm (Reaching forward to hold code icon)
    const lForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.055, 0.3, 16),
      whiteArmorMat
    );
    lForearm.position.set(-0.16, 0.24, 0.42);
    lForearm.rotation.x = Math.PI / 3;
    lForearm.rotation.y = -0.35;
    lForearm.rotation.z = 0.35;
    leftArmGroup.add(lForearm);

    // Left Hand (Cupped underneath code icon)
    const lHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      silverTrimMat
    );
    lHand.scale.set(1.2, 0.8, 1.2);
    lHand.position.set(-0.12, 0.28, 0.56);
    leftArmGroup.add(lHand);

    // --------------------------------------------------------------
    // 4B. CODE ICON GROUP (Held in Left Hand)
    // --------------------------------------------------------------
    const codeIconGroup = new THREE.Group();
    codeIconGroup.position.set(-0.64, 0.24, 0.62);
    robotGroup.add(codeIconGroup);

    // Holographic Badge Backing (Translucent rounded diamond)
    const badgeShape = createRoundedRectShape(0.42, 0.42, 0.12);
    const badgeGeo = new THREE.ShapeGeometry(badgeShape);
    const badgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x001d3d,
      emissive: 0x003566,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.rotation.z = Math.PI / 4;
    codeIconGroup.add(badgeMesh);

    // Glowing Cyan-Green Outer Ring
    const badgeRingGeo = new THREE.TorusGeometry(0.24, 0.015, 16, 32);
    const badgeRing = new THREE.Mesh(badgeRingGeo, cyanGlowMat);
    codeIconGroup.add(badgeRing);

    // 3D Programming Symbol: Left Bracket `<`
    const lBracketCurve = new THREE.CurvePath<THREE.Vector3>();
    lBracketCurve.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-0.06, 0.08, 0.015),
        new THREE.Vector3(-0.14, 0, 0.015)
      )
    );
    lBracketCurve.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-0.14, 0, 0.015),
        new THREE.Vector3(-0.06, -0.08, 0.015)
      )
    );
    const lBracketGeo = new THREE.TubeGeometry(lBracketCurve, 16, 0.016, 8, false);
    const lBracketMesh = new THREE.Mesh(lBracketGeo, cyanGlowMat);
    codeIconGroup.add(lBracketMesh);

    // 3D Programming Symbol: Center Slash `/`
    const slashCurve = new THREE.LineCurve3(
      new THREE.Vector3(-0.02, -0.09, 0.015),
      new THREE.Vector3(0.02, 0.09, 0.015)
    );
    const slashGeo = new THREE.TubeGeometry(slashCurve, 12, 0.016, 8, false);
    const slashMesh = new THREE.Mesh(slashGeo, greenGlowMat);
    codeIconGroup.add(slashMesh);

    // 3D Programming Symbol: Right Bracket `>`
    const rBracketCurve = new THREE.CurvePath<THREE.Vector3>();
    rBracketCurve.add(
      new THREE.LineCurve3(
        new THREE.Vector3(0.06, 0.08, 0.015),
        new THREE.Vector3(0.14, 0, 0.015)
      )
    );
    rBracketCurve.add(
      new THREE.LineCurve3(
        new THREE.Vector3(0.14, 0, 0.015),
        new THREE.Vector3(0.06, -0.08, 0.015)
      )
    );
    const rBracketGeo = new THREE.TubeGeometry(rBracketCurve, 16, 0.016, 8, false);
    const rBracketMesh = new THREE.Mesh(rBracketGeo, cyanGlowMat);
    codeIconGroup.add(rBracketMesh);

    // Real-Time Neon Light from Code Icon
    const codePointLight = new THREE.PointLight(0x00f0ff, 1.2, 1.5);
    codePointLight.position.set(0, 0, 0.15);
    codeIconGroup.add(codePointLight);

    // --------------------------------------------------------------
    // 4C. HEAD GROUP (With Neck Pivot for Cursor Following)
    // --------------------------------------------------------------
    // Neck Articulated Gimbal Ring
    const neckRingGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.14, 32);
    const neckRing = new THREE.Mesh(neckRingGeo, silverTrimMat);
    neckRing.position.set(0, 0.18, 0);
    bodyGroup.add(neckRing);

    const neckFiberGeo = new THREE.TorusGeometry(0.26, 0.018, 16, 32);
    const neckFiber = new THREE.Mesh(neckFiberGeo, cyanGlowMat);
    neckFiber.rotation.x = Math.PI / 2;
    neckFiber.position.set(0, 0.18, 0);
    bodyGroup.add(neckFiber);

    // CRITICAL: The HeadGroup's pivot point is strictly positioned at the neck!
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.26, 0.0);
    robotGroup.add(headPivot);

    const headGroup = new THREE.Group();
    headPivot.add(headGroup);

    // --- RECTANGULAR ROUNDED ROBOTIC HEAD SHELL ---
    // Large rectangular rounded robotic head
    const headShape = createRoundedRectShape(1.24, 0.86, 0.32);
    const headShellGeo = new THREE.ExtrudeGeometry(headShape, {
      depth: 0.76,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    const headShell = new THREE.Mesh(headShellGeo, whiteArmorMat);
    headShell.position.set(0, 0.44, -0.38);
    headShell.castShadow = true;
    headShell.receiveShadow = true;
    headGroup.add(headShell);

    // Top Head Antenna / Sensor Array
    const antennaStemGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.14, 16);
    const antennaStem = new THREE.Mesh(antennaStemGeo, silverTrimMat);
    antennaStem.position.set(0, 0.94, 0);
    headGroup.add(antennaStem);

    const antennaBeaconGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const antennaBeacon = new THREE.Mesh(antennaBeaconGeo, cyanGlowMat);
    antennaBeacon.position.set(0, 1.02, 0);
    headGroup.add(antennaBeacon);

    // --- GLOSSY DARK BLUE/BLACK FACE DISPLAY ---
    // Outer Face Bezel
    const faceBezelShape = createRoundedRectShape(1.08, 0.68, 0.24);
    const faceBezelGeo = new THREE.ExtrudeGeometry(faceBezelShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    const faceBezel = new THREE.Mesh(faceBezelGeo, silverTrimMat);
    faceBezel.position.set(0, 0.44, 0.41);
    headGroup.add(faceBezel);

    // Glossy Dark Face Display Screen (Deep obsidian/navy glass)
    const faceScreenShape = createRoundedRectShape(1.02, 0.62, 0.22);
    const faceScreenGeo = new THREE.ExtrudeGeometry(faceScreenShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    const faceDisplay = new THREE.Mesh(faceScreenGeo, darkDisplayMat);
    faceDisplay.position.set(0, 0.44, 0.445);
    headGroup.add(faceDisplay);

    // Subtle Glass Reflection Sheen across Visor
    const sheenShape = new THREE.Shape();
    sheenShape.moveTo(-0.45, -0.25);
    sheenShape.lineTo(-0.2, -0.25);
    sheenShape.lineTo(0.35, 0.25);
    sheenShape.lineTo(0.1, 0.25);
    sheenShape.closePath();
    const sheenGeo = new THREE.ShapeGeometry(sheenShape);
    const sheenMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const sheenMesh = new THREE.Mesh(sheenGeo, sheenMat);
    sheenMesh.position.set(0, 0.44, 0.47);
    headGroup.add(sheenMesh);

    // --- TWO LARGE EXPRESSIVE GLOWING BLUE EYES ---
    const leftEyeGroup = new THREE.Group();
    const rightEyeGroup = new THREE.Group();

    // Eye Core Mesh (smooth rounded capsule LED style)
    const eyeCoreGeo = new THREE.CapsuleGeometry(0.075, 0.14, 16, 24);
    eyeCoreGeo.scale(1.0, 1.0, 0.3);

    // Eye Outer Neon Glow Halo
    const eyeGlowGeo = new THREE.CapsuleGeometry(0.1, 0.17, 16, 24);
    eyeGlowGeo.scale(1.0, 1.0, 0.2);
    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });

    // Left Eye Assembly
    const leftEyeMesh = new THREE.Mesh(eyeCoreGeo, cyanGlowMat);
    const leftEyeGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
    leftEyeGlow.position.z = -0.01;
    leftEyeGroup.add(leftEyeGlow);
    leftEyeGroup.add(leftEyeMesh);

    // Pupil Specular Catchlight
    const pupilGeo = new THREE.CircleGeometry(0.026, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.018, 0.05, 0.035);
    leftEyeGroup.add(leftPupil);

    leftEyeGroup.position.set(-0.24, 0.44, 0.475);
    leftEyeGroup.rotation.z = -0.05; // Friendly slight outward angle
    headGroup.add(leftEyeGroup);

    // Right Eye Assembly
    const rightEyeMesh = new THREE.Mesh(eyeCoreGeo, cyanGlowMat);
    const rightEyeGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
    rightEyeGlow.position.z = -0.01;
    rightEyeGroup.add(rightEyeGlow);
    rightEyeGroup.add(rightEyeMesh);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(-0.018, 0.05, 0.035);
    rightEyeGroup.add(rightPupil);

    rightEyeGroup.position.set(0.24, 0.44, 0.475);
    rightEyeGroup.rotation.z = 0.05; // Friendly slight outward angle
    headGroup.add(rightEyeGroup);

    // Soft Blue Neon Point Light in front of Eyes
    const eyePointLight = new THREE.PointLight(0x00f0ff, 1.8, 1.8);
    eyePointLight.position.set(0, 0.44, 0.65);
    headGroup.add(eyePointLight);

    // --- BLUE SIDE HEADPHONE COMPONENTS ---
    const createHeadphone = (isLeft: boolean) => {
      const hpGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;

      // Outer cup cylinder
      const cupGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.12, 32);
      cupGeo.rotateZ(Math.PI / 2);
      const cup = new THREE.Mesh(cupGeo, veloraBlueMat);
      cup.position.set(side * 0.72, 0.44, 0.0);
      cup.castShadow = true;
      hpGroup.add(cup);

      // Inner silver ring
      const ringGeo = new THREE.TorusGeometry(0.18, 0.02, 16, 32);
      ringGeo.rotateY(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, silverTrimMat);
      ring.position.set(side * 0.785, 0.44, 0.0);
      hpGroup.add(ring);

      // Cyan / Green illuminated center circle
      const ledDiscGeo = new THREE.CircleGeometry(0.12, 24);
      ledDiscGeo.rotateY(side > 0 ? -Math.PI / 2 : Math.PI / 2);
      const ledDisc = new THREE.Mesh(
        ledDiscGeo,
        isLeft ? cyanGlowMat : greenGlowMat
      );
      ledDisc.position.set(side * 0.79, 0.44, 0.0);
      hpGroup.add(ledDisc);

      return hpGroup;
    };

    headGroup.add(createHeadphone(true));
    headGroup.add(createHeadphone(false));

    // Headphone connecting arch band across top of head
    const archGeo = new THREE.TorusGeometry(0.74, 0.035, 16, 48, Math.PI);
    const arch = new THREE.Mesh(archGeo, veloraBlueMat);
    arch.position.set(0, 0.46, 0);
    arch.rotation.z = Math.PI;
    headGroup.add(arch);

    // --- SOFT FLOOR SHADOW ---
    const floorShadowGeo = new THREE.PlaneGeometry(2.6, 1.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 71, 186, 0.35)');
      grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.2)');
      grad.addColorStop(0.75, 'rgba(15, 23, 42, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const floorShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const floorShadow = new THREE.Mesh(floorShadowGeo, floorShadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.set(0, -0.92, 0.1);
    scene.add(floorShadow);

    // ==============================================================
    // 5. INTERACTIVE FULL-HEAD CURSOR TRACKING & ANIMATIONS
    // ==============================================================
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let lastMouseMoveTime = performance.now();

    // Mouse Movement Handler
    const onMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime = performance.now();

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized cursor coordinates (-1 to +1)
      const maxDistanceX = window.innerWidth / 1.3;
      const maxDistanceY = window.innerHeight / 1.3;

      const normX = (e.clientX - centerX) / maxDistanceX;
      const normY = (e.clientY - centerY) / maxDistanceY;

      // Realistic full-head rotation limits:
      // Yaw (Left/Right): ±32 degrees (0.55 rad)
      // Pitch (Up/Down): ±22 degrees (0.38 rad)
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      targetRotation.y = clampedX * 0.55; // Complete Head turns Left/Right
      targetRotation.x = clampedY * 0.38; // Complete Head tilts Up/Down
    };

    // Touch Support for Mobile & Tablets
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseMoveTime = performance.now();
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normX = (touch.clientX - centerX) / (window.innerWidth / 1.2);
        const normY = (touch.clientY - centerY) / (window.innerHeight / 1.2);

        targetRotation.y = Math.max(-1, Math.min(1, normX)) * 0.55;
        targetRotation.x = Math.max(-1, Math.min(1, normY)) * 0.38;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Blink State
    let blinkStartTime = 0;
    let isBlinking = false;
    let nextBlinkTime = performance.now() + 3000 + Math.random() * 2500;

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const now = performance.now();

      // Idle behavior: if mouse is inactive for 2.2s, gently look around with friendly curiosity
      if (now - lastMouseMoveTime > 2200) {
        targetRotation.y = Math.sin(elapsed * 0.8) * 0.25;
        targetRotation.x = Math.cos(elapsed * 0.6) * 0.12;
      }

      // Smooth HeadGroup rotation interpolation (lerp)
      currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRotation.y, 0.08);
      currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRotation.x, 0.08);

      // FULL HEADGROUP MOVEMENT AROUND NECK PIVOT:
      // The head shell, face display, both glowing eyes and headphones ALL move together!
      headGroup.rotation.y = currentRotation.y;
      headGroup.rotation.x = currentRotation.x;
      headGroup.rotation.z = -currentRotation.y * 0.1; // Natural subtle neck roll tilt

      // Body and Tracks remain stationary, with only a subtle micro-stabilization breathing
      bodyGroup.rotation.y = currentRotation.y * 0.08;
      bodyGroup.rotation.x = currentRotation.x * 0.04;

      // Subtle breathing / suspension floating motion (sine wave)
      const suspensionOffset = Math.sin(elapsed * 1.6) * 0.025;
      torso.position.y = -0.28 + suspensionOffset;

      // Code Icon subtle floating rotation and pulse
      codeIconGroup.position.y = 0.24 + Math.sin(elapsed * 2.2) * 0.035;
      codeIconGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.08;
      codeIconGroup.rotation.y = Math.sin(elapsed * 1.8) * 0.12;

      // Eye blinking animation
      if (now > nextBlinkTime && !isBlinking) {
        isBlinking = true;
        blinkStartTime = now;
      }

      if (isBlinking) {
        const blinkProgress = (now - blinkStartTime) / 130; // 130ms quick natural blink
        if (blinkProgress >= 1) {
          isBlinking = false;
          leftEyeGroup.scale.y = 1;
          rightEyeGroup.scale.y = 1;
          const doubleBlink = Math.random() < 0.25;
          nextBlinkTime = now + (doubleBlink ? 180 : 3500 + Math.random() * 2500);
        } else {
          const eyeScale = Math.max(
            0.08,
            Math.sin(blinkProgress * Math.PI * 2 + Math.PI / 2) * 0.46 + 0.54
          );
          leftEyeGroup.scale.y = eyeScale;
          rightEyeGroup.scale.y = eyeScale;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==============================================================
    // 6. RESIZE OBSERVER
    // ==============================================================
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 520;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ==============================================================
    // 7. CLEANUP
    // ==============================================================
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

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
