"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoryApi } from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [error, setError] = useState('');

  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const token = getCookie('token');
      const response = await categoryApi.getAll(token);
      if (response.success) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = getCookie('token');
      if (editingCategory) {
        await categoryApi.update(editingCategory.id, formData, token);
      } else {
        await categoryApi.create(formData, token);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', slug: '' });
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const token = getCookie('token');
      await categoryApi.delete(id, token);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setFormData({ name, slug });
  };

  return (
    <div className="bg-gray-50">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10 p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg relative overflow-hidden">
            <h1 className="font-display text-4xl font-bold text-white relative z-10">Categories</h1>
            <button 
              onClick={() => {
                setEditingCategory(null);
                setFormData({ name: '', slug: '' });
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#d4a574] to-[#c9956c] text-white border-none rounded-xl font-sans text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative z-10"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10 font-sans text-base text-black/60">Loading categories...</div>
          ) : (
            <div className="bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Name</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Slug</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{category.name}</td>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{category.slug}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 mr-2 text-blue-500 hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-md rounded-none shadow-xl">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                  </h2>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      setEditingCategory(null);
                      setFormData({ name: '', slug: '' });
                      setError('');
                    }}
                    className="bg-transparent border-none text-3xl cursor-pointer text-black/60 leading-none"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  {error && <div className="bg-red-50 text-red-500 px-3 py-3 rounded-none mb-5 font-sans text-sm">{error}</div>}
                  
                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleNameChange}
                      required
                      placeholder="Category name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      placeholder="category-slug"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-300 text-[#2a2620] font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-[#c9a876] text-white border-none font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-[#7a341e]">
                      {editingCategory ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
      </div>
    </main>
  </div>
  );
}
