"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogApi } from '../../lib/api';
import { Calendar, User, Tag } from 'lucide-react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogApi.getAll({ status: 'published' }, null);
      console.log('Blogs response:', response);
      if (response.success) {
        console.log('Setting blogs:', response.data);
        setBlogs(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        colors={{
          top: WHITE_SCHEME,
          scrolled: {
            bg: "#000000",
            border: "rgba(255,255,255,0.1)",
            text: "#ffffff",
            subText: "rgba(255,255,255,0.8)",
            link: "rgba(255,255,255,0.9)",
            linkHover: "#ffffff",
            buttonBorder: "var(--bg-primary)",
            buttonText: "#ffffff",
            buttonHoverBg: "#ffffff",
            buttonHoverText: "#000000",
          }
        }} 
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[var(--bg-section)] py-24 md:py-32">
          <div className="absolute inset-0 opacity-10">
           
          </div>
          <div className="relative max-w-6xl mx-auto px-5 md:px-20 text-center">
            <span className="inline-block px-4 py-2 mb-6 font-sans text-sm tracking-[0.2em] text-[var(--accent-blog)] uppercase border border-[var(--accent-blog)]/30 rounded-full">
              Insights & Updates
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our <span className="text-[var(--accent-blog)]">Blog</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Stay informed with the latest Dubai property market insights, investment tips, and exclusive updates from PLT Properties.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 py-16 md:px-20">

          {loading ? (
            <div className="text-center py-16 font-sans text-lg text-black/60">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16 font-sans text-lg text-black/60">No blogs published yet.</div>
          ) : (
            <>
              {/* Featured Blogs Section */}
              <section className="mb-20">
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {blogs.slice(0, 3).map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="group block"
                    >
                      <div className="overflow-hidden rounded-0 mb-4">
                        {blog.image && (
                          <img
                            src={`https://backend-production-1c502.up.railway.app/api${blog.image}`}
                            alt={blog.imageAlt || blog.title}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <p className="text-xs font-medium text-[var(--gold)] tracking-wide mb-2">{blog.categories?.[0]?.name || 'Real Estate'}</p>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Calendar size={12} className="text-[var(--gold)]" />
                        <span className="text-xs text-[var(--gold)]">{formatDate(blog.createdAt)}</span>
                      </div>
                      <h3 className="font-display text-lg text-[var(--text-blue)] leading-snug group-hover:text-[var(--gold)] transition-colors">
                        {blog.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>

              {/* All Blogs List Section */}
              {blogs.length > 3 && (
                <section className="mb-20">
                  <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 mb-4 font-sans text-sm tracking-[0.2em] text-[var(--accent-blog)] uppercase">
                      Archive
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] mb-4">More Articles</h2>
                    <p className="font-sans text-base text-black/60 max-w-2xl mx-auto">
                      Browse through our complete collection of property insights and market analysis.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {blogs.slice(3).map((blog) => (
                      <article 
                        key={blog.id} 
                        className="group flex flex-col md:flex-row gap-6 p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-[#faf8f5] hover:to-white hover:border-[#d4a574]/30 hover:shadow-lg"
                        onClick={() => router.push(`/blog/${blog.slug}`)}
                      >
                        {blog.image && (
                          <div className="w-full md:w-48 h-40 md:h-auto overflow-hidden rounded-xl flex-shrink-0">
                            <img
                              src={`https://backend-production-1c502.up.railway.app/api${blog.image}`}
                              alt={blog.imageAlt || blog.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center gap-1.5 font-sans text-xs text-[var(--accent-blog)] font-medium uppercase tracking-wider">
                              <Calendar size={12} />
                              {formatDate(blog.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2 leading-snug group-hover:text-[var(--accent-blog)] transition-colors duration-300">{blog.title}</h3>
                          {blog.shortDescription && (
                            <p className="font-sans text-sm text-black/60 leading-relaxed line-clamp-2">{blog.shortDescription}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-center md:justify-end">
                          <div className="w-12 h-12 rounded-full bg-[var(--accent-blog)]/10 flex items-center justify-center text-[var(--accent-blog)] group-hover:bg-[var(--accent-blog)] group-hover:text-white transition-all duration-300">
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const WHITE_SCHEME = {
  bg: 'transparent',
  text: '#ffffff',
  logo: '#ffffff',
  navBg: 'transparent',
  navText: '#ffffff',
  border: 'transparent'
};
