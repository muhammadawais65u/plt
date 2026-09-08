"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectApi, getImageUrl } from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

const EMPTY_FORM = {
  title: '',
  location: '',
  tag: 'In Planning',
  description: '',
  type: '',
  handover: '',
  payment: '',
  primaryButtonText: '',
  primaryButtonLink: '',
  secondaryButtonText: '',
  secondaryButtonLink: '',
  image: null,
  images: [],
  imageAlt: '',
  publication_status: 'draft',
};

const BADGES = ['High Demand', 'High Trending'];
const STATUSES = ['In Planning', 'In Development', 'Coming Soon'];
const TAGS = [...BADGES, ...STATUSES];

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
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
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const token = getCookie('token');
      const response = await projectApi.getAll({}, token);
      if (response.success) {
        setProjects(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
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
      const isBadge = BADGES.includes(formData.tag);
      data.append('title', formData.title);
      data.append('location', formData.location);
      data.append('badge', isBadge ? formData.tag : '');
      data.append('status', isBadge ? 'In Planning' : formData.tag);
      data.append('description', formData.description);
      data.append('type', formData.type);
      data.append('handover', formData.handover);
      data.append('payment', formData.payment);
      data.append('primaryButtonText', formData.primaryButtonText);
      data.append('primaryButtonLink', formData.primaryButtonLink);
      data.append('secondaryButtonText', formData.secondaryButtonText);
      data.append('secondaryButtonLink', formData.secondaryButtonLink);
      data.append('imageAlt', formData.imageAlt);
      data.append('publication_status', formData.publication_status);

      if (formData.image instanceof File) {
        data.append('image', formData.image);
      } else if (formData.image && typeof formData.image === 'string') {
        data.append('image', formData.image);
      }

      // Handle multiple images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((img) => {
          if (img instanceof File) {
            data.append('images', img);
          }
        });
      }

      if (editingProject) {
        await projectApi.update(editingProject.id, data, token);
      } else {
        await projectApi.create(data, token);
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      location: project.location || '',
      tag: project.badge || project.status || 'In Planning',
      description: project.description || '',
      type: project.type || '',
      handover: project.handover || '',
      payment: project.payment || '',
      primaryButtonText: project.primaryButtonText || '',
      primaryButtonLink: project.primaryButtonLink || '',
      secondaryButtonText: project.secondaryButtonText || '',
      secondaryButtonLink: project.secondaryButtonLink || '',
      image: project.image || null,
      images: project.images || [],
      imageAlt: project.imageAlt || '',
      publication_status: project.publication_status || 'published',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = getCookie('token');
      await projectApi.delete(id, token);
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    }
  };

  const handleToggleStatus = async (project) => {
    try {
      const token = getCookie('token');
      const newStatus = project.publication_status === 'published' ? 'draft' : 'published';
      const data = new FormData();
      data.append('publication_status', newStatus);
      data.append('title', project.title);
      data.append('location', project.location || '');
      data.append('badge', project.badge || '');
      data.append('status', project.status || 'In Planning');
      data.append('description', project.description || '');
      data.append('type', project.type || '');
      data.append('handover', project.handover || '');
      data.append('payment', project.payment || '');
      data.append('primaryButtonText', project.primaryButtonText || '');
      data.append('primaryButtonLink', project.primaryButtonLink || '');
      data.append('secondaryButtonText', project.secondaryButtonText || '');
      data.append('secondaryButtonLink', project.secondaryButtonLink || '');
      data.append('imageAlt', project.imageAlt || '');
      if (project.image) {
        data.append('image', project.image);
      }
      await projectApi.update(project.id, data, token);
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to update project status');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData(EMPTY_FORM);
    setError('');
  };

  const inputClass = "w-full px-3 py-3 border border-gray-300 rounded-none font-sans text-base box-border text-black focus:outline-none focus:border-[var(--accent-bronze)] focus:shadow-[0_0_0_3px_rgba(210,180,140,0.1)]";
  const labelClass = "block font-sans text-sm font-semibold text-[var(--ink)] mb-2";

  return (
    <div className="bg-gray-50">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10 p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg relative overflow-hidden">
            <h1 className="font-display text-4xl font-bold text-white relative z-10">Projects</h1>
            <button
              onClick={() => {
                setEditingProject(null);
                setFormData(EMPTY_FORM);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--accent-blog)] to-[#c9956c] text-white border-none rounded-xl font-sans text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative z-10"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10 font-sans text-base text-black/60">Loading projects...</div>
          ) : (
            <div className="bg-white shadow-sm overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Title</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Location</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Tag</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Status</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Image</th>
                    <th className="bg-gray-50 px-4 py-4 text-left font-sans text-sm font-semibold text-[var(--ink)] border-b-2 border-[var(--accent-bronze)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center font-sans text-base text-black/60">
                        No projects yet. Click "Add Project" to create one.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{project.title}</td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{project.location || '-'}</td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{project.badge || project.status || '-'}</td>
                        <td className="px-4 py-4 border-b border-gray-200">
                          <button
                            onClick={() => handleToggleStatus(project)}
                            className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                              project.publication_status === 'published'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {project.publication_status === 'published' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200">
                          {project.image ? (
                            <img
                              src={getImageUrl(project.image)}
                              alt={project.imageAlt || project.title}
                              className="w-12 h-12 object-cover"
                            />
                          ) : '-'}
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 mr-2 text-blue-500 hover:bg-blue-50"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 bg-transparent border-none cursor-pointer transition-all duration-300 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white w-full max-w-2xl rounded-none shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="font-display text-2xl font-bold text-[#2a2620]">
                    {editingProject ? 'Edit Project' : 'Add Project'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="bg-transparent border-none text-3xl cursor-pointer text-black/60 leading-none"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  {error && <div className="bg-red-50 text-red-500 px-3 py-3 rounded-none mb-5 font-sans text-sm">{error}</div>}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g. PLT Tower"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Business Bay, Dubai"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Tag</label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className={inputClass}
                    >
                      {TAGS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      placeholder="Project description"
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Type</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        placeholder="e.g. Studio–3 Bed"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Handover</label>
                      <input
                        type="text"
                        value={formData.handover}
                        onChange={(e) => setFormData({ ...formData, handover: e.target.value })}
                        placeholder="e.g. Q4 2027"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Payment</label>
                      <input
                        type="text"
                        value={formData.payment}
                        onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                        placeholder="e.g. 60 / 40"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Primary Button Text</label>
                      <input
                        type="text"
                        value={formData.primaryButtonText}
                        onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                        placeholder="e.g. View development"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Primary Button Link</label>
                      <input
                        type="text"
                        value={formData.primaryButtonLink}
                        onChange={(e) => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                        placeholder="e.g. https://plttower.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Secondary Button Text</label>
                      <input
                        type="text"
                        value={formData.secondaryButtonText}
                        onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                        placeholder="e.g. Register interest"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Button Link</label>
                      <input
                        type="text"
                        value={formData.secondaryButtonLink}
                        onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                        placeholder="e.g. /register-interest"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Primary Image</label>
                    {editingProject && formData.image && typeof formData.image === 'string' && (
                      <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-none">
                        <img
                          src={getImageUrl(formData.image)}
                          alt="Current image"
                          className="w-24 h-24 object-cover rounded-none mb-2"
                        />
                        <p className="font-sans text-xs text-black/60 m-0">Current primary image</p>
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
                    <label className={labelClass}>Additional Images (for slider)</label>
                    {editingProject && formData.images && formData.images.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative p-2 bg-gray-50 border border-gray-200 rounded-none">
                            <img
                              src={typeof img === 'string' ? getImageUrl(img) : URL.createObjectURL(img)}
                              alt={`Additional image ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = formData.images.filter((_, i) => i !== idx);
                                setFormData({ ...formData, images: newImages });
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs cursor-pointer hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const newImages = Array.from(e.target.files);
                        const totalImages = formData.images.length + newImages.length;
                        if (totalImages > 10) {
                          alert('Maximum 10 images allowed for the slider');
                          return;
                        }
                        setFormData({ ...formData, images: [...formData.images, ...newImages] });
                      }}
                      className="w-full border border-black rounded-none p-2 font-sans text-sm text-[#2a2620] cursor-pointer file:mr-4 file:px-5 file:py-2.5 file:bg-[#2a2620] file:text-white file:border file:border-black file:rounded-none file:font-sans file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-[#c9a876] file:transition-colors"
                    />
                    <p className="font-sans text-xs text-black/60 mt-1">Select multiple images for the slider (max 10 images)</p>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Image Alt Text</label>
                    <input
                      type="text"
                      value={formData.imageAlt}
                      onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                      placeholder="e.g. PLT Tower elevation"
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Publication Status</label>
                    <select
                      value={formData.publication_status}
                      onChange={(e) => setFormData({ ...formData, publication_status: e.target.value })}
                      className={inputClass}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button type="button" onClick={closeModal} className="px-6 py-3 bg-white border border-gray-300 text-[#2a2620] font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-3 bg-[#c9a876] text-white border-none font-sans text-sm font-semibold cursor-pointer rounded-none transition-all duration-300 hover:bg-[#7a341e]">
                      {editingProject ? 'Update' : 'Create'}
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
