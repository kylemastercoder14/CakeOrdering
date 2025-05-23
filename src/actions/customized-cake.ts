"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";

// Approve a customized cake
export async function approveCake(cakeId: string) {
  try {
    const updatedCake = await db.customizedCake.update({
      where: {
        id: cakeId,
      },
      data: {
        status: "Approved",
        updatedAt: new Date(),
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: "Cake approved successfully",
      data: updatedCake,
    };
  } catch (error) {
    console.error("Error approving cake:", error);
    return {
      success: false,
      message: "Failed to approve cake. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Reject a customized cake
export async function rejectCake(cakeId: string) {
  try {
    const updatedCake = await db.customizedCake.update({
      where: {
        id: cakeId,
      },
      data: {
        status: "Rejected",
        updatedAt: new Date(),
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: "Cake rejected successfully",
      data: updatedCake,
    };
  } catch (error) {
    console.error("Error rejecting cake:", error);
    return {
      success: false,
      message: "Failed to reject cake. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete a customized cake
export async function deleteCake(cakeId: string) {
  try {
    const deletedCake = await db.customizedCake.delete({
      where: {
        id: cakeId,
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: "Cake deleted successfully",
      data: deletedCake,
    };
  } catch (error) {
    console.error("Error deleting cake:", error);
    return {
      success: false,
      message: "Failed to delete cake. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get all customized cakes with optional status filter
export async function getCustomizedCakes(status?: string) {
  try {
    const whereClause = status ? { status } : {};

    const cakes = await db.customizedCake.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: cakes,
    };
  } catch (error) {
    console.error("Error fetching cakes:", error);
    return {
      success: false,
      message: "Failed to fetch cakes",
      error: error instanceof Error ? error.message : "Unknown error",
      data: [],
    };
  }
}

// Get a single customized cake by ID
export async function getCakeById(cakeId: string) {
  try {
    const cake = await db.customizedCake.findUnique({
      where: {
        id: cakeId,
      },
    });

    if (!cake) {
      return {
        success: false,
        message: "Cake not found",
        data: null,
      };
    }

    return {
      success: true,
      data: cake,
    };
  } catch (error) {
    console.error("Error fetching cake:", error);
    return {
      success: false,
      message: "Failed to fetch cake",
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

// Update cake status (generic function)
export async function updateCakeStatus(
  cakeId: string,
  status: "Pending" | "Approved" | "Rejected"
) {
  try {
    const updatedCake = await db.customizedCake.update({
      where: {
        id: cakeId,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: `Cake status updated to ${status.toLowerCase()} successfully`,
      data: updatedCake,
    };
  } catch (error) {
    console.error("Error updating cake status:", error);
    return {
      success: false,
      message: "Failed to update cake status. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Bulk approve cakes
export async function bulkApproveCakes(cakeIds: string[]) {
  try {
    const updatedCakes = await db.customizedCake.updateMany({
      where: {
        id: {
          in: cakeIds,
        },
      },
      data: {
        status: "Approved",
        updatedAt: new Date(),
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: `${updatedCakes.count} cakes approved successfully`,
      data: updatedCakes,
    };
  } catch (error) {
    console.error("Error bulk approving cakes:", error);
    return {
      success: false,
      message: "Failed to approve cakes. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Bulk reject cakes
export async function bulkRejectCakes(cakeIds: string[]) {
  try {
    const updatedCakes = await db.customizedCake.updateMany({
      where: {
        id: {
          in: cakeIds,
        },
      },
      data: {
        status: "Rejected",
        updatedAt: new Date(),
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: `${updatedCakes.count} cakes rejected successfully`,
      data: updatedCakes,
    };
  } catch (error) {
    console.error("Error bulk rejecting cakes:", error);
    return {
      success: false,
      message: "Failed to reject cakes. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Bulk delete cakes
export async function bulkDeleteCakes(cakeIds: string[]) {
  try {
    const deletedCakes = await db.customizedCake.deleteMany({
      where: {
        id: {
          in: cakeIds,
        },
      },
    });

    // Revalidate the page to show updated data
    revalidatePath("/admin/customized-cakes");
    revalidatePath("/customized-cakes");

    return {
      success: true,
      message: `${deletedCakes.count} cakes deleted successfully`,
      data: deletedCakes,
    };
  } catch (error) {
    console.error("Error bulk deleting cakes:", error);
    return {
      success: false,
      message: "Failed to delete cakes. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get cake statistics
export async function getCakeStatistics() {
  try {
    const [totalCakes, pendingCakes, approvedCakes, rejectedCakes] =
      await Promise.all([
        db.customizedCake.count(),
        db.customizedCake.count({ where: { status: "Pending" } }),
        db.customizedCake.count({ where: { status: "Approved" } }),
        db.customizedCake.count({ where: { status: "Rejected" } }),
      ]);

    const totalRevenue = await db.customizedCake.aggregate({
      where: { status: "Approved" },
      _sum: { price: true },
    });

    return {
      success: true,
      data: {
        total: totalCakes,
        pending: pendingCakes,
        approved: approvedCakes,
        rejected: rejectedCakes,
        totalRevenue: totalRevenue._sum.price || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching cake statistics:", error);
    return {
      success: false,
      message: "Failed to fetch statistics",
      error: error instanceof Error ? error.message : "Unknown error",
      data: {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        totalRevenue: 0,
      },
    };
  }
}
