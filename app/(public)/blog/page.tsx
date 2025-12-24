import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata: Metadata = {
    title: 'Blog de Toolero | Tutoriales, Guías y Novedades',
    description: 'Aprende a usar nuestras herramientas y descubre trucos de productividad, desarrollo y tecnología en el blog oficial de Toolero.',
};

export default async function BlogIndexPage() {
    const { data: posts, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return <div className="text-center py-20 text-red-500">Error cargando el blog.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Recursos</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Guías detalladas, tutoriales paso a paso y noticias sobre nuestras herramientas.
                </p>
            </header>

            {!posts || posts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 text-lg">Próximamente publicaremos nuestros primeros artículos.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: BlogPost) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                            <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden group">
                                {post.featured_image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-3xl">
                                        Toolero
                                    </div>
                                )}
                            </Link>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        {post.published_at ? format(new Date(post.published_at), 'd MMM yyyy', { locale: es }) : 'Borrador'}
                                    </span>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-blue-600 font-bold text-sm hover:underline"
                                    >
                                        Leer artículo →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
