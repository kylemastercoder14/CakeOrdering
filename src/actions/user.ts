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
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the account." };
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
