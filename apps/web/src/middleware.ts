import { NextResponse, NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { DecodedRefreshToken } from './@types';

const protectedPages = ['/profile', '/carts', '/orders', '/transactions', '/address'];
const adminPages = ['/admin/dashboard', '/admin'];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('refreshToken');
  if (protectedPages.includes(request.nextUrl.pathname)) {
    if (!currentUser) {
      return NextResponse.redirect(new URL('/?error=Please login first', request.url));
    }
    return NextResponse.next();
  }
  if (currentUser) {
    const decodedToken: DecodedRefreshToken = jwtDecode(currentUser.value);
    if (adminPages.includes(request.nextUrl.pathname)) {
      if (decodedToken.role !== 'Admin') {
        return NextResponse.redirect(new URL('/?error=Unauthorized, only admin can access this page', request.url));
      }
      return NextResponse.next();
    }
  }
}
