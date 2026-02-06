import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Extract subdomain (first part before .studiox.tech or .localhost)
  const subdomain = hostname.split('.')[0].toLowerCase()
  
  // Skip for static files and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Route based on subdomain pattern
  // Handles: serviceogmontasjepartner, serviceogmontasjetekniker, serviceogmontasjekunde
  
  if (subdomain === 'serviceogmontasjepartner' || subdomain.endsWith('partner')) {
    // Rewrite to /partner routes
    if (url.pathname === '/') {
      url.pathname = '/partner'
      return NextResponse.rewrite(url)
    }
    if (!url.pathname.startsWith('/partner')) {
      url.pathname = `/partner${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }
  
  if (subdomain === 'serviceogmontasjetekniker' || subdomain.endsWith('tekniker')) {
    // Rewrite to /tekniker routes
    if (url.pathname === '/') {
      url.pathname = '/tekniker'
      return NextResponse.rewrite(url)
    }
    if (!url.pathname.startsWith('/tekniker')) {
      url.pathname = `/tekniker${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }
  
  if (subdomain === 'serviceogmontasjekunde' || subdomain.endsWith('kunde')) {
    // Rewrite to /kunde routes
    if (url.pathname === '/') {
      url.pathname = '/kunde'
      return NextResponse.rewrite(url)
    }
    if (!url.pathname.startsWith('/kunde')) {
      url.pathname = `/kunde${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }
  
  if (subdomain === 'serviceogmontasjeadmin' || subdomain.endsWith('admin')) {
    // Rewrite to /admin routes
    if (url.pathname === '/') {
      url.pathname = '/admin'
      return NextResponse.rewrite(url)
    }
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // Main domain (serviceogmontasje) - show role selector
  // Keep as is - shows the main landing page
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
