"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(formData);

      if (response.success) {
        setCookie('token', response.data.token);
        setCookie('admin', JSON.stringify(response.data.admin));
        router.push('/admin/dashboard');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dark)] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-[var(--ink)] mb-2">Admin Login</h1>
            <p className="font-sans text-sm text-[var(--tan)] uppercase tracking-widest">PLT Properties</p>
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 mb-5 text-center font-sans text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans font-semibold text-sm text-[var(--ink)]">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
                className="p-3 border border-gray-200 rounded-lg text-base font-sans transition-all duration-300 bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--tan)] focus:ring-4 focus:ring-[rgba(138,60,34,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-sans font-semibold text-sm text-[var(--ink)]">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="p-3 border border-gray-200 rounded-lg text-base font-sans transition-all duration-300 bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--tan)] focus:ring-4 focus:ring-[rgba(138,60,34,0.1)]"
              />
            </div>

            <button
              type="submit"
              className="bg-[var(--tan)] text-white p-4 border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 uppercase tracking-widest font-sans hover:bg-[var(--rust)] disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
