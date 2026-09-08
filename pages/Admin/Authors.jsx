"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authorApi } from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Authors() {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: '', bio: '', image: null });
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
    fetchAuthors();
  }, [router]);

  const fetchAuthors = async () => {
    try {
      const token = getCookie('token');
      const response = await authorApi.getAll(token);
      if (response.success) {
        setAuthors(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch authors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = getCookie('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('bio', formData.bio);
      
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      } else if (formData.image && typeof formData.image === 'string') {
        data.append('image', formData.image);
      }

      if (editingAuthor) {
        await authorApi.update(editingAuthor.id, data, token);
      } else {
        await authorApi.create(data, token);
      }
      setShowModal(false);
      setEditingAuthor(null);
      setFormData({ name: '', bio: '', image: null });
      fetchAuthors();
    } catch (err) {
      setError(err.message || 'Failed to save author');
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setFormData({ name: author.name, bio: author.bio || '', image: author.image || null });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this author?')) return;

    try {
      const token = getCookie('token');
      await authorApi.delete(id, token);
      fetchAuthors();
    } catch (err) {
      setError(err.message || 'Failed to delete author');
    }
  };

  return (
    <div className="bg-gray-50">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10 p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg relative overflow-hidden">
            <h1 className="font-display text-4xl font-bold text-white relative z-10">Authors</h1>
            <button 
              onClick={() => {
                setEditingAuthor(null);
                setFormData({ name: '', bio: '', image: null });
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#d4a574] to-[#c9956c] text-white border-none rounded-xl font-sans text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative z-10"
            >
              <Plus size={20} />
              Add Author
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10 font-sans text-base text-black/60">Loading authors...</div>
          ) : (
            <div className="bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Name</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Bio</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Image</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author) => (
                    <tr key={author.id}>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{author.name}</td>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{author.bio ? author.bio.substring(0, 100) + '...' : '-'}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        {author.image ? (
                          <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${author.image}`} alt={author.name} className="w-12 h-12 object-cover" />
                        ) : '-'}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button 
                          onClick={() => handleEdit(author)}
                          className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 mr-2 text-blue-500 hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(author.id)}
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
                  <h2 className="font-display text-2xl font-bold text-[#2a2620]">
                    {editingAuthor ? 'Edit Author' : 'Add Author'}
                  </h2>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      setEditingAuthor(null);
                      setFormData({ name: '', bio: '', image: '' });
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Author name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      placeholder="Author bio"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)] resize-y"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Image</label>
                    {editingAuthor && formData.image && typeof formData.image === 'string' && (
                      <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-none">
                        <img 
                          src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${formData.image}`} 
                          alt="Current image" 
                          className="w-24 h-24 object-cover rounded-none mb-2"
                        />
                        <p className="font-sans text-xs text-black/60 m-0">Current image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      className="w-full border border-black rounded-none p-2 font-sans text-sm text-[#2a2620] cursor-pointer file:mr-4 file:px-5 file:py-2.5 file:bg-[#2a2620] file:text-white file:border file:border-black file:rounded-none file:font-sans file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-[#c9a876] file:transition-colors"
                    />
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-300 text-[#2a2620] font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-[#c9a876] text-white border-none font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-[#7a341e]">
                      {editingAuthor ? 'Update' : 'Create'}
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
