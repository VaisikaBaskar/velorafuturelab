import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import { getBlogPostBySlug } from '@/lib/api/blog';
import { ApiError } from '@/lib/api/client';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    return {
      title: post.meta_title || `${post.title} | VELORA Insights`,
      description: post.meta_description || post.excerpt || undefined,
    };
  } catch {
    return {
      title: 'Article Detail',
    };
  }
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  let post;

  try {
    post = await getBlogPostBySlug(slug);
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
        <Link href="/blog" className="hover:text-slate-900 transition">
          Insights
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{post.title}</span>
      </nav>

      <article className="max-w-3xl mx-auto space-y-10">
        {/* Article Header */}
        <header className="border-b border-slate-200/80 pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {post.category_name && (
              <Badge variant="primary" size="sm">
                {post.category_name}
              </Badge>
            )}
            {post.published_at && (
              <time dateTime={post.published_at} className="font-medium">
                {new Date(post.published_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            <span>&middot;</span>
            <span className="font-medium text-slate-600">
              By {post.author_name || 'VELORA Future Lab'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal pt-2">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div className="text-slate-800 leading-relaxed whitespace-pre-line text-base sm:text-lg space-y-6">
          {post.content}
        </div>

        {/* Article Footer & Action */}
        <footer className="pt-10 border-t border-slate-200/80 space-y-8">
          <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-950">
                Interested in this topic or research prototype?
              </h4>
              <p className="text-xs text-slate-500">
                Discuss implementation possibilities or joint initiatives with our team.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href="/contact-us" variant="primary" size="md">
                Talk to VELORA
              </Button>
            </div>
          </div>

          <div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition"
            >
              &larr; Back to all insights
            </Link>
          </div>
        </footer>
      </article>
    </PageContainer>
  );
}
