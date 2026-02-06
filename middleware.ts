import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Extract subdomain
  // Handles: subdomain.domain.com, subdomain.localhost:3000
  const subdomain = hostname.split('.')[0]
  
  // Skip for static files and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Route based on subdomain
  switch (subdomain) {
    case 'partner':
      // Rewrite to /partner routes
      if (url.pathname === '/') {
        url.pathname = '/partner'
        return NextResponse.rewrite(url)
      }
      if (!url.pathname.startsWith('/partner')) {
        url.pathname = `/partner${url.pathname}`
        return NextResponse.rewrite(url)
      }
      break
      
    case 'tekniker':
      // Rewrite to /tekniker routes
      if (url.pathname === '/') {
        url.pathname = '/tekniker'
        return NextResponse.rewrite(url)
      }
      if (!url.pathname.startsWith('/tekniker')) {
        url.pathname = `/tekniker${url.pathname}`
        return NextResponse.rewrite(url)
      }
      break
      
    case 'kunde':
      // Rewrite to /kunde routes
      if (url.pathname === '/') {
        url.pathname = '/kunde'
        return NextResponse.rewrite(url)
      }
      if (!url.pathname.startsWith('/kunde')) {
        url.pathname = `/kunde${url.pathname}`
        return NextResponse.rewrite(url)
      }
      break
      
    case 'admin':
      // Rewrite to /admin routes
      if (url.pathname === '/') {
        url.pathname = '/admin'
        return NextResponse.rewrite(url)
      }
      if (!url.pathname.startsWith('/admin')) {
        url.pathname = `/admin${url.pathname}`
        return NextResponse.rewrite(url)
      }
      break
      
    default:
      // Main domain (serviceogmontasje) - show role selector or admin
      // Keep as is - shows the main landing page
      break
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
