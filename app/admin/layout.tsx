'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faSignOutAlt, faPlus, faList, faTags } from '@fortawesome/free-solid-svg-icons';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh(); // Clear server state
    };

    const navItems = [
        { name: 'All Blogs', href: '/admin/blogs', icon: faList },
        { name: 'New Blog', href: '/admin/blogs/new', icon: faPlus },
        { name: 'Categories', href: '/admin/blogs/categories', icon: faTags },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FontAwesomeIcon icon={faNewspaper} />
                        Toolero Admin
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header (placeholder) */}

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[500px] p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
