import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import { getServiceBySlug } from '@/lib/api/services';
import { ApiError } from '@/lib/api/client';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const service = await getServiceBySlug(slug);
    return {
      title: `${service.title} | What We Do`,
      description: service.short_description || service.description || undefined,
    };
  } catch {
    return {
      title: 'Service Specification',
    };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  let service;

  try {
    service = await getServiceBySlug(slug);
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
        <Link href="/what-we-do" className="hover:text-slate-900 transition">
          What We Do
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{service.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-10">
          <header className="border-b border-slate-200/80 pb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Service Specification
              </Badge>
              <Badge variant="default" size="sm">
                Status: Available
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {service.title}
            </h1>
            {service.short_description && (
              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                {service.short_description}
              </p>
            )}
          </header>

          {/* Detailed Content */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Program Overview</h2>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
              {service.description || 'Comprehensive program overview and technical details are available upon inquiry.'}
            </div>
          </section>

          {/* Supporting Architecture Highlights */}
          <section className="pt-8 border-t border-slate-200/80 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Key Architectural Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm">Modular Foundation</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Decoupled subsystem boundaries ensuring seamless interoperability and incremental upgrades.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm">Verified Telemetry</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Real-time instrumentation, comprehensive audit logging, and observable metric pipelines.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm">Scalable Concurrency</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  High-throughput execution designed for variable workloads and resilient failovers.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm">Production Hardening</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Strict security compliance, automated integration test suites, and enterprise deployment protocols.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column: Inquiry Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-6 sm:p-7 sticky top-28 space-y-6">
            <div>
              <Badge variant="primary" size="sm">
                Collaborative Engagement
              </Badge>
              <h3 className="text-lg font-bold text-slate-950 mt-2">
                Inquire About This Service
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect with our technical advisory team to evaluate architectural fit and engagement scope for {service.title}.
              </p>
            </div>

            <Button
              href="/contact-us"
              variant="primary"
              size="md"
              className="w-full text-center"
            >
              Inquire About This Service
            </Button>

            <div className="pt-4 border-t border-slate-200/80 space-y-3 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Engagement Model:</span>
                <span className="font-medium text-slate-700">Advisory & Implementation</span>
              </div>
              <div className="flex justify-between">
                <span>Program Node:</span>
                <span className="font-mono text-slate-700">VELORA-SVC-{service.display_order}</span>
              </div>
              <div className="flex justify-between">
                <span>Response Window:</span>
                <span className="font-medium text-slate-700">Within 24-48 Hours</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/what-we-do"
                className="text-xs text-slate-500 hover:text-slate-800 transition"
              >
                &larr; Back to all services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
