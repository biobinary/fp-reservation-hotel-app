import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key');

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('admin_session')?.value;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(sessionCookie, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Jika mencoba mengakses halaman login tapi sudah punya sesi
  if (pathname === '/admin/login' && sessionCookie) {
    try {
      await jwtVerify(sessionCookie, JWT_SECRET);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (err) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};