import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const promotions = await db.promotions.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
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
       Client
      </div>
    </div>
  );
};

export default Page;
