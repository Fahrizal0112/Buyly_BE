import { AuthController } from "@/modules/auth/controllers/auth.controller";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/api";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const controller = new AuthController();
    const data = await request.json();

    console.log("Received data:", data);

    if (!data.action) {
      return NextResponse.json(
        ApiResponse.error("Action must be filled (login/register/update/logout)"),
        { status: 400 }
      );
    }
    let response;
    let result;

    switch (data.action) {
      case "login":
        if (!data.username && !data.email) {
          return NextResponse.json(
            ApiResponse.error("Username or email is required"),
            { status: 400 }
          );
        }
        if (!data.password) {
          return NextResponse.json(ApiResponse.error("Password is required"), {
            status: 400,
          });
        }

        result = await controller.login(data);
        response = NextResponse.json(
          ApiResponse.success(result.user, "Login successful")
        );

        response.cookies.set({
          name: "token",
          value: result.token,
          httpOnly: true,
          secure: true,
          path: "/",
        });

        return response;

      case "register":
        if (!data.username || !data.password || !data.email) {
          return NextResponse.json(
            ApiResponse.error("Username, password and email is required"),
            { status: 400 }
          );
        }

        result = await controller.register(data);
        return NextResponse.json(
          ApiResponse.success(result, "Registration successful"),
          { status: 201 }
        );

      case "update":
        const token = cookies().get('token')?.value;
        
        if (!token) {
          return NextResponse.json(
            ApiResponse.error("Unauthorized: No token provided"),
            { status: 401 }
          );
        }

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
          const updateData = {
            id: decoded.userId,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            photo_url: data.photo_url
          };

          if (data.password) {
            updateData.password = data.password;
          }

          result = await controller.updateUser(updateData);
          return NextResponse.json(
            ApiResponse.success(result, "User updated successfully")
          );
        } catch (tokenError) {
          return NextResponse.json(
            ApiResponse.error("Invalid or expired token"),
            { status: 401 }
          );
        }

      case "logout":
        result = await controller.logout();
        response = NextResponse.json(
          ApiResponse.success(null, "Logout successful")
        );
        
        response.cookies.set({
          name: "token",
          value: "",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 0,
          path: "/"
        });
        
        return response;

      default:
        return NextResponse.json(
          ApiResponse.error("Invalid action. Use login, register, update, or logout"),
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      ApiResponse.error(error.message || "Internal server error"),
      { status: error.status || 500 }
    );
  }
}
