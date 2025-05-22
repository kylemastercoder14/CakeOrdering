/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const createAccount = async (
  values: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  },
  id: string
) => {
  try {
    // Check if email already exists
    const existingUser = await db.users.findUnique({
      where: { email: values.email },
    });

    if (existingUser) {
      return { error: "Email already in use. Please use a different email." };
    }

    const name = values.firstName + " " + values.lastName;
    await db.users.create({
      data: {
        name,
        email: values.email,
        address: values.address,
        phoneNumber: values.phoneNumber,
        password: values.password,
        clerkId: id,
      },
    });

    return { success: "Account created successfully." };
  } catch (error: any) {
    console.error(error);

    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return {
        error:
          "This email is already registered. Please use a different email.",
      };
    }

    return {
      error: "An error occurred while creating the account. Please try again.",
    };
  }
};

export const createOAuthUser = async (userData: {
  clerkId: string;
  name: string;
  email: string;
  imageUrl?: string;
}) => {
  try {
    const existingUser = await db.users.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return { success: "User already exists" };
    }

    const newUser = await db.users.create({
      data: {
        clerkId: userData.clerkId,
        name: userData.name,
        email: userData.email,
        imageUrl: userData.imageUrl,
      },
    });

    return { success: "User created successfully", user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
};
