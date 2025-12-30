'use client';

import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagic, faCloudDownloadAlt, faCheckCircle, faSpinner, faExclamationTriangle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@/lib/supabaseBrowser';
import aiBlogs from '@/data/ai_blogs.json';

interface AIImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AIImportModal({ isOpen, onClose, onSuccess }: AIImportModalProps) {
    // Memoize client to ensure single instance inside component
    const supabase = useMemo(() => createClient(), []);

    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    // Initial check
    useEffect(() => {
        if (isOpen) {
            const checkUser = async () => {
                const { data: { user } } = await supabase.auth.getUser();
                console.log('Importer User Status:', user ? `Logged in as ${user.email}` : 'Not logged in');
                setUser(user);
            };
            checkUser();
        }
    }, [isOpen, supabase]);

    if (!isOpen) return null;

    const handleImport = async () => {
        setImporting(true);
        setError(null);
        setProgress(5);

        try {
            // 1. Check user one more time
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (!currentUser) throw new Error('Aap logged in nahi hain. Please page refresh karke login karein.');

            setProgress(15);

            let successCount = 0;
            let errors: string[] = [];

            for (let i = 0; i < aiBlogs.length; i++) {
                const blog = aiBlogs[i];
                const blogData = {
                    title: blog.title,
                    slug: blog.slug,
                    content: JSON.stringify(blog.content),
                    excerpt: blog.excerpt,
                    status: 'draft',
                    seo_title: blog.seo_title,
                    seo_description: blog.seo_description,
                };

                // Use simple insert instead of upsert for clearer RLS testing
                const { error: insertError } = await supabase
                    .from('blogs')
                    .insert([blogData]);

                if (insertError) {
                    // If slug exists, we ignore it (unique constraint)
                    if (insertError.code === '23505') {
                        console.warn(`Slug skipped (already exists): ${blog.slug}`);
                        successCount++; // Count as success since it's already there
                    } else {
                        console.error(`Error for ${blog.slug}:`, insertError);
                        errors.push(insertError.message);
                    }
                } else {
                    successCount++;
                }

                setProgress(Math.round(15 + ((i + 1) / aiBlogs.length) * 85));
            }

            if (errors.length > 0) {
                // If all failed with RLS, show specific message
                if (errors.every(e => e.toLowerCase().includes('row-level security'))) {
                    throw new Error('RLS Error: Database policies aapko records add karne se rok rahi hain. Role: ' + (currentUser.role || 'unknown'));
                }
                throw new Error(`Kujh masla hua: ${errors[0]}. (${successCount} blogs successful)`);
            }

            setDone(true);
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1500);

        } catch (err: any) {
            console.error('Final Import Error:', err);
            setError(err.message || 'An unexpected error occurred');
            setImporting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                            <FontAwesomeIcon icon={faMagic} className="text-purple-600" />
                            AI Content Assistant
                        </h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Ready to import {aiBlogs.length} articles</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="p-8">
                    {!user && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                            <FontAwesomeIcon icon={faUserLock} className="text-red-600 mt-1" />
                            <div>
                                <h4 className="text-red-900 font-bold text-sm">Session Missing</h4>
                                <p className="text-red-700 text-xs mt-1">Aap logged in nahi hain. Pehle login karein phir ye tool chalega.</p>
                            </div>
                        </div>
                    )}

                    {!importing && !done ? (
                        <div className="space-y-6">
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <p className="text-sm text-purple-900/80 leading-relaxed">
                                    Aapke tools ke liye <strong>{aiBlogs.length} SEO articles</strong> ready hain. Inhe import karke aap edit bhi kar sakenge.
                                </p>
                                {user && (
                                    <p className="text-[10px] text-purple-400 mt-2">Logged in as: {user.email}</p>
                                )}
                            </div>

                            <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-100 divide-y divide-gray-50 bg-gray-50/50">
                                {aiBlogs.map((blog, idx) => (
                                    <div key={idx} className="p-3 text-sm flex items-center gap-3 group">
                                        <div className="w-5 h-5 flex-shrink-0 rounded bg-white border border-gray-100 text-[10px] font-bold flex items-center justify-center text-gray-400 group-hover:border-purple-200 group-hover:text-purple-600">
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-gray-600 truncate">{blog.title}</span>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-100 flex items-start gap-3">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mt-0.5" />
                                    <span>Error: {error}</span>
                                </div>
                            )}

                            <button
                                onClick={handleImport}
                                disabled={!user}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faCloudDownloadAlt} className="group-hover:translate-y-1 transition-transform" />
                                Confirm Batch Import
                            </button>
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            {done ? (
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-green-100 mx-auto">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">Success!</h3>
                                    <p className="text-gray-500 font-bold">Blogs are now in your drafts.</p>
                                </div>
                            ) : (
                                <div className="space-y-8 w-full px-8">
                                    <div className="relative w-24 h-24 mx-auto font-black text-purple-600 flex items-center justify-center text-xl">
                                        {progress}%
                                        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-gray-900 italic">Processing Database...</h3>
                                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
