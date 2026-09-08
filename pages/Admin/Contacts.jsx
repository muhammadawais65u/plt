"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
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

    fetchContacts();
  }, [router]);

  const fetchContacts = async () => {
    try {
      const token = getCookie('token');
      console.log('Fetching contacts with token:', token);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setContacts(data.data?.leads || []);
      } else {
        console.error('Fetch failed:', data);
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = getCookie('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchContacts();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const token = getCookie('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchContacts();
      } else {
        setError('Failed to delete contact');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#3b82f6';
      case 'contacted':
        return '#f59e0b';
      case 'qualified':
        return '#8b5cf6';
      case 'closed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="bg-gray-50">
      <main className="p-6">
        <div className=" mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-[var(--ink)]">Contacts</h1>
          </div>

          {error && (
            <div className="bg-red-500 text-white px-3 py-3 mb-5 font-sans text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-10 font-sans text-base text-black/60">Loading...</div>
          ) : (
            <div className="bg-white shadow-sm overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--dark)] text-white">
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-4 py-4 text-left font-sans text-sm font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10 font-sans text-base text-black/60">No contacts found</td>
                    </tr>
                  ) : (
                    contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{contact.name}</td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{contact.email}</td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{contact.phone || '-'}</td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[var(--ink)]">{contact.subject}</td>
                        <td className="px-4 py-4 border-b border-gray-200">
                          <select
                            value={contact.status}
                            onChange={(e) => updateStatus(contact.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-none font-sans text-sm cursor-pointer bg-white"
                            style={{ color: getStatusColor(contact.status) }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 border-b border-gray-200 font-sans text-base text-[#2a2620]">{new Date(contact.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-4 border-b border-gray-200">
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="px-4 py-2 bg-red-500 text-white border-none rounded-none font-sans text-sm cursor-pointer transition-all duration-300 hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </main>
  </div>
  );
}
