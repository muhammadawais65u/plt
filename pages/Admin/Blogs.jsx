"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { blogApi, authorApi, categoryApi } from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    slug: '',
    title: '',
    shortDescription: '',
    image: null,
    imageAlt: '',
    metaKeywords: '',
    mainContent: '',
    authorId: '',
    status: 'draft',
    categoryIds: [],
  });
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
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = getCookie('token');
      const [blogsRes, authorsRes, categoriesRes] = await Promise.all([
        blogApi.getAll({}, token),
        authorApi.getAll(token),
        categoryApi.getAll(token),
      ]);

      if (blogsRes.success) setBlogs(blogsRes.data);
      if (authorsRes.success) setAuthors(authorsRes.data);
      if (categoriesRes.success) setCategories(categoriesRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
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
      data.append('metaTitle', formData.metaTitle);
      data.append('metaDescription', formData.metaDescription);
      data.append('slug', formData.slug);
      data.append('title', formData.title);
      data.append('shortDescription', formData.shortDescription);
      data.append('imageAlt', formData.imageAlt);
      data.append('metaKeywords', formData.metaKeywords);
      data.append('mainContent', formData.mainContent);
      data.append('authorId', formData.authorId);
      data.append('status', formData.status);
      data.append('categoryIds', JSON.stringify(formData.categoryIds));
      
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      } else if (formData.image && typeof formData.image === 'string') {
        data.append('image', formData.image);
      }

      if (editingBlog) {
        await blogApi.update(editingBlog.id, data, token);
      } else {
        await blogApi.create(data, token);
      }
      setShowModal(false);
      setEditingBlog(null);
      resetFormData();
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      slug: blog.slug,
      title: blog.title,
      shortDescription: blog.shortDescription || '',
      image: blog.image || null,
      imageAlt: blog.imageAlt || '',
      metaKeywords: blog.metaKeywords || '',
      mainContent: blog.mainContent,
      authorId: blog.authorId || '',
      status: blog.status,
      categoryIds: blog.categories?.map(c => c.id) || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = getCookie('token');
      await blogApi.delete(id, token);
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete blog');
    }
  };

  const resetFormData = () => {
    setFormData({
      metaTitle: '',
      metaDescription: '',
      slug: '',
      title: '',
      shortDescription: '',
      image: null,
      imageAlt: '',
      metaKeywords: '',
      mainContent: '',
      authorId: '',
      status: 'draft',
      categoryIds: [],
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleCategoryToggle = (categoryId) => {
    const newCategoryIds = formData.categoryIds.includes(categoryId)
      ? formData.categoryIds.filter(id => id !== categoryId)
      : [...formData.categoryIds, categoryId];
    setFormData({ ...formData, categoryIds: newCategoryIds });
  };

  return (
    <div className="bg-gray-50">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10 p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg relative overflow-hidden">
            <h1 className="font-display text-4xl font-bold text-white relative z-10">Blogs</h1>
            <button 
              onClick={() => {
                setEditingBlog(null);
                resetFormData();
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#d4a574] to-[#c9956c] text-white border-none rounded-xl font-sans text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative z-10"
            >
              <Plus size={20} />
              Add Blog
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10 font-sans text-base text-black/60">Loading blogs...</div>
          ) : (
            <div className="bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Title</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Author</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Status</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Categories</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[#2a2620] border-b-2 border-[#c9a876]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{blog.title}</td>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{blog.author?.name || '-'}</td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <span className={`px-3 py-1 rounded-none text-xs font-semibold uppercase ${blog.status === 'draft' ? 'bg-gray-100 text-gray-600' : blog.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">
                        {blog.categories?.map(c => c.name).join(', ') || '-'}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200">
                        <button 
                          onClick={() => handleEdit(blog)}
                          className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 mr-2 text-blue-500 hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-5">
              <div className="bg-white w-full max-w-4xl rounded-none shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <h2 className="font-display text-2xl font-bold text-[#2a2620]">
                    {editingBlog ? 'Edit Blog' : 'Add Blog'}
                  </h2>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      setEditingBlog(null);
                      resetFormData();
                      setError('');
                    }}
                    className="bg-transparent border-none text-3xl cursor-pointer text-black/60 leading-none"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  {error && <div className="bg-red-50 text-red-500 px-3 py-3 rounded-none mb-5 font-sans text-sm">{error}</div>}
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="mb-0">
                      <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                        placeholder="Blog title"
                        className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                      />
                    </div>

                    <div className="mb-0">
                      <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Slug *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        placeholder="blog-slug"
                        className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="mb-5">
                      <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Author</label>
                      <select
                        value={formData.authorId}
                        onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                      >
                        <option value="">Select author</option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Categories</label>
                    <div className="flex flex-wrap gap-4">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 font-sans text-base text-[#2a2620] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.categoryIds.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="w-auto"
                          />
                          {category.name}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Short Description</label>
                    <textarea
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      rows={3}
                      placeholder="Brief description for preview"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)] resize-y"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Image</label>
                    {editingBlog && formData.image && typeof formData.image === 'string' && (
                      <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-none relative">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
                        >
                          ×
                        </button>
                        <img 
                          src={`https://backend-production-1c502.up.railway.app/api${formData.image}`} 
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

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Image Alt Text</label>
                    <input
                      type="text"
                      value={formData.imageAlt}
                      onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                      placeholder="Image description for accessibility"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO title"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Meta Description</label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={2}
                      placeholder="SEO description"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)] resize-y"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={formData.metaKeywords}
                      onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[#c9a876] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-sans text-sm font-semibold text-[#2a2620] mb-2">Main Content *</label>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                      value={formData.mainContent}
                      onEditorChange={(content) => setFormData({ ...formData, mainContent: content })}
                      init={{
                        height: 400,
                        menubar: true,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    />
                  </div>

                  <div className="flex gap-3 justify-end mt-6 sticky bottom-0 bg-white pt-5 border-t border-gray-200">
                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-300 text-[#2a2620] font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-[#c9a876] text-white border-none font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-[#7a341e]">
                      {editingBlog ? 'Update' : 'Create'}
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
