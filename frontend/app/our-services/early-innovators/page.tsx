import { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Early Innovators Program | Velora Future Lab',
  description: 'STEAM foundation program for young learners (Grades 1-4). Creative building, simple machines, safe basic circuits, and intuitive coding.',
};

export default function EarlyInnovatorsPage() {
  const pillars = [
    {
      title: 'Simple Machines & Mechanical Physics',
      desc: 'Exploring levers, pulleys, gears, wheels, and axles through tactile structural blocks. Children learn how machines amplify force and create motion.',
      icon: '⚙️',
    },
    {
      title: 'Safe, Low-Voltage Circuitry',
      desc: 'Discovering electricity safely using snap-together circuits, LED indicators, conductive play materials, and buzzer alarms.',
      icon: '💡',
    },
    {
      title: 'Unplugged & Visual Logic',
      desc: 'Developing foundational computational thinking through board puzzles, algorithmic directional commands, and introductory graphical blocks.',
      icon: '🧩',
    },
    {
      title: 'Creative Problem-Solving & Design',
      desc: 'Encouraging children to sketch ideas, prototype whimsical solutions, and test them iteratively without fear of making mistakes.',
      icon: '🎨',
    },
  ];

  const outcomes = [
    'Removes early intimidation around math, engineering, and electronics',
    'Enhances fine motor dexterity and structural spatial awareness',
    'Cultivates algorithmic logic and sequential reasoning naturally',
    'Fosters fearless scientific curiosity and persistent problem-solving habits',
    'Pride in building tangible, working moving models and take-home projects',
  ];

  return (
    <div className="flex flex-col w-full flex-1">
      {/* Hero Header */}
      <section className="w-full bg-gradient-to-b from-slate-50 via-blue-50/20 to-white border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-none mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Early Innovators Program
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-none mx-auto leading-relaxed sm:whitespace-nowrap">
              Where playful curiosity becomes the foundation for lifelong engineering creativity. Specially designed for young minds to explore mechanics, circuits, and logic.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/school-programs" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                View School Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-16">
        {/* Philosophy & Approach */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <Badge variant="outline" size="sm" className="border-blue-300 text-blue-700">
              Playful Learning
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Inspiring Engineers Before They Even Know What Engineering Is
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At early primary ages, learning should be rich with tactile experimentation. The Early Innovators Program turns abstract scientific curiosity into hands-on play. Children build moving Ferris wheels, lighted lighthouses, and motorized fan carts.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              By replacing abstract screen-time with physical creation, we cultivate deep focus, creative resilience, and instinctive understanding of physics and cause-and-effect.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200/80 bg-blue-50/30 p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">Safety-First Design</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Child-Safe Low Voltage:</strong> All electrical discovery modules operate on safe 3V–5V DC battery packs with zero thermal or shock hazards.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Non-Toxic Tactile Kits:</strong> Rounded, durable components engineered specifically for small hands and active classrooms.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Visual Activity Guides:</strong> Fully illustrated activity books that guide students step-by-step with zero frustrating jargon.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              What Early Innovators Explore
            </h2>
            <p className="text-slate-600 text-base">
              Four progressive building blocks designed specifically for cognitive development in Grades 1 to 4.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <Card key={idx} hover className="border-slate-200/80">
                <CardHeader>
                  <div className="text-3xl mb-3">{pillar.icon}</div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  <CardDescription className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {pillar.desc}
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
                Skills &amp; Developmental Growth
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

        {/* Primary CTA */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ignite Curiosity in Your Primary Grades
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Introduce early STEAM education that parents love and children look forward to every week. Schedule a demonstration session for your primary school leaders.
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
