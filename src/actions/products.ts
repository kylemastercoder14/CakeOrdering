"use server";

import db from "@/lib/db";

export const createProduct = async (values: {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  status: string;
  category: string;
  isFeatured?: boolean;
}) => {
  try {
    await db.products.create({
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        price: values.price,
        status: values.status,
        categoryId: values.category,
        isFeatured: values.isFeatured,
      },
    });

    return { success: "Product created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the product." };
  }
};

export const updateProduct = async (
  values: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    status: string;
    category: string;
    isFeatured?: boolean;
  },
  id: string
) => {
  try {
    await db.products.update({
      where: { id },
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        price: values.price,
        status: values.status,
        categoryId: values.category,
        isFeatured: values.isFeatured,
      },
    });

    return { success: "Product updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the product." };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await db.products.delete({ where: { id } });

    return { success: "Product deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the product." };
  }
};
