import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';
import Logo from '@/components/common/Logo';

export const metadata: Metadata = {
  title: 'Contact Us | Let\'s Connect & Create Future-Ready Learning Spaces | Velora Future Lab',
  description: 'Connect with Velora Future Lab to explore STEM education, robotics programs, AI learning, innovation labs, workshops, and customized solutions for your institution.',
};

export default function ContactUsPage() {
  const contactChannels = [
    {
      title: 'School Demo & Enquiries',
      badge: 'Live Campus Trial',
      description: 'Experience our hardware kits and student project models firsthand with a live interactive demonstration on your campus.',
      focus: 'Interactive K-12 demonstration',
      href: '#inquiry-form',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'STEM Lab Setup',
      badge: 'Turnkey Infrastructure',
      description: 'Request custom floorplans, equipment inventories, syllabus mapping, and complete composite lab setup proposals for your institution.',
      focus: 'Composite lab planning & hardware',
      href: '#inquiry-form',
      color: 'emerald',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Robotics & AI Programs',
      badge: 'Grades 1 to 12',
      description: 'Comprehensive curriculum integration spanning electronics, Arduino, sensors, IoT systems, Python coding, and practical AI.',
      focus: 'Structured academic curriculum',
      href: '#inquiry-form',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Workshops & Training',
      badge: 'Bootcamps & Hackathons',
      description: 'Arrange high-energy multi-day robotics bootcamps, AI hackathons, teacher enablement masterclasses, and science festival exhibitions.',
      focus: 'Hands-on experiential events',
      href: '#inquiry-form',
      color: 'emerald',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'General Enquiries',
      badge: 'Rapid Response Protocol',
      description: 'All institutional and parent inquiries are reviewed and answered within 24 to 48 business hours by our academic directors and coordinators.',
      focus: '24–48h SLA response commitment',
      href: '#inquiry-form',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1 velora-tech-dotted-bg">
      {/* ========================================================= */}
      {/* SECTION 2: CONTACT PAGE HERO SECTION                      */}
      {/* ========================================================= */}
      <section className="relative w-full bg-gradient-to-br from-slate-950 via-[#0a1930] to-slate-900 text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        {/* Ambient Brand Glowing Radiance */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Text Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Velora Academic Partnerships • 2026–2027</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Let&apos;s Connect &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                  Create Future-Ready
                </span>{' '}
                Learning Spaces
              </h1>

              {/* Supporting Paragraph */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                Connect with Velora Future Lab to explore STEM education, robotics programs, AI learning, innovation labs, workshops, and customized solutions for your institution.
              </p>

              {/* Primary Call to Action Button & Quick Trust Metrics */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href="#inquiry-form"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-[0.98] border border-blue-400/30 cursor-pointer"
                  >
                    <span>Book a School Demo</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>50+ Partner Schools &amp; Campuses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Hands-On Robotics &amp; AI Kits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>CBSE • ICSE • Cambridge Mapped</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Educational Technology Imagery Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-black/60 bg-slate-900 group ring-1 ring-white/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/about-innovation-lab.jpg"
                    alt="Velora Future Lab STEM Robotics Innovation Center"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                  {/* Top floating badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Demos Pan-India</span>
                  </div>

                  {/* Highlight pill inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        Composite STEM &amp; Robotics Labs
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Turnkey infrastructure &amp; educator enablement
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 shrink-0">
                      K-12 Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: CONTACT INFORMATION & INQUIRY CHANNELS         */}
      {/* ========================================================= */}
      <section className="w-full bg-slate-50 border-b border-slate-200/80 py-12 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
              Specialized Institutional Engagement Channels
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#0047ba] to-[#16a34a] mx-auto mt-4 mb-4 rounded-full" />
            <p
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal"
              style={{ textWrap: 'balance' }}
            >
              Whether you represent a school management board, an enthusiastic science teacher, or a parent seeking advanced robotics programs, our team is here to assist.
            </p>
          </div>

          {/* 5 Distinct Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {contactChannels.map((channel, idx) => {
              const isBlue = channel.color === 'blue';
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-slate-300/90 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      isBlue
                        ? 'bg-gradient-to-r from-[#0047ba] to-blue-500'
                        : 'bg-gradient-to-r from-[#16a34a] to-emerald-500'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                          isBlue
                            ? 'bg-blue-50 text-[#0047ba] border border-blue-100/60'
                            : 'bg-emerald-50 text-[#16a34a] border border-emerald-100/60'
                        }`}
                      >
                        {channel.icon}
                      </div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isBlue
                            ? 'bg-blue-100/70 text-blue-700 border border-blue-200/60'
                            : 'bg-emerald-100/70 text-emerald-700 border border-emerald-200/60'
                        }`}
                      >
                        {channel.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 mb-2 tracking-tight">
                      {channel.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {channel.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {channel.focus}
                    </span>
                    <a
                      href={channel.href}
                      className={`text-xs font-bold inline-flex items-center gap-1.5 group-hover:gap-2 ${
                        isBlue
                          ? 'text-[#0047ba] hover:text-blue-800'
                          : 'text-[#16a34a] hover:text-emerald-800'
                      } transition-all`}
                    >
                      <span>Inquire</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* SLA Commitment Callout Card */}
            <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/40 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0047ba] via-blue-500 to-[#16a34a]" />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Logo variant="mark" height={24} />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Velora Institutional SLA
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-2">
                  Guaranteed Academic Support
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Every request receives dedicated attention from our regional academic directors, curriculum engineers, and STEM deployment specialists.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/70 text-xs text-slate-600 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>Pan-India institutional coordination &amp; campus visits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: MAIN INQUIRY FORM SECTION                      */}
      {/* ========================================================= */}
      <section className="w-full py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Why Partner & Connected Process Timeline */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  Seamless Institutional Partnership Process
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Our structured four-step deployment ensures your school implements a vibrant STEM and robotics culture with minimum friction.
                </p>
              </div>

              {/* Interconnected Vertical Timeline */}
              <div className="relative pl-7 sm:pl-9 space-y-6 before:absolute before:left-3 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#0047ba] via-blue-300 before:to-[#16a34a]">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute -left-7 sm:-left-9 top-0.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#0047ba] text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-blue-600/30 ring-4 ring-white">
                    1
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs group-hover:border-blue-200 group-hover:shadow-xs transition-all duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Discovery &amp; Syllabus Mapping
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        Phase 1
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      We evaluate your grade levels (Grades 1-12), board syllabus (CBSE, ICSE, Cambridge, State), and timetable allocation.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="absolute -left-7 sm:-left-9 top-0.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#16a34a] text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-emerald-600/30 ring-4 ring-white">
                    2
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs group-hover:border-emerald-200 group-hover:shadow-xs transition-all duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Interactive Campus Demonstration
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Phase 2
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Our coordinators visit your campus with real student project hardware, Arduino kits, and AI vision prototypes.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="absolute -left-7 sm:-left-9 top-0.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#0047ba] text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-blue-600/30 ring-4 ring-white">
                    3
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs group-hover:border-blue-200 group-hover:shadow-xs transition-all duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Turnkey Lab Infrastructure &amp; Kits
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        Phase 3
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Complete delivery of safety furniture, microcontrollers, sensor kits, student workbooks, and teacher master manuals.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative group">
                  <div className="absolute -left-7 sm:-left-9 top-0.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#16a34a] text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-emerald-600/30 ring-4 ring-white">
                    4
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs group-hover:border-emerald-200 group-hover:shadow-xs transition-all duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        Faculty Enablement &amp; Mentoring
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Phase 4
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      Ongoing teacher enablement workshops, inter-school hackathons, and certified student portfolio building.
                    </p>
                  </div>
                </div>
              </div>

              {/* Elevated Velora Engagement Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200/90 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0047ba] to-[#16a34a]" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <Logo variant="mark" height={26} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        Direct Coordinator Routing
                      </h4>
                      <p className="text-xs text-slate-500">
                        Campus &amp; Online Consultations
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Desk
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Select your inquiry purpose in the adjacent form to route your message directly to the appropriate regional director.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">✓ 24–48h SLA</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">✓ Free Syllabus Review</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">✓ Hands-On Kits</span>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Inquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


