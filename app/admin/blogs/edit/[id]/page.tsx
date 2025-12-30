'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';
import BlogEditor from '@/components/admin/BlogEditor';
import { BlogPost } from '@/types/blog';

export default function EditBlogPage() {
    const supabase = useMemo(() => createClient(), []);
    const params = useParams();
    const id = params?.id as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching blog:', error);
                alert('Blog no encontrado');
            } else {
                setPost(data as BlogPost);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Cargando editor...</div>;
    if (!post) return <div className="p-8 text-center text-red-500">Blog no encontrado.</div>;

    return <BlogEditor post={post} />;
}
