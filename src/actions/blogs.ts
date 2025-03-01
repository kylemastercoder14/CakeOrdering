"use server";

import db from "@/lib/db";

export const createBlog = async (values: {
  title: string;
  content: string;
  imageUrl: string;
}) => {
  try {
    await db.blogs.create({
      data: values,
    });

    return { success: "Blog created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the blog." };
  }
};

export const updateBlog = async (
  values: { title: string; content: string; imageUrl: string },
  id: string
) => {
  try {
    await db.blogs.update({
      where: {
        id,
      },
      data: values,
    });

    return { success: "Blog updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the blog." };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    await db.blogs.delete({
      where: {
        id,
      },
    });

    return { success: "Blog deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the blog." };
  }
};
