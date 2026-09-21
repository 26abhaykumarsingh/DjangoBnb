import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('session_access_token')?.value;
  const refreshToken = request.cookies.get('session_refresh_token')?.value;

  const response = NextResponse.next();

  // If the access token is missing/expired, but we still have a refresh token
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const json = await res.json();

      if (json.access) {
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 7, // 7 hours
          path: '/',
        };

        // 1. Tell browser to store the refreshed token for future requests
        response.cookies.set('session_access_token', json.access, cookieOptions);

        // 2. Pass the refreshed token to the current page render request
        request.cookies.set('session_access_token', json.access);
      } else {
        // If refresh failed on backend, clear the cookies
        response.cookies.delete('session_userid');
        response.cookies.delete('session_access_token');
        response.cookies.delete('session_refresh_token');
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
