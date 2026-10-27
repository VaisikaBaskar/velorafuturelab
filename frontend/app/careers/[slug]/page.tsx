import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import { getCareerBySlug } from '@/lib/api/careers';
import { ApiError } from '@/lib/api/client';
import CareerApplicationForm from '@/components/sections/CareerApplicationForm';
import Badge from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const career = await getCareerBySlug(slug);
    return {
      title: `${career.job_title} | Careers`,
      description: career.description || undefined,
    };
  } catch {
    return {
      title: 'Career Opening',
    };
  }
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  let career;

  try {
    career = await getCareerBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <PageContainer>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/careers" className="hover:text-slate-900 transition">
          Careers
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{career.job_title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Job Details Column */}
        <div className="lg:col-span-7 space-y-10">
          <header className="border-b border-slate-200/80 pb-8 space-y-4">
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {career.job_title}
            </h1>
          </header>

          {career.description && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950">Role Overview</h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {career.description}
              </div>
            </section>
          )}

          {career.responsibilities && (
            <section className="space-y-4 pt-6 border-t border-slate-200/80">
              <h2 className="text-xl font-bold text-slate-950">Key Responsibilities</h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {career.responsibilities}
              </div>
            </section>
          )}

          {career.requirements && (
            <section className="space-y-4 pt-6 border-t border-slate-200/80">
              <h2 className="text-xl font-bold text-slate-950">Qualifications & Requirements</h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                {career.requirements}
              </div>
            </section>
          )}

          <div className="pt-8 border-t border-slate-200/80">
            <Link
              href="/careers"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition inline-flex items-center gap-1"
            >
              &larr; Back to all open positions
            </Link>
          </div>
        </div>

        {/* Application Form Column */}
        <div className="lg:col-span-5">
          <CareerApplicationForm careerId={career.id} jobTitle={career.job_title} />
        </div>
      </div>
    </PageContainer>
  );
}
