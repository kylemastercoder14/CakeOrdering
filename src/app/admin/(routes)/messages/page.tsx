import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { MessageColumn } from "./_components/column";
import MessageClient from "./_components/client";

const Page = async () => {
  const messages = await db.contactMessage.findMany({
	orderBy: {
	  createdAt: "desc",
	},
  });

  const formattedData: MessageColumn[] =
	messages.map((item) => ({
	  id: item.id,
	  name: item.name,
	  email: item.email,
	  message: item.message,
	  subject: item.subject,
	})) || [];
  return (
	<div className="flex flex-1 flex-col p-4 pt-0">
	  <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
		<Heading
		  title="Manage Messages"
		  description="This page show all the messages in your store. You can view all messages."
		/>
	  </div>
	  <div className="mt-5">
		<MessageClient data={formattedData} />
	  </div>
	</div>
  );
};

export default Page;
