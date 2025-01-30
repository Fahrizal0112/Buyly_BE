import { AuthController } from "@/modules/auth/controllers/auth.controller";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/api";

export async function POST(request) {
  try {
    const controller = new AuthController();
    const data = await request.json();

    console.log("Received data:", data);

    if (!data.action) {
      return NextResponse.json(
        ApiResponse.error("Action must be filled (login/register)"),
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

      default:
        return NextResponse.json(
          ApiResponse.error("Invalid action. Use login or register"),
          { status: 400 }
        );

      case "logout":
        result = await controller.logout();
        response = NextResponse.json(ApiResponse.success(result, "Logout successful"))
        response.cookies.set({
          name : "token",
          value : "",
          httpOnly : true,
          secure : true,
          path : "/",
        })
        return response
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}
