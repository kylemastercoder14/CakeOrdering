import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PersonalSettingsForm from "@/components/forms/personal-settings-form";
import PasswordSettingsForm from "@/components/forms/password-settings-form";
import AboutSettingsForm from '@/components/forms/about-settings-form';

const Page = async () => {
  const personalInfo = await db.admin.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const aboutInfo = await db.about.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading title="Settings" description="" />
      </div>
      <div className="mt-5">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact & Social Media</TabsTrigger>
            <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <PersonalSettingsForm initialData={personalInfo} />
            <Separator className="my-7" />
            <PasswordSettingsForm initialData={personalInfo} />
            <Separator className="my-7" />
            <AboutSettingsForm initialData={aboutInfo} />
          </TabsContent>
          <TabsContent value="contact">Change your password here.</TabsContent>
          <TabsContent value="faqs">Change your password here.</TabsContent>
          <TabsContent value="policies">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
