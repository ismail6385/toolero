'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { BlogPost, BlogCategory, BlockData } from '@/types/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSave, faCog, faTimes, faImage, faMagic, faCheckCircle, faExclamationCircle, faLink, faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import BlockCanvas from './blocks/BlockCanvas';
import { SuggestionTool } from '@/lib/linkSuggestions';

interface BlogEditorProps {
    post?: BlogPost;
}

export default function BlogEditor({ post }: BlogEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    // Data State
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [tools, setTools] = useState<SuggestionTool[]>([]);

    // Form State (Meta)
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
    const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '');
    const [categoryId, setCategoryId] = useState(post?.category_id || '');

    // SEO State
    const [seoTitle, setSeoTitle] = useState(post?.seo_title || '');
    const [seoDesc, setSeoDesc] = useState(post?.seo_description || '');

    // BLOCK EDITOR STATE
    const [blocks, setBlocks] = useState<BlockData[]>([]);

    // UI State
    const [showSidebar, setShowSidebar] = useState(true);

    // Initial Load
    useEffect(() => {
        const initData = async () => {
            // 1. Categories
            const { data: cats } = await supabase.from('blog_categories').select('*').order('name');
            if (cats) setCategories(cats as BlogCategory[]);

            // 2. Tools (For SEO Logic)
            try {
                const { data: toolsData } = await supabase.from('tools').select('id, name, slug, intent_keywords').limit(1000);
                if (toolsData) setTools(toolsData as any[]);
            } catch (e) {
                console.warn('Tools fetch failed', e);
            }

            // 3. Parse Content -> Blocks
            if (post?.content) {
                try {
                    const parsed = typeof post.content === 'string' ? JSON.parse(post.content) : post.content;
                    if (Array.isArray(parsed)) {
                        setBlocks(parsed);
                    } else {
                        throw new Error('Not array');
                    }
                } catch (e) {
                    // Fallback: Legacy Markdown string
                    const legacyContent = typeof post.content === 'string' ? post.content : '';
                    const newBlocks: BlockData[] = legacyContent.split(/\n\n+/).map(p => {
                        const id = Math.random().toString(36).substr(2, 9);
                        if (p.startsWith('# ')) return { id, type: 'heading', level: 1, content: p.replace('# ', '') } as BlockData;
                        if (p.startsWith('## ')) return { id, type: 'heading', level: 2, content: p.replace('## ', '') } as BlockData;
                        if (p.startsWith('### ')) return { id, type: 'heading', level: 3, content: p.replace('### ', '') } as BlockData;
                        const imgMatch = p.match(/^!\[(.*?)\]\((.*?)\)$/);
                        if (imgMatch) {
                            return { id, type: 'image', url: imgMatch[2], alt: imgMatch[1] } as BlockData;
                        }
                        return { id, type: 'paragraph', content: p } as BlockData;
                    }).filter(b => b.content || b.url);

                    if (newBlocks.length === 0) newBlocks.push({ id: 'init', type: 'paragraph', content: '' } as BlockData);
                    setBlocks(newBlocks as BlockData[]);
                }
            } else {
                setBlocks([{ id: 'init', type: 'paragraph', content: '' } as BlockData]);
            }
        };
        initData();
    }, [post]);

    // Computed SEO Health
    const activeToolLinks = tools.filter(t => blocks.some(b => (b.content || '').includes(`/tools/${t.slug}`)));
    const internalLinkCount = blocks.reduce((acc, b) => {
        return acc + ((b.content || '').match(/\]\(\/(blog|tools)\//g) || []).length;
    }, 0);
    const isOrphan = activeToolLinks.length === 0 && internalLinkCount === 0;

    // Computed Suggestions (Simple match against title/content)
    const suggestedTools = tools.filter(t => {
        if (activeToolLinks.some(active => active.id === t.id)) return false; // Already linked
        const fullContent = (title + ' ' + blocks.map(b => b.content).join(' ')).toLowerCase();
        // Check if name exists in content
        if (fullContent.includes(t.name.toLowerCase())) return true;
        // Check keywords (simplified)
        if (t.intent_keywords?.some((k: string) => fullContent.includes(k.toLowerCase()))) return true;
        return false;
    }).slice(0, 5);


    // Helpers
    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const generateSlug = () => {
        const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setSlug(newSlug);
    };

    const handleBlockImageUpload = async (file: File): Promise<string> => {
        const altText = window.prompt('Describe image for SEO:', file.name.split('.')[0]);
        if (altText === null) throw new Error('Cancelled');

        const fileExt = file.name.split('.').pop();
        const safeName = altText ? altText.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'img';
        const fileName = `content-${safeName}-${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
        if (error) throw error;

        const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
        return data.publicUrl;
    };

    const handleFeaturedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const safeTitle = title ? title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'untitled';
        const fileName = `featured-${safeTitle}-${Date.now()}.${fileExt}`;

        setLoading(true);
        const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
        if (error) {
            showToast('Error: ' + error.message, 'error');
        } else {
            const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
            setFeaturedImage(data.publicUrl);
        }
        setLoading(false);
    };

    const handleSubmit = async () => {
        if (!title) return showToast('Title is required', 'error');
        setLoading(true);
        const contentJson = JSON.stringify(blocks);

        // SEO Calculations
        const linkedToolIds = activeToolLinks.map(t => t.id);
        const finalIsOrphan = linkedToolIds.length === 0 && internalLinkCount === 0;

        const blogData = {
            title,
            slug,
            content: contentJson,
            excerpt,
            status,
            featured_image: featuredImage,
            category_id: categoryId || null,
            linked_tool_ids: linkedToolIds,
            internal_link_count: internalLinkCount,
            is_orphan: finalIsOrphan,
            seo_title: seoTitle || title,
            seo_description: seoDesc || excerpt,
            updated_at: new Date().toISOString(),
            published_at: status === 'published' && (!post || post.status === 'draft') ? new Date().toISOString() : post?.published_at
        };

        const { error } = post?.id
            ? await supabase.from('blogs').update(blogData).eq('id', post.id)
            : await supabase.from('blogs').insert([blogData]);

        if (error) {
            showToast('Error saving: ' + error.message, 'error');
        } else {
            showToast('Saved successfully! 🚀', 'success');
            if (!post?.id) {
                setTimeout(() => {
                    router.push('/admin/blogs');
                    router.refresh();
                }, 1000);
            } else {
                router.refresh();
            }
        }
        setLoading(false);
    };

    // Shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div className="flex flex-col h-screen bg-white relative">

            {/* Toast */}
            {notification && (
                <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-in ${notification.type === 'success' ? 'bg-slate-900/90 text-white' : 'bg-red-500 text-white'}`}>
                    <FontAwesomeIcon icon={notification.type === 'success' ? faCheckCircle : faExclamationCircle} />
                    <span className="font-bold text-sm">{notification.msg}</span>
                </div>
            )}

            {/* Top Bar */}
            <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-white sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 font-bold text-xl">←</button>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {status}
                    </span>
                    {/* Orphan Badge in Top Bar for Visibility */}
                    {isOrphan && (
                        <span className="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-yellow-200 flex items-center gap-1">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Orphan
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setShowSidebar(!showSidebar)} className={`p-2 rounded hover:bg-gray-100 ${showSidebar ? 'text-blue-600' : 'text-gray-400'}`}>
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                    <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 font-bold ml-2 disabled:opacity-50 transition-all text-sm">
                        {loading ? 'Saving...' : (post ? 'Update' : 'Publish')}
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-gray-50/30 scroll-smooth">
                    <div className="mx-auto max-w-4xl min-h-screen p-8 md:p-16">
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full text-5xl font-black text-gray-900 border-none outline-none placeholder-gray-300 bg-transparent mb-12 leading-tight" placeholder="Post Title" autoFocus />
                        <BlockCanvas blocks={blocks} onChange={setBlocks} uploadHandler={handleBlockImageUpload} tools={tools} />
                    </div>
                </div>

                {/* Sidebar */}
                {showSidebar && (
                    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto hidden lg:block shrink-0 z-20 pb-20">
                        <div className="p-6 space-y-8">

                            {/* SEO HEALTH PANEL */}
                            <div className={`p-4 rounded-xl border ${isOrphan ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
                                <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${isOrphan ? 'text-yellow-700' : 'text-green-700'}`}>
                                    SEO Health
                                </h3>

                                {isOrphan ? (
                                    <div className="text-sm text-yellow-800 space-y-2">
                                        <p className="flex gap-2 items-start"><FontAwesomeIcon icon={faExclamationCircle} className="mt-1" /> This blog is an <strong>Orphan</strong>.</p>
                                        <p className="text-xs opacity-80">It has no internal links to Tools or other Blogs.</p>

                                        {suggestedTools.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-yellow-200/50">
                                                <p className="text-xs font-bold mb-2">Suggested Tools to Link:</p>
                                                <div className="space-y-1">
                                                    {suggestedTools.map(t => (
                                                        <div key={t.id} className="bg-white/50 p-1.5 rounded flex items-center justify-between text-xs cursor-pointer hover:bg-white" title="Type '/' in editor to link">
                                                            <span className="truncate flex-1">{t.name}</span>
                                                            <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-sm text-green-800 space-y-1">
                                        <p className="flex gap-2 items-center"><FontAwesomeIcon icon={faCheckCircle} /> Well Connected</p>
                                        <p className="text-xs opacity-80">
                                            {activeToolLinks.length} Tool(s) Linked<br />
                                            {internalLinkCount} Internal Link(s)
                                        </p>
                                    </div>
                                )}
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Publishing</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Category</h3>
                                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50">
                                    <option value="">Select...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Slug</label>
                                <div className="flex gap-1">
                                    <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-2 border border-gray-200 rounded text-sm font-mono text-gray-500 bg-gray-50" />
                                    <button onClick={generateSlug} className="text-gray-400 hover:text-blue-500"><FontAwesomeIcon icon={faMagic} /></button>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Featured Image</h3>
                                {featuredImage ? (
                                    <div className="relative group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={featuredImage} alt="Cover" className="w-full h-32 object-cover rounded shadow-sm" />
                                        <button onClick={() => setFeaturedImage('')} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs"><FontAwesomeIcon icon={faTimes} /></button>
                                    </div>
                                ) : (
                                    <div onClick={() => document.getElementById('feat-upload')?.click()} className="border-2 border-dashed border-gray-200 rounded p-6 text-center cursor-pointer hover:bg-blue-50">
                                        <FontAwesomeIcon icon={faImage} className="text-gray-400 text-xl" />
                                        <p className="text-xs text-gray-400 mt-2">Set cover</p>
                                    </div>
                                )}
                                <input id="feat-upload" type="file" accept="image/*" onChange={handleFeaturedImage} className="hidden" />
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Linked Tools</h3>
                                <div className="space-y-1">
                                    {activeToolLinks.map(t => (
                                        <div key={t.id} className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                            <FontAwesomeIcon icon={faLink} className="text-blue-500 text-xs" />
                                            <span className="truncate">{t.name}</span>
                                        </div>
                                    ))}
                                    {activeToolLinks.length === 0 && <p className="text-xs text-gray-400 italic">No tools linked yet.</p>}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">SEO Metadata</h3>
                                <input placeholder="SEO Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full p-2 border border-gray-200 text-sm rounded bg-gray-50" />
                                <textarea placeholder="Meta Description" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} className="w-full p-2 border border-gray-200 text-sm rounded bg-gray-50 h-20" />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
