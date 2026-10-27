import { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Lab Setup & School Partnerships | Velora Future Lab',
  description: 'Turnkey STEAM & robotics lab infrastructure for schools: hardware kits, teacher training, curriculum mapping, and long-term academic support.',
};

export default function LabSetupPartnershipsPage() {
  const deliverables = [
    {
      title: 'Lab Planning & Workspace Design',
      desc: 'Optimized spatial floorplans, modular workbench configurations, safety zoning, organized kit storage racks, and presentation demo areas.',
      icon: '📐',
    },
    {
      title: 'Hardware, Kits & Prototyping Tools',
      desc: 'Complete inventory of microcontrollers (Arduino, ESP32), sensor arrays, motorized chassis, breadboards, testing multimeters, and prototyping tools.',
      icon: '🧰',
    },
    {
      title: 'Structured Year-Round Curriculum',
      desc: 'Grade-mapped lesson plans, student activity workbooks, and slide presentations mapped to CBSE, ICSE, Cambridge, and State Board calendars.',
      icon: '📚',
    },
    {
      title: 'Educator Training & Certification',
      desc: 'Intensive faculty enablement workshops and ongoing co-teaching mentorship so school science and IT teachers run sessions with total confidence.',
      icon: '🎓',
    },
    {
      title: 'Annual Replacement & Maintenance',
      desc: 'Scheduled hardware health checks, replacement of worn sensors or broken components, and seasonal firmware/software updates.',
      icon: '🛠️',
    },
    {
      title: 'Exhibition & Hackathon Support',
      desc: 'Assistance organizing your annual school STEM fair, science exhibitions, and training student teams for national inter-school competitions.',
      icon: '🏆',
    },
  ];

  return (
    <div className="flex flex-col w-full flex-1">
      {/* Hero Header */}
      <section className="w-full bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white border-b border-slate-200/80 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Lab Setup &amp; School Partnerships
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Transform your school into a premier hub for technological innovation.
              <br className="hidden sm:inline" /> We provide complete turnkey lab setup, hardware kits, curriculum mapping, and teacher enablement.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=proposal" variant="primary" size="lg" className="bg-[#16a34a] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25">
                Request a Lab Proposal
              </Button>
              <Button href="/contact-us?purpose=demo" variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                Book a School Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PageContainer className="pt-8 sm:pt-10 pb-16 space-y-16">
        {/* Partnership Model */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <Badge variant="outline" size="sm" className="border-emerald-300 text-emerald-700">
              Turnkey Execution
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              A Hassle-Free Innovation Lab for School Leaders
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Setting up a robotics and STEAM laboratory often overwhelms schools with fragmented vendor purchasing, lack of structured curriculum, and untrained teachers. Velora Future Lab solves this completely with an integrated end-to-end partnership.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We convert an available room on your campus into an inspiring, fully functional Velora Future Lab. We supply the hardware, structure the timetable, train your teachers, and provide ongoing mentorship throughout the academic year.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/30 p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">Partnership Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="font-bold text-emerald-700 shrink-0">Phase 1:</span>
                <span className="text-slate-700">Campus inspection, room sizing &amp; curriculum alignment consultation.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-emerald-700 shrink-0">Phase 2:</span>
                <span className="text-slate-700">Delivery of student kits, microcontrollers, tools, and branding signage.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-emerald-700 shrink-0">Phase 3:</span>
                <span className="text-slate-700">Faculty training bootcamps and student orientation sessions.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold text-emerald-700 shrink-0">Phase 4:</span>
                <span className="text-slate-700">Active weekly classes, periodic assessments, and annual STEM exhibition.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              What Velora Provides in the Partnership
            </h2>
            <p className="text-slate-600 text-base">
              A comprehensive package encompassing physical lab design, equipment, curriculum, and continuous human mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, idx) => (
              <Card key={idx} hover className="border-slate-200/80">
                <CardHeader>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Establish a STEAM Lab on Campus?
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Contact our school partnership advisors to receive a customized lab proposal, kit inventory specifications, and fee breakdown for your institution.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button href="/contact-us?purpose=proposal" variant="primary" size="lg" className="bg-[#16a34a] hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25">
                Request a Lab Proposal
              </Button>
              <Button href="/contact-us?purpose=demo" variant="outline-dark" size="lg" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
                Book a School Demo
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
