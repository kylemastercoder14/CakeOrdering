import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PersonalSettingsForm from "@/components/forms/personal-settings-form";
import PasswordSettingsForm from "@/components/forms/password-settings-form";
import AboutSettingsForm from "@/components/forms/about-settings-form";
import ContactSettingsForm from "@/components/forms/contact-settings-form";
import SocialsSettingsForm from "@/components/forms/socials-settings-form";
import FaqSettingsForm from "@/components/forms/faq-settings-form";
import PoliciesSettingsForm from "@/components/forms/policies-settings-form";

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

  const contactInfo = await db.contact.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      socials: true,
    },
  });

  const faqInfo = await db.faqs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const policies = await db.policies.findMany({
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
          <TabsContent value="contact">
            <ContactSettingsForm initialData={contactInfo} />
            <SocialsSettingsForm initialData={contactInfo} />
          </TabsContent>
          <TabsContent value="faqs">
            <FaqSettingsForm initialData={faqInfo} />
          </TabsContent>
          <TabsContent value="policies">
            <PoliciesSettingsForm initialData={policies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
