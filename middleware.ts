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
  const sessionCookie = getSessionCookie(req);

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    if (!!sessionCookie && publicRoutes.includes(pathname)) {
      const redirectTo = req.nextUrl.clone();
      redirectTo.pathname = '/admin/dashboard';
      return NextResponse.redirect(redirectTo);
    }

    if (!sessionCookie && !publicRoutes.includes(pathname)) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      if (pathname !== '/admin/login' && pathname !== '/') {
        loginUrl.searchParams.set('from', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default middleware;
