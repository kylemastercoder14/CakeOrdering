import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { UserColumn } from "./_components/column";
import UserClient from "./_components/client";

const Page = async () => {
  const users = await db.users.findMany({
	orderBy: {
	  createdAt: "desc",
	},
  });

  const formattedData: UserColumn[] =
	users.map((item) => ({
	  id: item.id,
	  name: item.name,
	  email: item.email,
	  phoneNumber: item.phoneNumber || "",
	  address: item.address || "",
	})) || [];
  return (
	<div className="flex flex-1 flex-col p-4 pt-0">
	  <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
		<Heading
		  title="Manage Customers"
		  description="This page show all the customers in your store. You can view all customers."
		/>
	  </div>
	  <div className="mt-5">
		<UserClient data={formattedData} />
	  </div>
	</div>
  );
};

export default Page;
