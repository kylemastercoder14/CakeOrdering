"use server";

import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const createProduct = async (values: {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  status: string;
  category: string;
  flavors: string[];
  allergens: string[];
  sizes: string[];
  isFeatured?: boolean;
}) => {
  try {
    const product = await db.products.create({
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        price: values.price,
        status: values.status,
        categoryId: values.category,
        flavors: values.flavors,
        allergens: values.allergens,
        sizes: values.sizes,
        isFeatured: values.isFeatured,
      },
    });

    await db.logs.create({
      data: {
        action: `Created product ${
          values.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/"); // Home page
    revalidatePath("/products"); // Products listing page
    revalidatePath(`/products/${product.id}`); // Product detail page if exists

    // Revalidate by tag (if using tagged fetching)
    revalidateTag("products");
    revalidateTag("featured-products");

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
    flavors: string[];
    allergens: string[];
    sizes: string[];
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
        flavors: values.flavors,
        allergens: values.allergens,
        sizes: values.sizes,
        isFeatured: values.isFeatured,
      },
    });

    await db.logs.create({
      data: {
        action: `Updated product ${
          values.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);

    // Revalidate by tag
    revalidateTag("products");
    revalidateTag("featured-products");

    return { success: "Product updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the product." };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await db.products.delete({ where: { id } });

    await db.logs.create({
      data: {
        action: `Deleted product ${
          product.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);

    // Revalidate by tag
    revalidateTag("products");
    revalidateTag("featured-products");

    return { success: "Product deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while deleting the product." };
  }
};
