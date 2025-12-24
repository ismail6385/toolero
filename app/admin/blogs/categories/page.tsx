'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BlogCategory } from '@/types/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [newCatName, setNewCatName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        const { data } = await supabase.from('blog_categories').select('*').order('name');
        if (data) setCategories(data as BlogCategory[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName.trim()) return;

        const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const { error } = await supabase
            .from('blog_categories')
            .insert([{ name: newCatName, slug }]);

        if (error) {
            alert('Error creating category: ' + error.message);
        } else {
            setNewCatName('');
            fetchCategories();
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this category?')) return;

        const { error } = await supabase.from('blog_categories').delete().eq('id', id);
        if (!error) {
            setCategories(categories.filter(c => c.id !== id));
        } else {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Categories</h1>

            {/* Create Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <form onSubmit={handleCreate} className="flex gap-4">
                    <input
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        placeholder="New Category Name (e.g., Tutorials)"
                        className="flex-1 p-3 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Category
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={3} className="p-8 text-center text-gray-500">Loading...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={3} className="p-8 text-center text-gray-500">No categories found.</td></tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                    <td className="p-4 font-bold text-gray-800">{cat.name}</td>
                                    <td className="p-4 font-mono text-sm text-gray-500">{cat.slug}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
