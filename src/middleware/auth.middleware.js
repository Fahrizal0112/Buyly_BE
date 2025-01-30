import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export function middleware(request) {
  try {
    const token = cookies().get('token')?.value
    
    if (!token) {
      throw new Error('Token Not Found')
    }
    
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

export const config = {
  matcher: ['/api/v1/products/:path*']
} 