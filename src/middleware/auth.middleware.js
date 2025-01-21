import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      throw new Error('Token tidak ditemukan')
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    request.user = decoded

    return NextResponse.next()
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    )
  }
}

// Konfigurasi path yang memerlukan autentikasi
export const config = {
  matcher: ['/api/v1/users/:path*', '/api/v1/products/:path*']
} 