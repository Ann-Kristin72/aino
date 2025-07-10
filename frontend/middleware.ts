import { NextRequest, NextResponse } from 'next/server'

// ---
// PASSORDBESKYTTELSE STYRES AV NEXT_PUBLIC_PROTECTED
// Kun aktiv når NEXT_PUBLIC_PROTECTED=true (produksjon)
// Lokalt og i testmiljø er det ALLTID ÅPENT
// ---

export function middleware(request: NextRequest) {
  // Unntak for statiske filer og API
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Beskyttelse styres av NEXT_PUBLIC_PROTECTED (Edge Runtime-kompatibel)
  const isProtected = process.env.NEXT_PUBLIC_PROTECTED === 'true'
  
  // Debug logging (kun i development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔐 Middleware Debug:', {
      pathname: request.nextUrl.pathname,
      isProtected,
      NEXT_PUBLIC_PROTECTED: process.env.NEXT_PUBLIC_PROTECTED,
      NODE_ENV: process.env.NODE_ENV
    })
  }

  if (!isProtected) {
    return NextResponse.next()
  }

  // --- Basic Auth ---
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="AINO - Under Development"',
      },
    })
  }

  const encoded = authHeader.split(' ')[1]
  const decoded = atob(encoded) // <- Edge Runtime-støttet
  const [username, password] = decoded.split(':')

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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
