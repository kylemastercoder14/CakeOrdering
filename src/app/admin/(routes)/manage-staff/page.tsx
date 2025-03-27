import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { AdminColumn } from "./_components/column";
import AdminClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const admins = await db.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: AdminColumn[] =
    admins.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      email: item.email,
      role: item.role || "",
    })) || [];
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Staff"
          description="This page show all the staff and rider in your store. You can view all staff and rider."
        />
        <Button>
          <Link href="/admin/manage-staff/create">+ Add new staff</Link>
        </Button>
      </div>
      <div className="mt-5">
        <AdminClient data={formattedData} />
      </div>
    </div>
  );
};

export default Page;
