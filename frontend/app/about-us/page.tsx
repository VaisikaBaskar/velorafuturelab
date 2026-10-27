import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import AboutBanner from '@/components/sections/AboutBanner';
import AboutSection from '@/components/sections/AboutSection';
import PhilosophyCardsWrapper from '@/components/sections/PhilosophyCardsWrapper';
import PartnerCardsWrapper from '@/components/sections/PartnerCardsWrapper';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission, vision, research focus, and core capabilities of VELORA Future Lab.',
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full flex-1 velora-tech-dotted-bg">
      {/* ========================================================= */}
      {/* SECTION 1 — ABOUT US BANNER (FULL WIDTH ALIGNED W/ NAVBAR) */}
      {/* ========================================================= */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <AboutBanner />
      </div>

      <PageContainer className="pt-6 sm:pt-10 lg:pt-14">
        <div className="space-y-12 lg:space-y-16">
          {/* ========================================================= */}
          {/* SECTION 2 — ABOUT SECTION                                 */}
          {/* ========================================================= */}
          <AboutSection />

        {/* ========================================================= */}
        {/* SECTIONS 3 & 4 — MISSION & VISION                         */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card — Velora Blue */}
          <div className="relative rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col justify-between">
            {/* Top brand accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0047ba] via-blue-500 to-cyan-400" />

            {/* Ambient radial glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(0, 71, 186, 0.25) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Decorative subtle circuit trace watermark */}
            <div className="absolute top-5 right-5 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
              <svg width="110" height="75" viewBox="0 0 110 75" fill="none">
                <path d="M10 20 L45 20 L65 45 L105 45" stroke="#0047ba" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M45 20 L55 10 L90 10" stroke="#0047ba" strokeWidth="1.5" />
                <circle cx="10" cy="20" r="3" fill="#0047ba" />
                <circle cx="105" cy="45" r="3.5" fill="none" stroke="#0047ba" strokeWidth="1.5" />
                <circle cx="105" cy="45" r="1.8" fill="#0047ba" />
                <circle cx="90" cy="10" r="2.2" fill="#0284c7" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0047ba] to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 ring-4 ring-blue-100/80">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0047ba]" />
                  Action & Purpose
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
                To turn curiosity into creation through experiences that let children explore, experiment, and bring their ideas to life.
              </p>
            </div>

            {/* Action pillar chips */}
            <div className="relative z-10 pt-6 mt-6 border-t border-blue-100/70 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-700 border border-blue-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0047ba]" />
                Explore
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-700 border border-blue-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0047ba]" />
                Experiment
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-700 border border-blue-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0047ba]" />
                Create
              </span>
            </div>
          </div>

          {/* Vision Card — Velora Green */}
          <div className="relative rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col justify-between">
            {/* Top brand accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#16a34a] via-emerald-500 to-teal-400" />

            {/* Ambient radial glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(22, 163, 74, 0.25) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Decorative subtle circuit trace watermark */}
            <div className="absolute top-5 right-5 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
              <svg width="110" height="75" viewBox="0 0 110 75" fill="none">
                <path d="M10 45 L40 45 L65 20 L105 20" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M40 45 L50 60 L85 60" stroke="#16a34a" strokeWidth="1.5" />
                <circle cx="10" cy="45" r="3" fill="#16a34a" />
                <circle cx="105" cy="20" r="3.5" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                <circle cx="105" cy="20" r="1.8" fill="#16a34a" />
                <circle cx="85" cy="60" r="2.2" fill="#10b981" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16a34a] to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-100/80">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                  Future & Aspiration
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
                To inspire young minds to create possibilities the world has yet to imagine.
              </p>
            </div>

            {/* Action pillar chips */}
            <div className="relative z-10 pt-6 mt-6 border-t border-emerald-100/70 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-700 border border-emerald-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                Inspire
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-700 border border-emerald-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                Innovate
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-700 border border-emerald-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                Imagine
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5 — LEARNING PHILOSOPHY & APPROACH TO INNOVATION  */}
        {/* ========================================================= */}
        <section className="space-y-8 pt-4 overflow-x-clip">
          <div className="text-left max-w-none space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight sm:whitespace-nowrap">
              Our Learning Philosophy & Approach to Innovation
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-none sm:whitespace-nowrap">
              We transform theoretical science and computing into tangible, joyful creation where students learn by doing, experimenting, and solving real-world challenges.
            </p>
          </div>

          <PhilosophyCardsWrapper className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Learning Philosophy Card */}
            <div className="philosophy-card-left rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0047ba] flex items-center justify-center mb-6 ring-4 ring-blue-50/50">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
                Experiential Learning Philosophy
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Real engineering cannot be absorbed solely from a blackboard. We place microcontrollers, sensors, mechanical gears, and coding tools directly into students&apos; hands, fostering genuine curiosity and scientific intuition.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Active Tinkering:</strong> Students construct physical mechanisms and see immediate physical outcomes of their code.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Embracing Iterative Failure:</strong> Debugging hardware and software teaches resilience, analytical problem-solving, and critical inquiry.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Collaborative Inquiry:</strong> Peer teamwork mirrors actual engineering labs and tech incubation teams.</span>
                </li>
              </ul>
            </div>

            {/* Approach to Innovation Card */}
            <div className="philosophy-card-right rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16a34a] flex items-center justify-center mb-6 ring-4 ring-emerald-50/50">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
                Structured Path to Innovation
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our developmental methodology guides learners systematically from foundational concepts to complex multi-sensor autonomous systems and real-world problem-solving models.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Foundation to Autonomy:</strong> Moving seamlessly from graphical block programming to text coding (Python/C++) and microcontroller firmware.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Applied Real-World Context:</strong> Projects target tangible challenges like smart agriculture, automated sorting, and energy conservation.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Project Portfolio Creation:</strong> Every student graduates each module with demonstrable, functional prototypes.</span>
                </li>
              </ul>
            </div>
          </PhilosophyCardsWrapper>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6 — WHY SCHOOLS PARTNER WITH VELORA               */}
        {/* ========================================================= */}
        <section className="space-y-8 pt-4 overflow-x-clip">
          <div className="text-left max-w-none space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight sm:whitespace-nowrap">
              Why Schools Partner with Velora
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-none sm:whitespace-nowrap">
              We empower educational institutions with end-to-end robotics, STEAM lab ecosystems, curriculum integration, and ongoing educator mentorship.
            </p>
          </div>

          <PartnerCardsWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover className="partner-card-left-1 border-slate-200/80">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0047ba] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Curriculum Alignment</CardTitle>
                <CardDescription>
                  Structured STEAM curriculum seamlessly mapped to national educational standards and school timetables.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover className="partner-card-left-2 border-slate-200/80">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Turnkey Lab Setup</CardTitle>
                <CardDescription>
                  Complete hardware kits, microcontrollers, 3D prototyping tools, and safety-tested lab workstations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover className="partner-card-right-1 border-slate-200/80">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Teacher Empowerment</CardTitle>
                <CardDescription>
                  Comprehensive faculty development and ongoing co-teaching support so school educators teach with confidence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover className="partner-card-right-2 border-slate-200/80">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Exhibitions &amp; Events</CardTitle>
                <CardDescription>
                  School innovation days, robotics expos, inter-school challenges, and student showcase events that inspire.
                </CardDescription>
              </CardHeader>
            </Card>
          </PartnerCardsWrapper>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7 — PRIMARY CTA: BOOK A SCHOOL DEMO               */}
        {/* ========================================================= */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-900/60 to-emerald-900/20 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bring Velora Future Lab to Your School
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Experience how our curriculum, robotics kits, and hands-on workshops inspire students. Schedule an interactive demo session with our education specialists.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=demo" variant="primary" size="lg" className="bg-[#0047ba] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Book a School Demo
              </Button>
              <Button href="/school-programs" variant="outline-dark" size="lg" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
                Explore School Programs
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
    </div>
  );
}
