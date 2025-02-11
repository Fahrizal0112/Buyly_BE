import { NextResponse } from "next/server";
import { ProductController } from "@/modules/product/controllers/product.controller";
import { ApiResponse } from "@/utils/api";

export async function GET(req) {
  try {
    const controller = new ProductController();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    let result;
    if (categoryId) {
      result = await controller.getProductByCategory(Number(categoryId));
    } else if (name) {
      result = await controller.getProductByName(name);
    } else {
      result = await controller.getAllProducts();
    }
    return NextResponse.json(ApiResponse.success(result));
  } catch (error) {
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}

export async function POST(req) {
  try {
    const controller = new ProductController();
    const data = await req.json();
    const requiredFields = ['name', 'description', 'price', 'stock', 'category_id', 'photo_url'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          ApiResponse.error(`${field} is required`),
          { status: 400 }
        );
      }
    }

    const result = await controller.createProduct({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category_id: parseInt(data.category_id),
      photo_url: data.photo_url
    });

    return NextResponse.json(
      ApiResponse.success(result, 'Product created successfully'),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      ApiResponse.error(error.message),
      { status: 400 }
    );
  }
}

export async function PUT(req) {
  try {
    const controller = new ProductController();
    const data = await req.json();
    const requiredFields = ['name', 'description', 'price', 'stock', 'category_id', 'photo_url'];
    for (const field of requiredFields) {
      if (!data[field]) {
      return NextResponse.json(
        ApiResponse.error(`${field} is required`),
        { status: 400 }
      );
    }
  }

  const result = await controller.updateProduct({
    id: data.id,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category_id: parseInt(data.category_id),
      photo_url: data.photo_url,
  });
  return NextResponse.json(ApiResponse.success(result, 'Product updated successfully'), { status: 200 });
  } catch (error) {
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}

export async function DELETE(req) {
  const controller = new ProductController();
  const data = await req.json();
  const result = await controller.deleteProduct(data.id);
  return NextResponse.json(ApiResponse.success(result, 'Product deleted successfully'), { status: 200 });
}