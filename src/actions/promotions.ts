"use server";

import db from "@/lib/db";

export const createPromotion = async (data: {
  name: string;
  description: string;
  discount: number;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  products: { id: string }[];
}) => {
  if (data.startDate > data.endDate) {
    return { error: "Start date cannot be greater than end date" };
  }

  if (new Date(data.startDate) < new Date()) {
    return { error: "Start date cannot be in the past" };
  }

  try {
    const existingPromotion = await db.promotions.findMany();

    if (existingPromotion.length > 0) {
      return {
        error: "Cannot create more than one promotion at a time",
      };
    }

    const promotion = await db.promotions.create({
      data: {
        name: data.name,
        description: data.description,
        discount: data.discount,
        imageUrl: data.imageUrl,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      },
    });

    await db.products.updateMany({
      where: {
        id: {
          in: data.products.map((product) => product.id),
        },
      },
      data: {
        promotionId: promotion.id,
      },
    });

    await db.logs.create({
      data: {
        action: `Created promotion ${
          data.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Promotion created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const updatePromotion = async (
  data: {
    name: string;
    description: string;
    discount: number;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    products: { id: string }[];
  },
  id: string
) => {
  if (data.startDate > data.endDate) {
    return { error: "Start date cannot be greater than end date" };
  }

  if (new Date(data.startDate) < new Date()) {
    return { error: "Start date cannot be in the past" };
  }

  try {
    // check if the promotion exists

    const existingPromotion = await db.promotions.findUnique({
      where: {
        id,
      },
    });

    if (!existingPromotion) {
      return { error: "Promotion not found" };
    }

    const promotion = await db.promotions.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        discount: data.discount,
        imageUrl: data.imageUrl,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      },
    });

    // Remove promotionId from products no longer linked to this promotion
    await db.products.updateMany({
      where: {
        promotionId: promotion.id,
        NOT: {
          id: {
            in: data.products.map((product) => product.id),
          },
        },
      },
      data: {
        promotionId: null,
      },
    });

    // Add promotionId to the newly linked products
    await db.products.updateMany({
      where: {
        id: {
          in: data.products.map((product) => product.id),
        },
      },
      data: {
        promotionId: promotion.id,
      },
    });

    await db.logs.create({
      data: {
        action: `Updated promotion ${
          data.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Promotion updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const deletePromotion = async (id: string) => {
  try {
    const promotion = await db.promotions.findUnique({
      where: {
        id,
      },
    });

    if (!promotion) {
      return { error: "Promotion not found" };
    }

    await db.products.updateMany({
      where: {
        promotionId: promotion.id,
      },
      data: {
        promotionId: null,
      },
    });

    await db.promotions.delete({
      where: {
        id,
      },
    });

    await db.logs.create({
      data: {
        action: `Deleted promotion ${
          promotion.name
        } at ${new Date().toLocaleString()}`,
      },
    });

    return { success: "Promotion deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};
