'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagic, faCloudDownloadAlt, faCheckCircle, faSpinner, faExclamationTriangle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@/lib/supabaseBrowser';
import aiBlogs from '@/data/ai_blogs.json';

const supabase = createClient();

interface AIImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AIImportModal({ isOpen, onClose, onSuccess }: AIImportModalProps) {
    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // Check auth on open
    useEffect(() => {
        if (isOpen) {
            const checkAuth = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                console.log('Current Auth Session:', session ? 'Active' : 'Missing');
                setIsAuthenticated(!!session);
            };
            checkAuth();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImport = async () => {
        setImporting(true);
        setError(null);
        setProgress(5);

        try {
            // 1. Double check authentication
            const { data: { session }, error: authError } = await supabase.auth.getSession();

            if (authError || !session) {
                console.error('Auth verification failed:', authError);
                throw new Error('Aapka login session expire ho gaya hai. Please page refresh karke dobara login karein.');
            }

            setProgress(15);

            // 2. Prepare data
            const blogEntries = aiBlogs.map(blog => ({
                title: blog.title,
                slug: blog.slug,
                content: JSON.stringify(blog.content),
                excerpt: blog.excerpt,
                status: 'draft',
                seo_title: blog.seo_title,
                seo_description: blog.seo_description,
            }));

            // 3. Try individual inserts to bypass potential batch RLS issues 
            // and give granular feedback
            let successCount = 0;
            for (let i = 0; i < blogEntries.length; i++) {
                const blog = blogEntries[i];

                // Use upsert for each one
                const { error: insertError } = await supabase
                    .from('blogs')
                    .upsert(blog, { onConflict: 'slug' });

                if (insertError) {
                    console.error(`Error importing ${blog.slug}:`, insertError);
                    // If one fails due to RLS, the whole thing might be an auth issue
                    if (insertError.message.includes('row-level security')) {
                        throw new Error('RLS Policy Error: Aapko database mein likhne ki ijazat nahi hai. Admin credentials check karein.');
                    }
                } else {
                    successCount++;
                }

                setProgress(Math.round(15 + ((i + 1) / blogEntries.length) * 85));
            }

            if (successCount === 0) {
                throw new Error('Koyi bhi blog import nahi ho saka. Database permissions check karein.');
            }

            setDone(true);
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1500);

        } catch (err: any) {
            console.error('Import process caught error:', err);
            setError(err.message || 'An unexpected error occurred during import');
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
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Ready to import {aiBlogs.length} SEO optimized blogs</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="p-8">
                    {isAuthenticated === false && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                            <FontAwesomeIcon icon={faUserLock} className="text-red-600 mt-1" />
                            <div>
                                <h4 className="text-red-900 font-bold text-sm">Authentication Issue</h4>
                                <p className="text-red-700 text-xs mt-1">Aap logged in nahi dikh rahe hain. Please login page par ja kar dobara sign in karein.</p>
                            </div>
                        </div>
                    )}

                    {!importing && !done ? (
                        <div className="space-y-6">
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <p className="text-sm text-purple-900 leading-relaxed font-medium">
                                    I have prepared <strong>20 blog articles</strong> targeting your PDF and Text tools.
                                    These articles include SEO metadata, suggested headers, and CTAs.
                                </p>
                            </div>

                            <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-100 divide-y divide-gray-50">
                                {aiBlogs.map((blog, idx) => (
                                    <div key={idx} className="p-3 text-sm flex items-center gap-3 group hover:bg-gray-50 transition-colors">
                                        <div className="w-5 h-5 flex-shrink-0 rounded bg-gray-100 text-[10px] font-bold flex items-center justify-center text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600">
                                            {idx + 1}
                                        </div>
                                        <span className="font-bold text-gray-700 truncate">{blog.title}</span>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleImport}
                                disabled={isAuthenticated === false}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faCloudDownloadAlt} className="group-hover:translate-y-1 transition-transform" />
                                Import All to Drafts
                            </button>
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            {done ? (
                                <div className="space-y-4 animate-bounce">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-green-100">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">Import Complete!</h3>
                                        <p className="text-gray-500 font-bold mt-1">Redirecting to blog list...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 w-full px-8">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                                        <div
                                            className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"
                                        ></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-black text-purple-600">
                                            {progress}%
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900">Importing Articles...</h3>
                                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner uppercase">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest pt-2">Processing each article securely</p>
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
