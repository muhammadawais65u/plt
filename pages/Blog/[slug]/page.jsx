"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogApi } from '../../../lib/api';
import { Calendar, User, Tag, ArrowLeft, Mail, ChevronUp } from 'lucide-react';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const { slug } = params || {};

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await blogApi.getBySlug(slug, null);
      if (response.success) {
        setBlog(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const getReadTime = (content) => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    return Math.ceil(text.split(/\s+/).filter(word => word.length > 0).length / wordsPerMinute);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
       <div className="text-center py-25 font-sans text-lg text-black/60">Loading blog...</div>

      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar top={WHITE_SCHEME} scrolled={WHITE_SCHEME} />
        <div className="max-w-6xl mx-auto px-5 py-25 md:px-20">
          <button onClick={() => router.push('/blog')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a574] to-[#c9956c] text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
            <ArrowLeft size={20} />
            Back to Blogs
          </button>
          <div className="text-center py-25 font-sans text-lg text-black/60">Blog not found.</div>
        </div>
        <Footer />
      </div>
    );
  }

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

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-blog)] to-[#c9956c] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* HERO BANNER */}
      <header className="relative h-[460px] md:h-[520px] flex items-end overflow-hidden">
        {blog.image && (
          <img
            src={`https://backend-production-1c502.up.railway.app/api${blog.image}`}
            alt={blog.imageAlt || blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pb-14 md:pb-16 w-full text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[var(--accent-blog)] text-white text-xs font-semibold uppercase tracking-wider rounded-full">
              {blog.categories?.[0]?.name || 'Article'}
            </span>
            <span className="text-sm text-white/80">{getReadTime(blog.mainContent)} min read</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-[var(--text-cream)] tracking-wide mb-3">{formatDate(blog.createdAt)}</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mb-5 text-white drop-shadow-lg">
            {blog.title}
          </h1>
          {blog.author && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-blog)] to-[#c9956c] flex items-center justify-center text-white font-semibold">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm md:text-base font-medium text-white">{blog.author.name}</p>
                <p className="text-xs text-white/70">Author</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BREADCRUMB */}
      

      {/* ARTICLE BODY */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
        <style jsx global>{`
          .prose-custom p {
            font-size: 16px;
            margin-bottom: 1.25rem;
            line-height: 1.8;
          }
          .prose-custom h2 {
            font-size: 32px;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          .prose-custom h3 {
            font-size: 28px;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
          }
          .prose-custom h4 {
            font-size: 24px;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            font-weight: 600;
          }
          .prose-custom ul {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
            list-style-type: disc;
          }
          .prose-custom ol {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
            list-style-type: decimal;
          }
          .prose-custom li {
            font-size: 16px;
            margin-bottom: 0.5rem;
            line-height: 1.7;
            list-style: inherit;
          }
          .prose-custom ul li::marker {
            color: #c9956c;
          }
          .prose-custom ol li::marker {
            color: #c9956c;
            font-weight: 600;
          }
          .prose-custom table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 16px;
          }
          .prose-custom table th {
            background-color: #f9fafb;
            padding: 0.75rem 1rem;
            text-align: left;
            font-weight: 600;
            border: 1px solid #e5e7eb;
          }
          .prose-custom table td {
            padding: 0.75rem 1rem;
            border: 1px solid #e5e7eb;
          }
          .prose-custom table tr:nth-child(even) {
            background-color: #f9fafb;
          }
        `}</style>
        <article className="bg-white rounded-2xl p-8 md:p-12 mb-12">
     <nav className="max-w-6xl mx-auto py-5 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-2">
          <li><a href="/" className="hover:text-[var(--gold)] transition-colors">Home</a></li>
          <li aria-hidden="true">&rsaquo;</li>
          <li><a href="/blog" className="hover:text-[var(--gold)] transition-colors">Blog</a></li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-[var(--text-blue)] font-medium">{blog.title}</li>
        </ol>
      </nav>

          <div
            className="prose-custom text-[var(--text-gray)] text-[15px] md:text-base"
            dangerouslySetInnerHTML={{ __html: blog.mainContent }}
          />
        </article>

        {/* SHARE / BACK */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <button onClick={() => router.push('/blog')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[var(--text-blue)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Share:</span>
            <div className="flex items-center gap-2">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-lg text-[var(--text-linkedin)] hover:bg-[var(--text-linkedin)] hover:text-white hover:border-[var(--text-linkedin)] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-lg text-[var(--text-twitter)] hover:bg-[var(--text-twitter)] hover:text-white hover:border-[var(--text-twitter)] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-[var(--accent-blog)] to-[#c9956c] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-40"
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>

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
