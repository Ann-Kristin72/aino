import { NextRequest, NextResponse } from 'next/server'

// ---
// PASSORDBESKYTTELSE STYRES AV NEXT_PUBLIC_PROTECTED
// Kun aktiv når NEXT_PUBLIC_PROTECTED=true (produksjon)
// Lokalt og i testmiljø er det ALLTID ÅPENT
// ---

// Basic authentication middleware
export function middleware(request: NextRequest) {
  // Unntak for statiske filer og API
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Beskyttelse styres kun av NEXT_PUBLIC_PROTECTED (Edge Runtime kompatibel)
  const isProtected = process.env.NEXT_PUBLIC_PROTECTED === 'true'
  
  if (!isProtected) {
    // Alltid åpent i utvikling/test
    return NextResponse.next()
  }

  // ---
  // Basic Auth (kun i produksjon)
  // ---
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="AINO - Under Development"',
      },
    })
  }

  // Parse basic auth
  const encoded = authHeader.split(' ')[1]
  const decoded = Buffer.from(encoded, 'base64').toString()
  const [username, password] = decoded.split(':')

  // Check credentials from environment variables
  const validUsername = process.env.BASIC_AUTH_USERNAME || 'aino'
  const validPassword = process.env.BASIC_AUTH_PASSWORD || 'aino2025'

  if (username === validUsername && password === validPassword) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication failed', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="AINO - Under Development"',
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 