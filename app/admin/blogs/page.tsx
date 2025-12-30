'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseBrowser';
import { BlogPost } from '@/types/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEye, faList, faExclamationCircle, faCheckCircle, faLink, faMagic } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import AIImportModal from '@/components/admin/AIImportModal';

export default function AdminBlogsPage() {
    const supabase = useMemo(() => createClient(), []);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blogs')
            .select(`
                *,
                blog_categories ( name )
            `)
            .order('created_at', { ascending: false });

        if (data) {
            setBlogs(data as BlogPost[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (!error) fetchBlogs();
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading blogs...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <FontAwesomeIcon icon={faList} className="text-blue-600" />
                    All Blogs
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAIModalOpen(true)}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 shadow-md flex items-center gap-2 transition-all"
                    >
                        <FontAwesomeIcon icon={faMagic} /> AI Assistant
                    </button>
                    <Link href="/admin/blogs/new" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md flex items-center gap-2">
                        <FontAwesomeIcon icon={faPlus} /> New Blog
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">SEO Health</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No blogs created yet.
                                </td>
                            </tr>
                        ) : (
                            blogs.map(blog => (
                                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            /{blog.slug}
                                        </div>
                                        {/* Category Badge */}
                                        {blog.blog_categories && (
                                            <div className="inline-block bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded mt-2 font-bold uppercase">
                                                {blog.blog_categories.name}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* SEO Health Badge */}
                                        {blog.status === 'published' ? (
                                            blog.is_orphan ? (
                                                <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full w-fit border border-yellow-200" title="No internal links or tools connected">
                                                    <FontAwesomeIcon icon={faExclamationCircle} className="text-sm" />
                                                    <span className="text-xs font-bold">Orphan</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit border border-green-200">
                                                    <FontAwesomeIcon icon={faLink} className="text-sm" />
                                                    <span className="text-xs font-bold">Linked</span>
                                                </div>
                                            )
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Draft</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(new Date(blog.created_at), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/blog/${blog.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600 p-2" title="View">
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                        <Link href={`/admin/blogs/${blog.slug}`} className="text-blue-500 hover:text-blue-700 p-2" title="Edit">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <button onClick={() => handleDelete(blog.id)} className="text-red-400 hover:text-red-600 p-2" title="Delete">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AIImportModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onSuccess={fetchBlogs}
            />
        </div>
    );
}

