'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { createClient } from '@/lib/supabaseBrowser';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    // Memoize client to prevent "Multiple GoTrueClient" warning
    const supabase = useMemo(() => createClient(), []);

    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Prevent Hydration Mismatch from extensions (Bitdefender, LastPass, etc.)
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log("Intentando login con:", email);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Login falló:", error);
            setError(error.message);
            setLoading(false);
        } else {
            console.log("Login exitoso, redirigiendo...", data);
            const next = searchParams.get('next') || '/admin/blogs';
            router.refresh(); // Sync cookies with server
            router.push(next);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            autoComplete="off"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            autoComplete="off"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Entrando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <LoginForm />
        </Suspense>
    );
}
