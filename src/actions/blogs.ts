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

    await db.logs.create({
      data: {
        action: `Created blog ${
          values.title
        } at ${new Date().toLocaleString()}`,
      },
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

    await db.logs.create({
      data: {
        action: `Updated blog ${
          values.title
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Blog updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the blog." };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const blog = await db.blogs.delete({
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Deleted blog ${blog.title} at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Blog deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the blog." };
  }
};
