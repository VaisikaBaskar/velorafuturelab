import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import { getBlogCategories, getBlogPosts } from '@/lib/api/blog';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { BlogCategory, BlogListResponse } from '@/types/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Explore research updates, technological insights, and announcements from VELORA Future Lab.',
};

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;

  let categories: BlogCategory[] = [];
  let blogData: BlogListResponse = {
    posts: [],
    pagination: { page: 1, limit: 9, total: 0, totalPages: 1 },
  };
  let errorOccurred = false;

  try {
    const [cats, postsResponse] = await Promise.all([
      getBlogCategories().catch(() => []),
      getBlogPosts({ category, page: currentPage, limit: 9 }),
    ]);
    categories = cats;
    blogData = postsResponse;
  } catch {
    errorOccurred = true;
  }

  return (
    <PageContainer
      eyebrow="RESEARCH & PERSPECTIVES"
      title="VELORA Insights"
      subtitle="Articles, technical analyses, and applied computing perspectives authored by researchers and engineers at VELORA Future Lab."
    >
      <div className="space-y-12">
        {/* Category Filters */}
        {categories.length > 0 && (
          <nav aria-label="Category Filters" className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200/80">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                !category
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  category === cat.slug
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Content Section */}
        {errorOccurred ? (
          <ErrorState
            title="Could not load insights"
            message="Unable to communicate with the VELORA Future Lab editorial services."
          />
        ) : blogData.posts.length === 0 ? (
          <EmptyState
            title="No Articles Published Yet"
            description={
              category
                ? 'No articles found under this specific category filter.'
                : 'Research briefs and engineering insights are currently in preparation.'
            }
            actionHref="/blog"
            actionLabel={category ? 'Clear category filter' : undefined}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogData.posts.map((post) => (
                <Card
                  key={post.id}
                  hover
                  className="flex flex-col justify-between"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <Badge variant="primary" size="sm">
                        {post.category_name || 'Insights'}
                      </Badge>
                      {post.published_at && (
                        <time dateTime={post.published_at}>
                          {new Date(post.published_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      )}
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 transition">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 mt-3">
                      {post.excerpt || post.content}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <span className="text-xs text-slate-400 font-medium">
                      By {post.author_name || 'VELORA Team'}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 transition"
                    >
                      Read Article &rarr;
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            {blogData.pagination.totalPages > 1 && (
              <div className="pt-8 flex justify-center gap-2">
                {Array.from({ length: blogData.pagination.totalPages }, (_, i) => i + 1).map((p) => {
                  const targetUrl = category ? `/blog?category=${category}&page=${p}` : `/blog?page=${p}`;
                  const isActive = currentPage === p;
                  return (
                    <Link
                      key={p}
                      href={targetUrl}
                      className={`px-4 py-2 text-sm rounded-xl font-semibold transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
