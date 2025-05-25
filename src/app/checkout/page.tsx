import { auth } from "@clerk/nextjs/server";
import React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Client from './client';

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.users.findFirst({
    where: {
      clerkId: userId,
    },
  });
  return <Client user={user} />;
};

export default Page;
