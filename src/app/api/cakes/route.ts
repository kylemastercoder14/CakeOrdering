/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId } = await auth();

    console.log("Received data:", data);
    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - please sign in" },
        { status: 401 }
      );
    }

    // Validate required fields
    const requiredFields = ["theme", "size", "flavor", "imageUrl", "price"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Find user with proper type checking
    const user = await db.users.findFirst({
      where: { clerkId: userId },
      select: {
        id: true,
        customizedCount: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Ensure customizedCount is a number and >= 1
    if (typeof user.customizedCount !== "number" || user.customizedCount < 1) {
      return NextResponse.json(
        {
          error: "No remaining customizations available",
          currentCount: user.customizedCount,
        },
        { status: 403 }
      );
    }

    // Create the cake
    const cake = await db.customizedCake.create({
      data: {
        theme: data.theme,
        size: data.size,
        shape: data.shape || "Round",
        layers: data.layers || "Single-Tier",
        flavor: data.flavor,
        icingType: data.icingType || "Icing",
        additionalNotes: data.additionalNotes || "",
        imageUrl: data.imageUrl,
        price: parseFloat(data.price),
        customerName: data.customerName || "",
        customerEmail: data.customerEmail || "",
        customerPhone: data.customerPhone || "",
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        deliveryAddress: data.deliveryAddress || "",
        status: "Pending",
      },
    });

    // Decrement count safely
    const updatedUser = await db.users.update({
      where: { id: user.id },
      data: {
        customizedCount: {
          decrement: 1,
        },
      },
      select: {
        customizedCount: true,
      },
    });

    return NextResponse.json(
      {
        ...cake,
        remainingCustomizations: updatedUser.customizedCount,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating cake:", error);
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
