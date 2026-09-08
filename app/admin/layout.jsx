"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, LogOut, Menu, X, FileText, User, Phone, Building2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const router = useRouter();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie('token');
    const admin = getCookie('admin');
    
    console.log('Layout - Token:', token);
    console.log('Layout - Admin:', admin);
    
    if (!token) {
      router.push('/login');
    } else {
      try {
        setAdminData(JSON.parse(admin));
      } catch (err) {
        console.error('Error parsing admin data in layout:', err);
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    console.log('Logging out...');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Cookies cleared');
    router.push('/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Users },
    { name: 'Leads', href: '/admin/contacts', icon: Phone },
    { name: 'Projects', href: '/admin/projects', icon: Building2 },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Authors', href: '/admin/authors', icon: User },
    { name: 'Categories', href: '/admin/categories', icon: Users },
  ];

  if (!adminData) return null;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#f5f5f5] border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <h1 className={`font-serif text-gray-800 ${sidebarOpen ? 'text-xl' : 'text-center text-sm'}`}>
            {sidebarOpen ? 'PLT Admin' : 'PLT'}
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen && (
            <div className="mb-4">
              <p className="text-gray-500 text-xs">Logged in as</p>
              <p className="text-gray-800 text-sm font-medium">{adminData.name}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-gray-500 text-sm">
            {adminData.email}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
