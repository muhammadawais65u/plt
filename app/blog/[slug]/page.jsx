import BlogDetail from '@/pages/Blog/[slug]/page';

export default function BlogSlugPage() {
  return <BlogDetail />;
}

export async function generateStaticParams() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      return [];
    }
    
    const response = await fetch(`${API_URL}/blogs?status=published`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.map((blog) => ({
        slug: blog.slug,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}
