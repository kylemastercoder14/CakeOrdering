"use server";

import db from "@/lib/db";
import bcryptjs from "bcryptjs";

export const updateAdmin = async (
  values: {
    firstName: string;
    lastName: string;
    email: string;
  },
  id: string
) => {
  try {
    await db.admin.update({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Updated personal info ${id} at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Personal information updated." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the category." };
  }
};

export const updatePassword = async (
  values: {
    newPassword: string;
    confirmPassword: string;
  },
  id: string
) => {
  if (values.newPassword !== values.confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);
    await db.admin.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Updated password info ${id} at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Password updated." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the password." };
  }
};

export const updateStoreInfo = async (
  values: {
    logo: string;
    storeName: string;
    about: string;
    mission: string;
    vision: string;
    imageUrl: string;
    coreValues: string;
  },
  id: string
) => {
  try {
    await db.about.update({
      data: {
        logo: values.logo,
        storeName: values.storeName,
        content: values.about,
        mission: values.mission,
        vision: values.vision,
        imageUrl: values.imageUrl,
        coreValues: values.coreValues,
      },
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Updated store info ${id} at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Store information updated." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the store information." };
  }
};
