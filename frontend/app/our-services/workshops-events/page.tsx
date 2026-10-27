import { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Workshops & Innovation Events | Velora Future Lab',
  description: 'High-energy robotics workshops, AI bootcamps, school innovation days, science exhibitions, and inter-school hackathons.',
};

export default function WorkshopsEventsPage() {
  const eventTypes = [
    {
      title: 'Robotics Bootcamp Workshops',
      badge: '1 to 3 Days',
      color: 'blue',
      desc: 'Intensive hands-on immersion where students build, wire, program, and race fully functional obstacle-avoidance or line-follower robots.',
      highlights: ['Individual/team robotics kit provided', 'Chassis assembly & sensor wiring', 'Live obstacle avoidance tournament', 'Participation certificate'],
    },
    {
      title: 'AI & Coding Masterclasses',
      badge: '2 to 5 Days',
      color: 'emerald',
      desc: 'Deep dive into computer logic, Python programming, and introductory computer vision models that recognize faces, gestures, and colors.',
      highlights: ['Interactive coding environments', 'Real-world data manipulation', 'Mini-project showcase', 'Guided code repositories'],
    },
    {
      title: 'School Innovation Days & Expos',
      badge: 'Annual Event',
      color: 'blue',
      desc: 'Campus-wide celebration of science and technology. We coordinate hands-on maker stations, drone flight demos, and interactive STEM booths.',
      highlights: ['Multi-grade experiential stations', 'Live robotics demonstrations', 'Parent & visitor engagement', 'School-wide STEM celebration'],
    },
    {
      title: 'Inter-School Hackathons & Challenges',
      badge: 'Tournament',
      color: 'emerald',
      desc: 'Competitive, timed engineering challenges where student teams solve sustainability and automation problems using hardware and software.',
      highlights: ['Mentored problem-solving sprints', 'Hardware prototyping access', 'Jury panel evaluation', 'Trophies, medals & commendations'],
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1">
      {/* Hero Header */}
      <section className="w-full bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Workshops &amp; Innovation Events
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Spark widespread enthusiasm for science and technology with fast-paced robotics bootcamps, school-wide innovation days, and competitive hackathons.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=workshop" variant="primary" size="lg" className="bg-[#16a34a] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25">
                Enquire About Workshops
              </Button>
              <Button href="/contact-us?purpose=demo" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Book a School Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-16">
        {/* Experience Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Action-Packed Learning That Energizes the Entire School
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Velora workshops are structured as high-energy, immersive sprints. Instead of dry lectures, students jump straight into assembling chassis, configuring microcontrollers, and seeing their creations spring to life within the very first hour.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Schools frequently use our innovation events as kickoff milestones to launch STEM clubs, celebrate annual science weeks, or inspire students before inter-school competitions.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/30 p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">What Velora Delivers On-Site</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Turnkey Kit Logistics:</strong> All robotics kits, laptops, breadboards, sensors, and tools transported and set up by our team.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Certified STEM Instructors:</strong> Passionate, patient engineering mentors who guide every student team.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Zero Administrative Stress:</strong> Full turnkey execution with zero setup burden on school teachers.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Event Formats Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="primary" size="sm">
              Event Catalog
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Workshop &amp; Event Formats
            </h2>
            <p className="text-slate-600 text-base">
              Customizable formats designed to match your school&apos;s academic calendar and event schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((evt, idx) => {
              const isBlue = evt.color === 'blue';
              return (
                <div
                  key={idx}
                  className={`rounded-3xl border ${isBlue ? 'border-blue-200/80 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/10' : 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/10'} p-8 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isBlue ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {evt.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">
                      {evt.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {evt.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Event Deliverables:
                      </h4>
                      <ul className="space-y-1.5">
                        {evt.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-[#0047ba]' : 'bg-[#16a34a]'}`} />
                            {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      href="/contact-us?purpose=workshop"
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Enquire for This Format
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Host a Velora Workshop at Your School
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Contact us to discuss dates, student batch sizes, and event themes. We customize the agenda to perfectly match your students&apos; grade levels.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=workshop" variant="primary" size="lg" className="bg-[#16a34a] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25">
                Enquire About Workshops
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
