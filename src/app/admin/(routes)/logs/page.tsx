import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { LogColumn } from "./_components/column";
import PromotionClient from "./_components/client";

const Page = async () => {
  const promotions = await db.logs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: LogColumn[] =
    promotions.map((item, index) => ({
      id: item.id,
      action: item.action,
      index: index + 1,
    })) || [];
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Logs"
          description="This page show all the logs in your store. You can view all logs."
        />
      </div>
      <div className="mt-5">
        <PromotionClient data={formattedData} />
      </div>
    </div>
  );
};

export default Page;
