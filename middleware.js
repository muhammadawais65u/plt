import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const adminData = request.cookies.get('admin');
  
  const { pathname } = request.nextUrl;
  
  // If trying to access admin routes without authentication
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token || !adminData) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If already logged in and trying to access login page
  if (pathname === '/admin/login' && token && adminData) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
