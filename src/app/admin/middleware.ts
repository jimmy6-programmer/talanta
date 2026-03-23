import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if it's an admin page
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  // Allow access to login and register pages without authentication
  if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/register') {
    const response = NextResponse.next();
    response.headers.set('x-is-admin-page', isAdminPage.toString());
    return response;
  }

  // Temporary static authentication - check for cookie
  const isAdminLoggedIn = request.cookies.get('isAdminLoggedIn');
  
  if (!isAdminLoggedIn || isAdminLoggedIn.value !== 'true') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  const response = NextResponse.next();
  response.headers.set('x-is-admin-page', isAdminPage.toString());
  return response;
}
