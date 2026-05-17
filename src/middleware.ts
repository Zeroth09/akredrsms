import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Paths to protect
  const isProtected = 
    pathname === '/' || 
    pathname.startsWith('/dashboard2') || 
    pathname.startsWith('/dokumen') || 
    pathname.startsWith('/asesmen/admin')

  if (isProtected) {
    const adminPasskey = request.cookies.get('admin_passkey')?.value

    if (adminPasskey !== 'rizuki09') {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/admin'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirect to dashboard if already authenticated and trying to access login
  if (pathname === '/auth/admin') {
    const adminPasskey = request.cookies.get('admin_passkey')?.value
    if (adminPasskey === 'rizuki09') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, file.svg, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ],
}
