"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLeadApi } from '../../lib/api';
import { 
  Users, 
  Clock, 
  Phone, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Mail,
  LogOut,
  ArrowRight,
  CalendarDays
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0
  });
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie('token');
    const adminData = getCookie('admin');
    
    console.log('Dashboard - Token:', token);
    console.log('Dashboard - Admin data:', adminData);
    
    if (!token || !adminData) {
      console.log('Redirecting to login - missing token or admin data');
      router.push('/admin/login');
      return;
    }

    try {
      setAdmin(JSON.parse(adminData));
      fetchStats();
    } catch (err) {
      console.error('Error parsing admin data:', err);
      router.push('/admin/login');
    }
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = getCookie('token');
      console.log('Fetching stats with token:', token);
      const response = await adminLeadApi.getStats(token);
      console.log('Stats response:', response);

      if (response.success) {
        console.log('Setting stats:', response.data.stats);
        setStats(response.data.stats);
      } else {
        console.log('Stats response not successful');
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/admin/login';
  };

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'from-[var(--accent-blog)] to-[#c9956c]' },
    { label: 'New', value: stats.new, icon: Clock, color: 'from-blue-500 to-blue-600' },
    { label: 'Contacted', value: stats.contacted, icon: Phone, color: 'from-amber-500 to-amber-600' },
    { label: 'Qualified', value: stats.qualified, icon: Award, color: 'from-purple-500 to-purple-600' },
    { label: 'Closed', value: stats.closed, icon: CheckCircle2, color: 'from-emerald-500 to-emerald-600' },
  ];

  const quickActions = [
    { label: 'Manage Contacts', path: '/admin/contacts', icon: Users, desc: 'View and update leads', color: 'bg-blue-500' },
    { label: 'Manage Blogs', path: '/admin/blogs', icon: FileText, desc: 'Create and edit articles', color: 'bg-[var(--accent-blog)]' },
    { label: 'Authors', path: '/admin/authors', icon: Mail, desc: 'Manage blog authors', color: 'bg-purple-500' },
    { label: 'Categories', path: '/admin/categories', icon: Award, desc: 'Organize blog topics', color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-gray-50">
      <div className="p-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-28 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-gray-500 mb-0.5">{stat.label}</p>
                        <p className="font-display text-2xl font-bold text-[var(--text-blue)]">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Welcome / Summary */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--accent-blog)]/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={20} className="text-[var(--accent-blog)]" />
                      <span className="text-sm font-semibold text-[var(--accent-blog)] uppercase tracking-wider">Overview</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-3">Lead Performance</h2>
                    <p className="text-white/70 mb-6 max-w-lg">
                      You have {stats.total} total leads. {stats.new} new leads are waiting to be contacted, 
                      and {stats.closed} have been successfully closed.
                    </p>
                    <button 
                      onClick={() => router.push('/admin/contacts')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent-blog)] to-[#c9956c] text-white rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      View All Leads <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-display text-xl font-bold text-[var(--text-blue)] mb-5">Conversion Funnel</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'New', value: stats.new, total: stats.total, color: 'bg-blue-500' },
                      { label: 'Contacted', value: stats.contacted, total: stats.total, color: 'bg-amber-500' },
                      { label: 'Qualified', value: stats.qualified, total: stats.total, color: 'bg-purple-500' },
                      { label: 'Closed', value: stats.closed, total: stats.total, color: 'bg-emerald-500' },
                    ].map((item) => {
                      const percent = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                      return (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-semibold text-[var(--text-blue)]">{item.value} ({percent}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--text-blue)] mb-5">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => router.push(action.path)}
                        className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className={`w-12 h-12 ${action.color} text-white rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                          <Icon size={22} />
                        </div>
                        <h3 className="font-sans font-semibold text-[var(--text-blue)] mb-1">{action.label}</h3>
                        <p className="font-sans text-sm text-gray-500">{action.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
