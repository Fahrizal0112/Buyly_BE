import { NextResponse } from "next/server";
import { CategoryController } from "@/modules/category/controllers/category.controller";
import { ApiResponse } from "@/utils/api";

export async function GET() {
  try {
    const controller = new CategoryController();
    const result = await controller.getAllCategories();
    return NextResponse.json(ApiResponse.success(result));
  } catch (error) {
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}

export async function POST(req, res) {
  try {
    const controller = new CategoryController();
    const data = await req.json();
    const result = await controller.createCategory(data);

    return NextResponse.json(ApiResponse.success(result, "Category created successfully"),{status: 200});
  } catch (error) {
    return NextResponse.json(ApiResponse.error(error.message, "Category creation failed"), { status: 400 });
  }
}
