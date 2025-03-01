import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PromotionColumn } from "./_components/column";
import PromotionClient from "./_components/client";

const Page = async () => {
  const promotions = await db.promotions.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
    },
  });

  const formattedData: PromotionColumn[] =
    promotions.map((item) => ({
      id: item.id,
      name: item.name,
      discount: `${item.discount}% off for ${item.products.length} product/s`,
      promotionPeriod: `${format(item.startDate, "MMMM dd, yyyy")} - ${format(
        item.endDate,
        "MMMM dd, yyyy"
      )}`,
      promotionStatus: item.status,
      description: item.description,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Promotions"
          description="This page show all the promotions in your store. You can create, edit, and delete promotions."
        />
        <Link href="/admin/promotions/create">
          <Button size="sm">+ Create new promotions</Button>
        </Link>
      </div>
      <div className="mt-5">
        <PromotionClient data={formattedData} />
      </div>
    </div>
  );
};

export default Page;
