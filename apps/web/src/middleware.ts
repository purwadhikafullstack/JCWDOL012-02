import { NextResponse, NextRequest } from 'next/server';

const protectedPages = ['/profile', '/carts', '/orders', '/transactions', '/address'];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('refreshToken');
  if (protectedPages.includes(request.nextUrl.pathname)) {
    if (!currentUser) {
      return NextResponse.redirect(new URL('/?error=Please login first', request.url));
    }
    return NextResponse.next();
  }
}
