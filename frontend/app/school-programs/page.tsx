import { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import StandardsCardsWrapper from '@/components/sections/StandardsCardsWrapper';
import PathwayCardsWrapper from '@/components/sections/PathwayCardsWrapper';

export const metadata: Metadata = {
  title: 'School Programs | Velora Future Lab',
  description: 'Curriculum-aligned robotics, STEAM education, grade-wise learning pathways, and NEP-oriented hands-on programs for schools.',
};

export default function SchoolProgramsPage() {
  const pathways = [
    {
      level: 'Grades KG – 3',
      title: 'Foundational Discovery',
      badge: 'Early Explorers',
      accentColor: 'blue',
      description: 'Tactile building, simple machines, patterns, and intuitive computational thinking through play and discovery.',
      focus: ['Tactile Mechanics & Gears', 'Intuitive Logic & Patterns', 'Sensory Problem Solving', 'Creative Construction'],
      outcomes: 'Develops motor skills, logical order comprehension, and uninhibited creative curiosity.',
    },
    {
      level: 'Grades 4 – 6',
      title: 'Block Coding & Sensor Robotics',
      badge: 'Junior Makers',
      accentColor: 'emerald',
      description: 'Introduction to block-based programming, electronic breadboards, input/output sensors, and interactive robots.',
      focus: ['Scratch & Block Logic', 'Basic Sensor Integration (IR, Ultrasonic)', 'Motorized Chassis Building', 'Introductory Microcontrollers'],
      outcomes: 'Understands cause-and-effect algorithms, loops, conditionals, and responsive mechanical systems.',
    },
    {
      level: 'Grades 7 – 9',
      title: 'Applied Engineering & IoT',
      badge: 'Emerging Innovators',
      accentColor: 'blue',
      description: 'Transitioning to text-based coding (Python & C++), Arduino circuitry, Internet of Things (IoT), and smart home automation.',
      focus: ['Python & C++ Embedded Code', 'Arduino & ESP32 Microcontrollers', 'Wireless IoT & Sensor Telemetry', 'Circuit Schematics & Soldering Safety'],
      outcomes: 'Builds autonomous machines, reads datasheets, and crafts real-world data collection systems.',
    },
    {
      level: 'Grades 10 – 12',
      title: 'AI, Robotics & Prototype Engineering',
      badge: 'Advanced Creators',
      accentColor: 'emerald',
      description: 'Computer vision, machine learning models, autonomous rovers, and competitive hackathon-ready capstone engineering.',
      focus: ['Artificial Intelligence & Computer Vision', 'Autonomous Navigation & Rover Mechanics', 'Micro-Python & Edge Computing', 'Capstone Innovation Portfolios'],
      outcomes: 'Graduates with verifiable project portfolios, competitive tournament preparedness, and college-ready tech skills.',
    },
  ];

  const pillars = [
    {
      title: 'School Robotics Curriculum',
      description: 'A structured, progressive academic curriculum that takes students from foundational engineering principles to complex autonomous robotics.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Curriculum & Syllabus Mapping',
      description: 'Custom-tailored mapping to CBSE, ICSE, State Boards, and Cambridge syllabi, reinforcing in-class physics, math, and computer science concepts.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'NEP-Aligned Experiential Learning',
      description: 'Directly fulfills National Education Policy mandates prioritizing hands-on experiential education, 21st-century vocational skills, and STEM inquiry.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Hands-on Project Pedagogy',
      description: 'Zero passive lecturing. Every session revolves around building physical prototypes, debugging real circuits, and collaborating in teams.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1 velora-tech-dotted-bg">
      {/* ========================================================= */}
      {/* HERO BANNER SECTION                                       */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-slate-50/70 via-blue-50/20 to-transparent border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight sm:whitespace-nowrap">
              School Robotics &amp; STEAM Education Programs
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Equip your school with comprehensive, syllabus-mapped robotics and STEAM programs
              <br className="hidden sm:inline" /> designed to nurture analytical thinkers, creative problem solvers, and young innovators.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/our-services/lab-setup" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Explore Lab Setup
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* ========================================================= */}
        {/* SECTION 2 — CORE CURRICULUM PILLARS                       */}
        {/* ========================================================= */}
        <section className="space-y-8 overflow-x-clip">
          <div className="text-left max-w-none space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight sm:whitespace-nowrap">
              Built for Modern Educational Standards
            </h2>
            <p className="text-slate-600 text-base max-w-none sm:whitespace-nowrap">
              Velora Future Lab integrates hands-on technology directly into the school academic ecosystem without disrupting existing routines.
            </p>
          </div>

          <StandardsCardsWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const standardsClasses = [
                'standards-card-left-1',
                'standards-card-left-2',
                'standards-card-right-1',
                'standards-card-right-2',
              ];
              return (
                <Card key={idx} hover className={`${standardsClasses[idx]} border-slate-200/80`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0047ba] flex items-center justify-center mb-4">
                      {pillar.icon}
                    </div>
                    <CardTitle className="text-lg">{pillar.title}</CardTitle>
                    <CardDescription className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </StandardsCardsWrapper>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3 — GRADE-WISE LEARNING PATHWAYS                  */}
        {/* ========================================================= */}
        <section className="space-y-8 overflow-x-clip">
          <div className="text-left max-w-none space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight sm:whitespace-nowrap">
              Grade-Wise Learning Pathways
            </h2>
            <p className="text-slate-600 text-base max-w-none sm:whitespace-nowrap">
              Structured developmental pathways mapped to age-appropriate cognitive milestones and technical capabilities.
            </p>
          </div>

          <PathwayCardsWrapper className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pathways.map((path, idx) => {
              const isBlue = path.accentColor === 'blue';
              const pathwayCardClasses = ['pathway-card-tl', 'pathway-card-tr', 'pathway-card-bl', 'pathway-card-br'];
              return (
                <div
                  key={idx}
                  className={`rounded-3xl border ${isBlue ? 'border-blue-200/80 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/10' : 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/10'} p-8 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between ${pathwayCardClasses[idx] || ''}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full ${isBlue ? 'bg-blue-100/80 text-blue-800 border border-blue-200/60' : 'bg-emerald-100/80 text-emerald-800 border border-emerald-200/60'}`}>
                        {path.level}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {path.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                      {path.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {path.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Core Competencies &amp; Technologies:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {path.focus.map((item, fIdx) => (
                          <li key={fIdx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-start gap-2">
                    <span className="text-xs font-semibold text-slate-500 shrink-0">Key Outcome:</span>
                    <span className="text-xs text-slate-700 italic">{path.outcomes}</span>
                  </div>
                </div>
              );
            })}
          </PathwayCardsWrapper>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4 — PROJECT-BASED LEARNING & NEP ALIGNMENT        */}
        {/* ========================================================= */}
        <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Project-Based Learning Meets Real-World Impact
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                Rather than memorizing abstract formulas, students at Velora Future Lab apply scientific concepts immediately to physical projects. From building automated irrigation systems to constructing sensor-driven obstacle avoiders, every lesson connects to real-world utility.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <span className="text-sm text-slate-700"><strong>Hands-on Kits for Every Student:</strong> Individual or pair work with dedicated hardware kits ensures 100% participation.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <span className="text-sm text-slate-700"><strong>Continuous Assessment:</strong> Continuous skill tracking and project milestones instead of high-stress exams.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <span className="text-sm text-slate-700"><strong>Annual Innovation Showcases:</strong> Opportunity to showcase functional models to parents, peers, and industry mentors.</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                How Velora Integrates with Your School
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">1</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Curriculum Mapping Consultation</h5>
                    <p className="text-xs text-slate-600 mt-0.5">We analyze your school calendar and board syllabus to map weekly or bi-weekly lab sessions seamlessly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">2</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Equipment &amp; Kit Deployment</h5>
                    <p className="text-xs text-slate-600 mt-0.5">We furnish the necessary microcontrollers, sensors, mechanical chassis, and safe storage stations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">3</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Educator Training &amp; Co-Delivery</h5>
                    <p className="text-xs text-slate-600 mt-0.5">Our certified STEM educators co-teach or train your science and computer teachers with detailed lesson plans.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">4</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Exhibitions &amp; Certifications</h5>
                    <p className="text-xs text-slate-600 mt-0.5">Students complete demonstrable capstone projects and earn verified completion credentials.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5 — PRIMARY CTA: BOOK A SCHOOL DEMO               */}
        {/* ========================================================= */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/60 to-emerald-900/20 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Experience the Program in Your Campus
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              We provide a hands-on live demonstration for school principals, STEM coordinators, and trustees. See our kits, curriculum modules, and student projects firsthand.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/projects" variant="outline-dark" size="lg" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
                View Student Projects
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
