'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface ProjectItem {
  id: string;
  title: string;
  category: 'robotics' | 'ai' | 'iot';
  categoryLabel: string;
  badgeColor: 'blue' | 'emerald';
  gradeRange: string;
  description: string;
  skillsLearned: string[];
  hardwareRequirements: string[];
  prototypeStatus: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 'mars-rover',
    title: 'Mars Mission Rover',
    category: 'robotics',
    categoryLabel: 'Robotics & Mobility',
    badgeColor: 'blue',
    gradeRange: 'Grades 6 to 10',
    description: 'An all-terrain multi-wheel robotic vehicle equipped with ultrasonic obstacle avoidance, planetary terrain suspension, and wireless Bluetooth telemetry navigation.',
    skillsLearned: [
      'Chassis mechanics & rocker-bogie kinematics',
      'Motor driver pulse-width modulation (PWM)',
      'Ultrasonic sensory distance calculation',
      'Wireless telemetry & directional motor control',
    ],
    hardwareRequirements: [
      'Arduino Uno or ESP32 Microcontroller',
      '4x DC Geared Motors with high-traction wheels',
      'L298N Dual H-Bridge Motor Driver',
      'HC-SR04 Ultrasonic Distance Sensor',
      'Bluetooth / RF Wireless Transceiver module',
      'Rechargeable 7.4V Li-ion Battery pack',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
  {
    id: 'ai-waste-sorting',
    title: 'AI Waste Sorting System',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    badgeColor: 'emerald',
    gradeRange: 'Grades 7 to 12',
    description: 'An automated eco-sorter that uses edge computer vision and a servo-actuated divert flap to classify recyclable, organic, and hazardous waste in real time.',
    skillsLearned: [
      'Image classification & machine learning models',
      'Python programming & camera feed interfacing',
      'Servo motor angle control for sorting flaps',
      'Environmental sustainability systems engineering',
    ],
    hardwareRequirements: [
      'Raspberry Pi 4 or ESP32-CAM module',
      'High-resolution USB / Ribbon Camera',
      'High-torque Micro Servos (SG90 / MG996R)',
      'Dual-compartment sorting chute assembly',
      'Status OLED display / LED indicator rings',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
  {
    id: 'smart-home-automation',
    title: 'Smart Home Automation System',
    category: 'iot',
    categoryLabel: 'IoT & Smart Systems',
    badgeColor: 'blue',
    gradeRange: 'Grades 5 to 9',
    description: 'A miniature smart dwelling featuring automated ambient lighting, climate control fans, smart security alarms, and mobile dashboard integration.',
    skillsLearned: [
      'Relay switching & safe low-voltage appliance control',
      'Analog-to-digital sensor conversion (LDR & DHT11)',
      'Wi-Fi cloud connectivity (MQTT / Blynk)',
      'Event-driven threshold automation logic',
    ],
    hardwareRequirements: [
      'ESP8266 or ESP32 Wi-Fi Microcontroller',
      'DHT11 Temperature & Humidity Sensor',
      'LDR Light-Dependent Resistor',
      'PIR Passive Infrared Motion Sensor',
      '4-Channel 5V Relay Module & 5V Mini Fans',
      'Miniature architectural model house frame',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
  {
    id: 'smart-irrigation',
    title: 'Smart Irrigation & Agriculture',
    category: 'iot',
    categoryLabel: 'IoT & Smart Systems',
    badgeColor: 'emerald',
    gradeRange: 'Grades 6 to 10',
    description: 'A precision agriculture system that monitors soil moisture levels and automatically triggers water pump relays only when required, preventing resource wastage.',
    skillsLearned: [
      'Soil moisture resistive/capacitive sensing',
      'Water pump relay actuation & fluid dynamics',
      'Resource conservation telemetry',
      'Real-time LCD display status reporting',
    ],
    hardwareRequirements: [
      'Arduino Nano or Uno board',
      'Capacitive / Resistive Soil Moisture Probe',
      'Submersible 5V Mini DC Water Pump',
      'Silicone tubing & single-channel relay module',
      '16x2 I2C Character LCD Display',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
  {
    id: 'ai-vision-projects',
    title: 'AI Vision & Gesture Recognition',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    badgeColor: 'blue',
    gradeRange: 'Grades 8 to 12',
    description: 'Interactive computer vision system that tracks hand landmarks and facial contours to control virtual interfaces and robotic physical outputs without touching a screen.',
    skillsLearned: [
      'OpenCV image processing & frame matrix mathematics',
      'Hand landmark detection & coordinate tracking',
      'Real-time gesture-to-command translation',
      'Human-computer interaction (HCI) fundamentals',
    ],
    hardwareRequirements: [
      'Laptop or Single Board Computer (Raspberry Pi)',
      'HD Web Camera (720p or 1080p)',
      'Python 3 runtime with OpenCV and MediaPipe',
      'Optional Arduino link for physical gesture-servo control',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
  {
    id: 'smart-city-models',
    title: 'Smart City Infrastructure Model',
    category: 'robotics',
    categoryLabel: 'Robotics & Automation',
    badgeColor: 'emerald',
    gradeRange: 'Grades 7 to 12',
    description: 'An interactive urban grid model demonstrating adaptive traffic lights, automated emergency vehicle priority lanes, smart street lighting, and parking telemetry.',
    skillsLearned: [
      'Multi-sensor urban synchronization',
      'State machine programming for traffic cycles',
      'Ultrasonic parking occupancy monitoring',
      'Macro-level systems thinking & civic engineering',
    ],
    hardwareRequirements: [
      'Multi-node Arduino / ESP32 network',
      'LED Traffic Light modules (Red/Yellow/Green)',
      'IR Proximity Sensors for road occupancy detection',
      'Servo barrier gates for automated toll/parking',
      'Scale model architectural road & building layout',
    ],
    prototypeStatus: 'Curriculum Prototype Model',
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'robotics' | 'ai' | 'iot'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col w-full flex-1 velora-tech-dotted-bg">
      {/* Hero Section */}
      <section className="w-full bg-white border-b border-slate-200/70 pt-10 pb-10 sm:pt-14 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Student Project Prototypes &amp; Models
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Explore authentic student curriculum models engineered in Velora Future Labs—
                <br className="hidden sm:inline" /> from autonomous Mars Rovers to AI waste sorting and smart city automation grids.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                  Book a School Demo
                </Button>
                <Button href="/school-programs" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Explore Curriculum Pathways
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-12">
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${filter === 'all' ? 'bg-[#0047ba] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter('robotics')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${filter === 'robotics' ? 'bg-[#0047ba] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            Robotics &amp; Rovers
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${filter === 'ai' ? 'bg-[#16a34a] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            AI &amp; Computer Vision
          </button>
          <button
            onClick={() => setFilter('iot')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${filter === 'iot' ? 'bg-[#0047ba] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
          >
            IoT &amp; Automation
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isBlue = project.badgeColor === 'blue';
            return (
              <div
                key={project.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isBlue ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {project.gradeRange}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 mb-2.5 tracking-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Skills &amp; Concepts Learned:
                    </h4>
                    <ul className="space-y-1.5">
                      {project.skillsLearned.slice(0, 3).map((skill, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-400 italic">
                    {project.prototypeStatus}
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Hardware Specs</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Hardware Requirements & Full Specifications */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-lg"
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {selectedProject.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {selectedProject.gradeRange}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-950">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Required Hardware &amp; Components:
                  </h4>
                  <ul className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    {selectedProject.hardwareRequirements.map((hw, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{hw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    All Core Skills Developed:
                  </h4>
                  <ul className="space-y-1">
                    {selectedProject.skillsLearned.map((sk, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Button
                    href="/contact-us?purpose=demo"
                    variant="primary"
                    size="sm"
                    className="bg-[#0047ba] hover:bg-blue-700 text-white text-xs"
                  >
                    Request Demo for This Model
                  </Button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              See Student Projects in Action
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              We bring live working demonstration models—including the Mars Rover, AI vision kits, and automated irrigation circuits—directly to your school.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
                <Button href="/school-programs" variant="outline-dark" size="lg" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
                  View School Programs
                </Button>
              </div>
            </div>
          </section>
        </PageContainer>
    </div>
  );
}
