import { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Robotics & Emerging Technologies | Velora Future Lab',
  description: 'Hands-on training in robotics, sensors, Arduino, IoT smart systems, block-coding, Python, and machine learning.',
};

export default function RoboticsTechnologiesPage() {
  const learningModules = [
    {
      title: 'Electronics & Circuit Design',
      desc: 'Understanding voltage, current, breadboarding, resistors, capacitors, transistors, and integrated motor drivers.',
      icon: '⚡',
    },
    {
      title: 'Microcontrollers & Architecture',
      desc: 'Hands-on programming with Arduino, ESP32, and micro:bit boards. Controlling inputs, pulse-width modulation (PWM), and serial communication.',
      icon: '🤖',
    },
    {
      title: 'Sensors & Automation Systems',
      desc: 'Interfacing ultrasonic distance sensors, infrared line trackers, PIR motion detectors, DHT temperature & humidity sensors, and light-dependent resistors.',
      icon: '📡',
    },
    {
      title: 'IoT & Smart Connected Devices',
      desc: 'Sending telemetry to cloud dashboards over Wi-Fi and Bluetooth, triggering smart alerts, and automating real-time mechanisms.',
      icon: '🌐',
    },
    {
      title: 'Python & Algorithm Logic',
      desc: 'Progressing from visual blocks to text-based Python: data structures, loops, functions, and algorithmic decision trees.',
      icon: '💻',
    },
    {
      title: 'AI & Computer Vision Essentials',
      desc: 'Introductory machine learning models, object detection, color tracking, and smart recognition logic for autonomous rovers.',
      icon: '🧠',
    },
  ];

  const outcomes = [
    'Deep practical understanding of physical electronics and circuit troubleshooting',
    'Fluency in microcontroller programming (C++ / Arduino IDE / Python)',
    'Experience architecting multi-sensor feedback loops and automated mechanical systems',
    'Confidence in algorithmic thinking, computational decomposition, and debugging',
    'Demonstrable capstone prototypes for academic portfolios and STEM fairs',
  ];

  return (
    <div className="flex flex-col w-full flex-1">
      {/* Header Banner */}
      <section className="w-full bg-gradient-to-b from-slate-50 via-blue-50/20 to-white border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Robotics &amp; Emerging Technologies
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Equipping young innovators with hands-on mastery in robotics, microcontrollers, sensor-driven automation, IoT, and artificial intelligence.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/projects" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Explore Project Models
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-16">
        {/* What Students Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              From Component Breadboards to Autonomous Machines
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              In this program, theoretical physics and mathematics transform into tangible physical reality. Students do not just read about electrical currents or algorithmic logic—they wire circuits, write code, observe real motor torque, and debug sensor readings.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Every student progresses through guided laboratory experiments into open-ended engineering design, building self-navigating rovers, smart home environmental hubs, and automated robotic arms.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/20 p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">Hardware &amp; Tool Ecosystem</h3>
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Microcontrollers</span>
                <span className="text-slate-600">Arduino Uno, ESP32 Wi-Fi/BT, micro:bit</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Sensors</span>
                <span className="text-slate-600">Ultrasonic, IR, PIR, DHT11, Light/LDR, Gas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Actuators</span>
                <span className="text-slate-600">DC Geared Motors, Servo Motors, Steppers</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-slate-900 block mb-1">Software Stacks</span>
                <span className="text-slate-600">Block Coding, Arduino IDE, Python, OpenCV</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="space-y-8">
          <div className="text-left max-w-none space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight sm:whitespace-nowrap">
              Technologies &amp; Core Learning Areas
            </h2>
            <p className="text-slate-600 text-base max-w-none sm:whitespace-nowrap">
              A comprehensive curriculum structured to develop full-stack hardware and software capability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules.map((mod, idx) => (
              <Card key={idx} hover className="border-slate-200/80">
                <CardHeader>
                  <div className="text-3xl mb-3">{mod.icon}</div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {mod.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Skills &amp; Learning Outcomes
              </h2>
            </div>

            <ul className="space-y-3 pt-4">
              {outcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bring Robotics &amp; Emerging Tech to Your Campus
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Let your students build Mars Rovers, smart home automation, and AI models. Request a customized curriculum roadmap and school demonstration.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/our-services" variant="outline-dark" size="lg" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
                View All Services
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
