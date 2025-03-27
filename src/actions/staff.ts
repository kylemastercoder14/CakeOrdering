"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";
import * as jose from "jose";

export const loginStaff = async (email: string, password: string) => {
  try {
    const staff = await db.admin.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!staff) {
      return { error: "No user account found." };
    }

    if (staff.password !== password) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(staff.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt, success: "Logged in successfully.", data: staff };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while logging in." };
  }
};

export const logoutUser = async () => {
  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};

export const createStaff = async (values: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}) => {
  try {
    await db.admin.create({
      data: values,
    });

    await db.logs.create({
      data: {
        action: `Created staff ${
          values.firstName
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Staff created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the staff." };
  }
};

export const updateStaff = async (
  values: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
  },
  id: string
) => {
  try {
    await db.admin.update({
      where: {
        id,
      },
      data: values,
    });

    await db.logs.create({
      data: {
        action: `Updated staff ${
          values.firstName
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Staff updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the staff." };
  }
};
