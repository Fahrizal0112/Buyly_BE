import { AddressController } from "@/modules/address/controllers/adress.controllers";
import { ApiResponse } from "@/utils/api";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json(
      ApiResponse.error("Unauthorized: No token provided"),
      { status: 401 }
    );
  }
  try {
    const controller = new AddressController();
    const data = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requiredFields = ["street", "city", "state", "zip_code"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(ApiResponse.error(`${field} is required`), {
          status: 400,
        });
      }
    }
    const result = await controller.createAddress({
      user_id: decoded.userId,
      street: data.street,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
    });
    return NextResponse.json(
      ApiResponse.success(result, "Address created successfully"),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}

export async function PUT(req) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json(
      ApiResponse.error("Unauthorized: No token provided"), 
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const controller = new AddressController();
    const data = await req.json();
    const requiredFields = ["street", "city", "state", "zip_code"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(ApiResponse.error(`${field} is required`), {
          status: 400,
        });
      }
    }
    const result = await controller.updateAddress({
      id: data.id,
      user_id: decoded.userId,
      street: data.street,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
    });
    return NextResponse.json(
      ApiResponse.success(result, "Address updated successfully"),
      { status: 200 }
    );
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        ApiResponse.error("Invalid token"),
        { status: 401 }
      );
    }
    return NextResponse.json(ApiResponse.error(error.message), { status: 400 });
  }
}

export async function DELETE(req) {
  const controller = new AddressController();
  const data = await req.json();
  const result = await controller.deleteAddress(data.id);
  if (!result) {
    return NextResponse.json(ApiResponse.error("Address not found"), {
      status: 404,
    });
  }
  return NextResponse.json(
    ApiResponse.success(result, "Address deleted successfully"),
    { status: 200 }
  );
}
