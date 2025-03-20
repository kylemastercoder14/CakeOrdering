"use server";

import db from "@/lib/db";

export const createContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    return { success: "Message sent successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};
