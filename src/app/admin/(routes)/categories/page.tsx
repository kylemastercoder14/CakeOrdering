import React from "react";
import Heading from "@/components/global/heading";
import CategoriesClient from "./_components/client";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const categories = await db.categories.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Categories"
          description="This page show all the categories in your store. You can create, edit, and delete categories."
        />
        <Link href="/admin/categories/create">
          <Button size="sm">+ Create new category</Button>
        </Link>
      </div>
      <div className="mt-5">
        <CategoriesClient categories={categories} />
      </div>
    </div>
  );
};

export default Page;
