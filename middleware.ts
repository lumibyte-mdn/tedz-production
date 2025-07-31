import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { Session } from 'better-auth';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = [
  '/admin/dashboard',
  '/admin/projects',
  '/admin/brands',
  '/admin/category',
  '/admin/users',
  '/admin',
];
const publicRoutes = ['/admin/login', '/api/login'];

async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);
  const isLoggedIn = sessionCookie !== null;

  if (nextUrl.pathname.includes('/admin')) {
    const isProtectedRoute = protectedRoutes.some((prefix) =>
      nextUrl.pathname.startsWith(prefix)
    );

    if (!isLoggedIn && isProtectedRoute) {
      const absoluteURL = new URL('/admin/login', nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (isLoggedIn && publicRoutes.includes(nextUrl.pathname)) {
      const absoluteURL = new URL('/admin/dashboard', nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default middleware;
