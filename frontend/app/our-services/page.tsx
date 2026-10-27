import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Our Services | Velora Future Lab',
  description: 'Comprehensive STEAM and robotics services: Robotics & Emerging Tech, Workshops, Early Innovators, and School Lab Setups.',
};

export default function OurServicesPage() {
  const serviceCategories = [
    {
      title: 'Robotics & Emerging Technologies',
      slug: 'robotics-technologies',
      tag: 'Core STEAM Program',
      grades: 'Grades 4 to 12',
      color: 'blue',
      summary: 'Practical robotics, sensors, Arduino, microcontrollers, IoT smart systems, and practical artificial intelligence.',
      bullets: [
        'Electronics, breadboarding & motor controls',
        'Sensors & automation mechanisms',
        'Arduino, micro:bit & microcontroller architecture',
        'IoT systems, Python programming & AI fundamentals',
      ],
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Workshops & Innovation Events',
      slug: 'workshops-events',
      tag: 'Experiential Events',
      grades: 'Grades 3 to 12 & Educators',
      color: 'emerald',
      summary: 'Dynamic multi-day workshops, school innovation days, student exhibitions, hackathons, and technology immersion bootcamps.',
      bullets: [
        'Weekend and seasonal hands-on robotics workshops',
        'Artificial Intelligence & coding masterclasses',
        'Annual school innovation days & science expos',
        'Inter-school tech challenges & hackathon mentoring',
      ],
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Early Innovators Program',
      slug: 'early-innovators',
      tag: 'Foundation Program',
      grades: 'Grades 1 to 4 (Ages 6-9)',
      color: 'blue',
      summary: 'Playful, tactile discovery introducing young learners to simple machines, basic electronics, and visual logic without intimidation.',
      bullets: [
        'Tactile mechanical building & basic gears',
        'Circuit discovery using safe, low-voltage modules',
        'Age-appropriate visual logic & block puzzles',
        'Creative problem-solving & exploratory confidence',
      ],
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Lab Setup & School Partnerships',
      slug: 'lab-setup',
      tag: 'Turnkey Institutional',
      grades: 'K-12 Schools & Institutions',
      color: 'emerald',
      summary: 'End-to-end robotics lab infrastructure, certified kits, teacher enablement, curriculum integration, and ongoing operational support.',
      bullets: [
        'Complete lab layout, safety furniture & hardware kits',
        'Structured curriculum aligned with school syllabus',
        'Comprehensive teacher training & masterclass delivery',
        'Continuous lab maintenance & inventory support',
      ],
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1 velora-tech-dotted-bg">
      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-slate-50/70 via-blue-50/20 to-transparent border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Our Educational &amp; STEAM Services
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Empowering students and schools with cutting-edge robotics curriculums,
              <br className="hidden sm:inline" /> interactive workshops, hands-on early learner programs, and complete lab infrastructure.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/projects" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Explore Student Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4 SERVICE CARDS GRID                                      */}
      {/* ========================================================= */}
      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {serviceCategories.map((service, idx) => {
            const isBlue = service.color === 'blue';
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${isBlue ? 'bg-gradient-to-r from-[#0047ba] to-blue-500' : 'bg-gradient-to-r from-[#16a34a] to-emerald-500'}`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isBlue ? 'bg-blue-50 text-[#0047ba]' : 'bg-emerald-50 text-[#16a34a]'}`}>
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isBlue ? 'bg-blue-100/70 text-blue-700 border border-blue-200/60' : 'bg-emerald-100/70 text-emerald-700 border border-emerald-200/60'}`}>
                        {service.tag}
                      </span>
                      <span className="block text-xs text-slate-500 mt-1 font-medium">
                        {service.grades}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  <div className="space-y-2 mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights &amp; Activities:
                    </h3>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-sm text-slate-700 flex items-start gap-2.5">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${isBlue ? 'bg-blue-100 text-[#0047ba]' : 'bg-emerald-100 text-[#16a34a]'}`}>✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/our-services/${service.slug}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold ${isBlue ? 'text-[#0047ba] hover:text-blue-800' : 'text-[#16a34a] hover:text-emerald-800'} transition-colors`}
                  >
                    <span>View Full Details</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <Button
                    href="/contact-us?purpose=demo"
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs"
                  >
                    Enquire Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SERVICE COMMITMENTS / WHY CHOOSE US                       */}
        {/* ========================================================= */}
        <section className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Velora Quality Standards
            </h2>
            <p className="text-slate-600 text-base">
              Every service we deliver is designed with high safety standards, pedagogical rigour, and transparent institutional collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover className="bg-white">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Certified Hardware &amp; Kits</CardTitle>
                <CardDescription className="text-sm text-slate-600 mt-2">
                  All microcontrollers, sensors, and structural components are thoroughly tested for school student safety.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover className="bg-white">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Pedagogical Lesson Plans</CardTitle>
                <CardDescription className="text-sm text-slate-600 mt-2">
                  Step-by-step guides, student project worksheets, and educator teaching manuals for every single session.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover className="bg-white">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Tangible Student Portfolios</CardTitle>
                <CardDescription className="text-sm text-slate-600 mt-2">
                  Students don&apos;t just listen—they build, test, and document functioning real-world prototypes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRIMARY CTA: BOOK A SCHOOL DEMO                           */}
        {/* ========================================================= */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/60 to-emerald-900/20 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Find the Right Solution for Your School
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Whether you need a one-day robotics workshop, a turnkey STEM lab setup, or year-round curriculum integration, our team is ready to assist.
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
