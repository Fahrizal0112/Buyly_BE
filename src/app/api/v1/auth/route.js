import { NextResponse } from 'next/server'
import { UserController } from '@/modules/users/controllers/user.controller'
import { ApiResponse } from '@/utils/api'

export async function GET() {
  try {
    const controller = new UserController()
    const users = await controller.getUsers()
    return NextResponse.json(ApiResponse.success(users))
  } catch (error) {
    return NextResponse.json(
      ApiResponse.error(error.message),
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const controller = new UserController()
    const data = await request.json()
    const user = await controller.createUser(data)
    return NextResponse.json(
      ApiResponse.success(user, 'User created successfully'),
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      ApiResponse.error(error.message),
      { status: 400 }
    )
  }
}