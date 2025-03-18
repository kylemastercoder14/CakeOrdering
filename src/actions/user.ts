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
