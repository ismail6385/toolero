import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Props {
    toolSlug: string;
}

export default async function HelpfulGuides({ toolSlug }: Props) {
    if (!toolSlug) return null;

    // 1. Get Tool ID from slug
    // Ensure accurate matching for SEO slugs
    const { data: tool } = await supabase
        .from('tools')
        .select('id')
        .eq('slug', toolSlug)
        .single();

    if (!tool) return null;

    // 2. Fetch blogs that link to this tool
    const { data: blogs } = await supabase
        .from('blogs')
        .select('title, slug, excerpt, featured_image, published_at')
        .contains('linked_tool_ids', [tool.id]) // Uses Postgres array match
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="w-full bg-slate-50 border-t border-slate-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                        📚
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Guides & Tutorials</h3>
                        <p className="text-sm text-gray-500">Learn more about how to use this tool effectively</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group block h-full">
                            <article className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full hover:shadow-md hover:border-blue-300 transition-all hover:-translate-y-1">
                                {blog.featured_image && (
                                    <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={blog.featured_image}
                                            alt={blog.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                    </div>
                                )}
                                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight mb-2 text-lg">
                                    {blog.title}
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {blog.excerpt || 'Read this step-by-step guide to master your workflow.'}
                                </p>
                                <div className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                    Read Article <span>→</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
