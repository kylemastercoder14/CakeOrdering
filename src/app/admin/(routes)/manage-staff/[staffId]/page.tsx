import React from "react";
import db from "@/lib/db";
import StaffForm from "@/components/forms/staff-form";

const Page = async (props: {
  params: Promise<{
	staffId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.admin.findUnique({
	where: {
	  id: params.staffId,
	},
  });
  return <StaffForm initialData={data} />;
};

export default Page;
