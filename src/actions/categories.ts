"use server";

import db from "@/lib/db";

export const createCategory = async (values: {
  name: string;
  description: string;
  imageUrl: string;
}) => {
  try {
    await db.categories.create({
      data: values,
    });

    await db.logs.create({
      data: {
        action: `Created category ${
          values.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Category created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the category." };
  }
};

export const updateCategory = async (
  values: { name: string; description: string; imageUrl: string },
  id: string
) => {
  try {
    await db.categories.update({
      where: {
        id,
      },
      data: values,
    });

    await db.logs.create({
      data: {
        action: `Updated category ${
          values.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Category updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the category." };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const categories = await db.categories.delete({
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Deleted category ${
          categories.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Category deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the category." };
  }
};
