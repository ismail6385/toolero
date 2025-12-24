import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import BlogRenderer from '@/components/BlogRenderer';

export const revalidate = 3600;

interface Props {
    params: { slug: string };
}

// 1. Generate SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: post } = await supabase
        .from('blogs')
        .select('seo_title, seo_description, title, excerpt, featured_image')
        .eq('slug', params.slug)
        .eq('status', 'published') // Only published for SEO
        .single();

    if (!post) return {
        title: 'Blog no encontrado | Toolero',
        description: 'El artículo que buscas no existe o ha sido movido.'
    };

    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        openGraph: {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
            images: post.featured_image ? [post.featured_image] : [],
        }
    };
}

// 2. Generate Static Params for SSG
export async function generateStaticParams() {
    const { data: posts } = await supabase
        .from('blogs')
        .select('slug')
        .eq('status', 'published');

    return posts?.map((post) => ({
        slug: post.slug,
    })) || [];
}

// 3. Page Component
export default async function BlogPostPage({ params }: Props) {
    const { data: rawPost } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!rawPost) {
        notFound();
    }

    const post = rawPost as BlogPost;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb / Nav */}
            <nav className="border-b border-gray-100 bg-gray-50/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link></li>
                        <li>/</li>
                        <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
                    </ol>
                </div>
            </nav>

            {/* Header Hero */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
                <div className="flex items-center justify-center gap-4 text-sm font-bold text-blue-600 uppercase tracking-wider mb-6">
                    {post.published_at && (
                        <time dateTime={post.published_at}>
                            {format(new Date(post.published_at), 'd MMMM, yyyy', { locale: es })}
                        </time>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                    {post.title}
                </h1>

                {post.excerpt && (
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                        {post.excerpt}
                    </p>
                )}

                {/* Author (Static for now) */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        TL
                    </div>
                    <div className="text-left leading-tight">
                        <div className="font-bold text-gray-900 text-sm">Equipo Toolero</div>
                        <div className="text-gray-400 text-xs">Redacción</div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <BlogRenderer content={post.content} />

                {/* Footer Share / Nav */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium"
                    >
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                        Volver a todos los artículos
                    </Link>
                </div>
            </article>
        </div>
    );
}
