import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import { getCareers } from '@/lib/api/careers';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Career } from '@/types/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the innovation journey at VELORA Future Lab. Explore current openings and research opportunities.',
};

export default async function CareersPage() {
  let careers: Career[] = [];
  let errorOccurred = false;

  try {
    careers = await getCareers();
  } catch {
    errorOccurred = true;
  }

  return (
    <PageContainer
      eyebrow="TALENT & RESEARCH OPPORTUNITIES"
      title="Careers at VELORA"
      subtitle="Work alongside innovative minds shaping technologies, resilient software architectures, and exploratory computing for tomorrow."
    >
      <div className="space-y-16 lg:space-y-20">
        {/* ========================================================= */}
        {/* WHY WORK WITH US                                          */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div>
            <Badge variant="primary" size="sm">
              Our Culture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
              Why Build with VELORA Future Lab
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl text-base">
              We cultivate a culture of deep intellectual curiosity, systems craftsmanship, and rigorous experimentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Challenging Frontiers</CardTitle>
                <CardDescription>
                  Solve foundational technical problems across distributed computing, systems architecture, and intelligent software engineering.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Autonomy & Mastery</CardTitle>
                <CardDescription>
                  Enjoy high technical agency, thoughtful code reviews, strict architecture standards, and freedom to experiment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-lg">Research Translation</CardTitle>
                <CardDescription>
                  Bridge academic computer science and industrial deployment, turning theoretical breakthroughs into production-grade systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* ========================================================= */}
        {/* OPEN POSITIONS                                            */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Current Open Positions
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore open opportunities to join our research and engineering lab.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-2 sm:mt-0">
              {careers.length} Position{careers.length === 1 ? '' : 's'} Listed
            </span>
          </div>

          {errorOccurred ? (
            <ErrorState
              title="Could not load careers"
              message="Unable to communicate with the VELORA Future Lab recruitment services."
            />
          ) : careers.length === 0 ? (
            <EmptyState
              title="No Open Positions Currently"
              description="We are not actively recruiting for specific openings at this moment, but our lab welcomes speculative applications from extraordinary engineers and researchers."
              actionHref="/contact-us"
              actionLabel="Submit a general research or talent inquiry"
            />
          ) : (
            <div className="space-y-4">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-950">
                      {career.job_title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {career.department && (
                        <Badge variant="primary" size="sm">
                          {career.department}
                        </Badge>
                      )}
                      {career.location && (
                        <Badge variant="default" size="sm">
                          {career.location}
                        </Badge>
                      )}
                      {career.employment_type && (
                        <Badge variant="tech" size="sm">
                          {career.employment_type}
                        </Badge>
                      )}
                      {career.experience && (
                        <Badge variant="purple" size="sm">
                          {career.experience}
                        </Badge>
                      )}
                    </div>
                    {career.description && (
                      <p className="text-sm text-slate-600 line-clamp-2 pt-1 max-w-2xl">
                        {career.description}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      href={`/careers/${career.slug}`}
                      variant="primary"
                      size="md"
                    >
                      View Position &rarr;
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SPECULATIVE INQUIRY CTA                                   */}
        {/* ========================================================= */}
        <section className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
              Don&apos;t see an exact match?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We frequently create bespoke roles for exceptional engineers, systems architects, and technical researchers. Send us your background.
            </p>
            <div className="pt-2">
              <Button href="/contact-us" variant="outline" size="md">
                Initiate Talent Inquiry &rarr;
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
