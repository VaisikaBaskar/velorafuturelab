import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import { getServices } from '@/lib/api/services';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Service } from '@/types/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'What We Do',
  description: 'Explore the full spectrum of programs, solutions, and technology services offered by VELORA Future Lab.',
};

export default async function WhatWeDoPage() {
  let services: Service[] = [];
  let errorOccurred = false;

  try {
    services = await getServices();
  } catch {
    errorOccurred = true;
  }

  return (
    <PageContainer
      eyebrow="CAPABILITIES & PROGRAMS"
      title="What We Do"
      subtitle="Explore our specialized services, engineering capabilities, and innovation programs designed for forward-looking enterprises."
    >
      {errorOccurred ? (
        <ErrorState
          title="Could not load services"
          message="Unable to communicate with the VELORA Future Lab services API. Please verify backend status."
        />
      ) : services.length === 0 ? (
        <EmptyState
          title="Services Catalog in Preparation"
          description="Our specialized engineering programs and technology services are being updated in the lab catalog."
          actionHref="/contact-us"
          actionLabel="Contact our team for current capabilities"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              hover
              className="flex flex-col justify-between"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <Badge variant="primary" size="sm">
                    Program #{service.display_order}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="line-clamp-4 mt-3">
                  {service.short_description || service.description || 'Full-cycle engineering and development solution.'}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                  VELORA-SVC
                </span>
                <Link
                  href={`/what-we-do/${service.slug}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition"
                >
                  Explore Service &rarr;
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Closing CTA */}
      <div className="mt-16 sm:mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Require Custom Engineering or Advisory?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our lab provides specialized engagement models tailored to your organization&apos;s architectural requirements and research objectives.
          </p>
          <div className="pt-2">
            <Button href="/contact-us" variant="primary" size="lg">
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
