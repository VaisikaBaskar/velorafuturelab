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
    camera.position.set(0, 0.25, 4.6);
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
    // 2. STUDIO LIGHTING RIG
    // ==============================================================
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key Light (Main soft white light from top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light (Soft cool blue light from left)
    const fillLight = new THREE.DirectionalLight(0x70d6ff, 1.4);
    fillLight.position.set(-3.5, 2, 2.5);
    scene.add(fillLight);

    // Rim / Back Light (Vivid cyan-blue edge sheen)
    const rimLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Under-glow Bounce Light
    const bounceLight = new THREE.DirectionalLight(0x0047ba, 0.8);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // ==============================================================
    // 3. PBR MATERIALS
    // ==============================================================
    // White Ceramic Robot Armor (glossy, clean, subtle reflection)
    const whiteCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    // Metallic Silver Trim & Joints
    const silverMetalMat = new THREE.MeshStandardMaterial({
      color: 0xd8e2dc,
      roughness: 0.22,
      metalness: 0.85,
    });

    // Velora Tech Blue (Headphones, arm joints, details)
    const veloraBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0052cc,
      roughness: 0.25,
      metalness: 0.35,
    });

    // Black Glossy Face Display
    const blackVisorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050811,
      roughness: 0.1,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Glowing Cyan Eyes Material
    const cyanEyeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // Graduation Cap Navy Material
    const capNavyMat = new THREE.MeshStandardMaterial({
      color: 0x0c1427,
      roughness: 0.65,
      metalness: 0.15,
    });

    // Graduation Tassel Purple Material
    const tasselPurpleMat = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      roughness: 0.45,
      metalness: 0.2,
    });

    // Laptop Shell Dark Metal
    const laptopBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.28,
      metalness: 0.8,
    });

    // Laptop Glowing Screen Display
    const laptopScreenMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      emissive: 0x0047ba,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.1,
    });

    // ==============================================================
    // 4. HIERARCHICAL 3D MODEL ASSEMBLY
    // ==============================================================
    // Root Robot Object
    const robot = new THREE.Group();
    robot.position.y = -0.15;
    scene.add(robot);

    // --------------------------------------------------------------
    // 4A. BODY GROUP
    // --------------------------------------------------------------
    const bodyGroup = new THREE.Group();
    robot.add(bodyGroup);

    // Torso / Chest (rounded ergonomic white body)
    const torsoGeo = new THREE.SphereGeometry(0.58, 36, 32);
    torsoGeo.scale(1.0, 1.15, 0.9);
    const torso = new THREE.Mesh(torsoGeo, whiteCeramicMat);
    torso.position.set(0, -0.45, -0.05);
    torso.castShadow = true;
    torso.receiveShadow = true;
    bodyGroup.add(torso);

    // Chest Arc Reactor / Emblem (Glowing Cyan Velora Core)
    const arcRingGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32);
    const arcRing = new THREE.Mesh(arcRingGeo, veloraBlueMat);
    arcRing.position.set(0, -0.38, 0.43);
    bodyGroup.add(arcRing);

    const arcCoreGeo = new THREE.CircleGeometry(0.1, 32);
    const arcCoreMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const arcCore = new THREE.Mesh(arcCoreGeo, arcCoreMat);
    arcCore.position.set(0, -0.38, 0.435);
    bodyGroup.add(arcCore);

    // Neck Collar Base (Silver joint ring)
    const neckCollarGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.12, 32);
    const neckCollar = new THREE.Mesh(neckCollarGeo, silverMetalMat);
    neckCollar.position.set(0, 0.15, -0.02);
    bodyGroup.add(neckCollar);

    // Blue Neck Seam Ring
    const neckSeamGeo = new THREE.TorusGeometry(0.27, 0.02, 16, 32);
    const neckSeam = new THREE.Mesh(neckSeamGeo, veloraBlueMat);
    neckSeam.position.set(0, 0.15, -0.02);
    neckSeam.rotation.x = Math.PI / 2;
    bodyGroup.add(neckSeam);

    // Arms & Hands (positioned forward naturally typing on laptop)
    const createArm = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;

      // Shoulder gimbal sphere
      const shoulderGeo = new THREE.SphereGeometry(0.14, 24, 24);
      const shoulder = new THREE.Mesh(shoulderGeo, veloraBlueMat);
      shoulder.position.set(side * 0.58, -0.28, 0.0);
      armGroup.add(shoulder);

      // Upper arm
      const upperArmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.32, 20);
      const upperArm = new THREE.Mesh(upperArmGeo, whiteCeramicMat);
      upperArm.position.set(side * 0.65, -0.42, 0.12);
      upperArm.rotation.x = Math.PI / 4;
      upperArm.rotation.z = side * -0.25;
      armGroup.add(upperArm);

      // Elbow joint
      const elbowGeo = new THREE.SphereGeometry(0.09, 20, 20);
      const elbow = new THREE.Mesh(elbowGeo, silverMetalMat);
      elbow.position.set(side * 0.69, -0.54, 0.24);
      armGroup.add(elbow);

      // Forearm reaching forward to laptop
      const forearmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.34, 20);
      const forearm = new THREE.Mesh(forearmGeo, whiteCeramicMat);
      forearm.position.set(side * 0.52, -0.62, 0.44);
      forearm.rotation.x = Math.PI / 2.3;
      forearm.rotation.y = side * 0.35;
      forearm.rotation.z = side * -0.2;
      armGroup.add(forearm);

      // Hand resting on keyboard
      const handGeo = new THREE.SphereGeometry(0.09, 20, 16);
      handGeo.scale(1.0, 0.65, 1.2);
      const hand = new THREE.Mesh(handGeo, whiteCeramicMat);
      hand.position.set(side * 0.34, -0.68, 0.62);
      armGroup.add(hand);

      return armGroup;
    };

    bodyGroup.add(createArm(true));
    bodyGroup.add(createArm(false));

    // --------------------------------------------------------------
    // 4B. LAPTOP GROUP (In front of robot)
    // --------------------------------------------------------------
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.74, 0.62);
    robot.add(laptopGroup);

    // Laptop Base
    const laptopBaseGeo = new THREE.BoxGeometry(0.85, 0.03, 0.55);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBodyMat);
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Keyboard recess
    const keyboardGeo = new THREE.BoxGeometry(0.72, 0.005, 0.34);
    const keyboardMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.5 });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, 0.018, -0.04);
    laptopGroup.add(keyboard);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.24, 0.005, 0.12);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.4 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.018, 0.18);
    laptopGroup.add(trackpad);

    // Laptop Screen Lid (Open at ~115 degrees)
    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, 0.015, -0.27);
    screenPivot.rotation.x = -Math.PI / 7;
    laptopGroup.add(screenPivot);

    const lidGeo = new THREE.BoxGeometry(0.85, 0.54, 0.025);
    const lid = new THREE.Mesh(lidGeo, laptopBodyMat);
    lid.position.set(0, 0.27, 0);
    lid.castShadow = true;
    screenPivot.add(lid);

    // Screen bezel & display
    const screenDisplayGeo = new THREE.PlaneGeometry(0.78, 0.46);
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, laptopScreenMat);
    screenDisplay.position.set(0, 0.27, 0.014);
    screenPivot.add(screenDisplay);

    // Screen Tech Icon / Logo (Glowing small cyan robot logo on screen)
    const screenLogoGeo = new THREE.RingGeometry(0.04, 0.07, 32);
    const screenLogoMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const screenLogo = new THREE.Mesh(screenLogoGeo, screenLogoMat);
    screenLogo.position.set(0, 0.27, 0.016);
    screenPivot.add(screenLogo);

    // --------------------------------------------------------------
    // 4C. HEAD GROUP (With Neck Pivot)
    // --------------------------------------------------------------
    // CRITICAL: The HeadGroup's pivot point is strictly at the neck!
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.26, 0.0);
    robot.add(headPivot);

    const headGroup = new THREE.Group();
    headPivot.add(headGroup);

    // Head Shell: Large friendly rounded dome
    const headShellGeo = new THREE.SphereGeometry(0.72, 48, 36);
    headShellGeo.scale(1.08, 0.94, 1.0);
    const headShell = new THREE.Mesh(headShellGeo, whiteCeramicMat);
    headShell.position.set(0, 0.48, 0);
    headShell.castShadow = true;
    headShell.receiveShadow = true;
    headGroup.add(headShell);

    // --------------------------------------------------------------
    // 4C-1. LARGE ROUNDED RECTANGULAR BLACK GLOSSY DIGITAL FACE DISPLAY
    // --------------------------------------------------------------
    // Outer Rounded Rectangular Bezel Frame
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

    // Bezel Rim Mesh
    const bezelShape = createRoundedRectShape(1.12, 0.74, 0.28);
    const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    });
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x090f1d,
      metalness: 0.8,
      roughness: 0.25,
    });
    const faceBezel = new THREE.Mesh(bezelGeo, bezelMat);
    faceBezel.position.set(0, 0.46, 0.68);
    headGroup.add(faceBezel);

    // Inner Black Glossy Screen
    const screenShape = createRoundedRectShape(1.06, 0.68, 0.25);
    const screenGeo = new THREE.ExtrudeGeometry(screenShape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x020408,
      roughness: 0.04,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });
    const faceDisplay = new THREE.Mesh(screenGeo, screenMat);
    faceDisplay.position.set(0, 0.46, 0.73);
    faceDisplay.receiveShadow = true;
    headGroup.add(faceDisplay);

    // Diagonal Glass Specular Sheen Stripe across Visor
    const sheenShape = new THREE.Shape();
    sheenShape.moveTo(-0.45, -0.28);
    sheenShape.lineTo(-0.15, -0.28);
    sheenShape.lineTo(0.35, 0.28);
    sheenShape.lineTo(0.05, 0.28);
    sheenShape.closePath();
    const sheenGeo = new THREE.ShapeGeometry(sheenShape);
    const sheenMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const sheenMesh = new THREE.Mesh(sheenGeo, sheenMat);
    sheenMesh.position.set(0, 0.46, 0.765);
    headGroup.add(sheenMesh);

    // --------------------------------------------------------------
    // 4C-2. GLOWING CYAN / ELECTRIC-BLUE LED EYES
    // --------------------------------------------------------------
    const leftEyeGroup = new THREE.Group();
    const rightEyeGroup = new THREE.Group();

    // Eye Core Mesh (smooth curved capsule LED style)
    const eyeCoreGeo = new THREE.CapsuleGeometry(0.065, 0.13, 16, 24);
    eyeCoreGeo.scale(1.0, 1.0, 0.3);

    const eyeCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
    });

    // Eye Outer Neon Glow Halo
    const eyeGlowGeo = new THREE.CapsuleGeometry(0.09, 0.15, 16, 24);
    eyeGlowGeo.scale(1.0, 1.0, 0.2);
    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });

    // Left Eye Assembly
    const leftEyeMesh = new THREE.Mesh(eyeCoreGeo, eyeCoreMat);
    const leftEyeGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
    leftEyeGlow.position.z = -0.01;
    leftEyeGroup.add(leftEyeGlow);
    leftEyeGroup.add(leftEyeMesh);

    // Left Pupil Specular Catchlight
    const pupilGeo = new THREE.CircleGeometry(0.024, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.016, 0.045, 0.035);
    leftEyeGroup.add(leftPupil);

    leftEyeGroup.position.set(-0.21, 0.48, 0.77);
    leftEyeGroup.rotation.z = -0.06; // Cute friendly outward tilt
    headGroup.add(leftEyeGroup);

    // Right Eye Assembly
    const rightEyeMesh = new THREE.Mesh(eyeCoreGeo, eyeCoreMat);
    const rightEyeGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
    rightEyeGlow.position.z = -0.01;
    rightEyeGroup.add(rightEyeGlow);
    rightEyeGroup.add(rightEyeMesh);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(-0.016, 0.045, 0.035);
    rightEyeGroup.add(rightPupil);

    rightEyeGroup.position.set(0.21, 0.48, 0.77);
    rightEyeGroup.rotation.z = 0.06; // Cute friendly outward tilt
    headGroup.add(rightEyeGroup);

    // Soft Blue Neon Point Light (Casts real-time cyan reflection onto face display and rims)
    const eyePointLight = new THREE.PointLight(0x00f0ff, 1.6, 1.8);
    eyePointLight.position.set(0, 0.48, 0.95);
    headGroup.add(eyePointLight);

    // Blue Headphones (Left & Right Ear Pods)
    const createHeadphone = (isLeft: boolean) => {
      const hpGroup = new THREE.Group();
      const side = isLeft ? -1 : 1;

      // Outer cup cylinder
      const cupGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
      const cup = new THREE.Mesh(cupGeo, veloraBlueMat);
      cup.rotation.z = Math.PI / 2;
      cup.position.set(side * 0.78, 0.48, 0.0);
      cup.castShadow = true;
      hpGroup.add(cup);

      // Inner silver ring
      const ringGeo = new THREE.TorusGeometry(0.18, 0.02, 16, 32);
      const ring = new THREE.Mesh(ringGeo, silverMetalMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.set(side * 0.84, 0.48, 0.0);
      hpGroup.add(ring);

      // Cyan illuminated center circle
      const cyanDiscGeo = new THREE.CircleGeometry(0.12, 32);
      const cyanDiscMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const cyanDisc = new THREE.Mesh(cyanDiscGeo, cyanDiscMat);
      cyanDisc.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      cyanDisc.position.set(side * 0.845, 0.48, 0.0);
      hpGroup.add(cyanDisc);

      return hpGroup;
    };

    headGroup.add(createHeadphone(true));
    headGroup.add(createHeadphone(false));

    // Headphone connecting arch band across bottom of cap
    const archGeo = new THREE.TorusGeometry(0.72, 0.035, 16, 48, Math.PI);
    const arch = new THREE.Mesh(archGeo, veloraBlueMat);
    arch.position.set(0, 0.54, 0);
    arch.rotation.z = Math.PI;
    headGroup.add(arch);

    // --------------------------------------------------------------
    // 4D. GRADUATION CAP & PURPLE TASSEL
    // --------------------------------------------------------------
    const capGroup = new THREE.Group();
    capGroup.position.set(0, 1.14, -0.05);
    capGroup.rotation.x = -0.08;
    headGroup.add(capGroup);

    // Skull cap base ring fitting head curve
    const capBaseGeo = new THREE.CylinderGeometry(0.48, 0.54, 0.16, 32);
    const capBase = new THREE.Mesh(capBaseGeo, capNavyMat);
    capBase.position.y = -0.06;
    capGroup.add(capBase);

    // Flat Diamond Mortarboard
    const mortarboardGeo = new THREE.BoxGeometry(1.22, 0.035, 1.22);
    const mortarboard = new THREE.Mesh(mortarboardGeo, capNavyMat);
    mortarboard.rotation.y = Math.PI / 4;
    mortarboard.castShadow = true;
    mortarboard.receiveShadow = true;
    capGroup.add(mortarboard);

    // Center Gold/Navy Cap Button
    const capButtonGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.03, 20);
    const capButtonMat = new THREE.MeshStandardMaterial({
      color: 0x0047ba,
      metalness: 0.5,
      roughness: 0.3,
    });
    const capButton = new THREE.Mesh(capButtonGeo, capButtonMat);
    capButton.position.y = 0.03;
    capGroup.add(capButton);

    // Tassel Group
    const tasselGroup = new THREE.Group();
    tasselGroup.position.set(0, 0.03, 0);
    capGroup.add(tasselGroup);

    // Tassel Ribbon String (draping to side corner)
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.02, 0),
      new THREE.Vector3(0.35, 0.02, 0.35),
      new THREE.Vector3(0.55, -0.08, 0.55),
      new THREE.Vector3(0.58, -0.32, 0.58),
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 20, 0.012, 8, false);
    const ribbonMesh = new THREE.Mesh(ribbonGeo, tasselPurpleMat);
    tasselGroup.add(ribbonMesh);

    // Purple Hanging Tassel Fringe (cylinder/cone)
    const tasselFringeGeo = new THREE.ConeGeometry(0.05, 0.18, 16);
    tasselFringeGeo.rotateX(Math.PI);
    const tasselFringe = new THREE.Mesh(tasselFringeGeo, tasselPurpleMat);
    tasselFringe.position.set(0.58, -0.42, 0.58);
    tasselGroup.add(tasselFringe);

    // Soft Ambient Floor Shadow (Realistic contact shadow on ground)
    const floorShadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 71, 186, 0.32)');
      grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.18)');
      grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.04)');
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
    floorShadow.position.set(0, -0.88, 0.2);
    scene.add(floorShadow);

    // ==============================================================
    // 5. INTERACTIVE FULL HEAD MOUSE TRACKING & ANIMATION LOOP
    // ==============================================================
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let isMouseActive = false;
    let lastMouseMoveTime = performance.now();

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime = performance.now();
      isMouseActive = true;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized offset relative to mascot center (-1 to +1)
      const maxDistanceX = window.innerWidth / 1.3;
      const maxDistanceY = window.innerHeight / 1.3;

      const normX = (e.clientX - centerX) / maxDistanceX;
      const normY = (e.clientY - centerY) / maxDistanceY;

      // Realistic head rotation limits:
      // Yaw: ±30 degrees (0.52 radians)
      // Pitch: ±22 degrees (0.38 radians)
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      targetRotation.y = clampedX * 0.52; // Mouse Left/Right -> Head Yaw
      targetRotation.x = clampedY * 0.38; // Mouse Up/Down -> Head Pitch
    };

    // Touch support for tablets & mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseMoveTime = performance.now();
        isMouseActive = true;
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normX = (touch.clientX - centerX) / (window.innerWidth / 1.2);
        const normY = (touch.clientY - centerY) / (window.innerHeight / 1.2);

        targetRotation.y = Math.max(-1, Math.min(1, normX)) * 0.52;
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

      // Idle behavior: if mouse hasn't moved in 2.2 seconds, gently look around autonomously
      if (now - lastMouseMoveTime > 2200) {
        isMouseActive = false;
        targetRotation.y = Math.sin(elapsed * 0.8) * 0.24;
        targetRotation.x = Math.cos(elapsed * 0.6) * 0.12;
      }

      // Smooth HeadGroup rotation interpolation (lerp)
      currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRotation.y, 0.08);
      currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRotation.x, 0.08);

      // Rotate the complete HeadGroup assembly around its neck pivot!
      headGroup.rotation.y = currentRotation.y;
      headGroup.rotation.x = currentRotation.x;
      headGroup.rotation.z = -currentRotation.y * 0.12; // subtle natural neck roll tilt

      // Body stays relatively stationary, with subtle micro-reaction
      bodyGroup.rotation.y = currentRotation.y * 0.15;
      bodyGroup.rotation.x = currentRotation.x * 0.08;

      // Subtle body floating levitation (sine wave)
      const floatOffset = Math.sin(elapsed * 1.8) * 0.045;
      robot.position.y = -0.15 + floatOffset;

      // Subtle graduation tassel sway with head movement
      tasselGroup.rotation.z = Math.sin(elapsed * 2.2) * 0.06 - currentRotation.y * 0.35;
      tasselGroup.rotation.x = Math.cos(elapsed * 1.9) * 0.05 + currentRotation.x * 0.25;

      // Eye blinking animation
      if (now > nextBlinkTime && !isBlinking) {
        isBlinking = true;
        blinkStartTime = now;
      }

      if (isBlinking) {
        const blinkProgress = (now - blinkStartTime) / 140; // 140ms blink
        if (blinkProgress >= 1) {
          isBlinking = false;
          leftEyeGroup.scale.y = 1;
          rightEyeGroup.scale.y = 1;
          // Schedule next blink in 3.5 - 6.0 seconds (with 25% chance of quick double-blink)
          const doubleBlink = Math.random() < 0.25;
          nextBlinkTime = now + (doubleBlink ? 200 : 3500 + Math.random() * 2500);
        } else {
          // Smooth squash down and open
          const eyeScale = Math.max(0.08, Math.sin(blinkProgress * Math.PI * 2 + Math.PI / 2) * 0.46 + 0.54);
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
      aria-label="Interactive 3D Robot Mascot"
      role="img"
    />
  );
}
