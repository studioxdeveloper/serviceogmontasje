import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Map subdomains to their portal paths
const SUBDOMAIN_MAP: Record<string, string> = {
  'serviceogmontasje': '/admin',  // Main domain goes to admin
  'serviceogmontasjepartner': '/partner',
  'serviceogmontasjetekniker': '/tekniker',
  'serviceogmontasjekunde': '/kunde',
  'serviceogmontasjeadmin': '/admin',
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Extract subdomain (first part before first dot)
  const subdomain = hostname.split('.')[0].toLowerCase()
  
  // Check if this subdomain should be routed
  const portalPath = SUBDOMAIN_MAP[subdomain]
  
  if (portalPath) {
    // This is a portal subdomain
    // If at root, rewrite to portal home
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(portalPath, request.url))
    }
    
    // If path doesn't start with portal path, prepend it
    // But skip if already on correct path or accessing other portals
    if (!pathname.startsWith(portalPath) && 
        !pathname.startsWith('/partner') && 
        !pathname.startsWith('/tekniker') && 
        !pathname.startsWith('/kunde') && 
        !pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`${portalPath}${pathname}`, request.url))
    }
    
    // If trying to access a different portal, redirect to correct subdomain
    // For now, just rewrite to the portal path
    if (!pathname.startsWith(portalPath) && pathname !== '/') {
      return NextResponse.rewrite(new URL(portalPath, request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all request paths except for:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files (images, etc)
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
