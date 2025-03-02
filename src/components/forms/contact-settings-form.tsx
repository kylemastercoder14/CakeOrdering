"use client";

import { Contact, Socials } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactInfoValidation } from "@/validators/settings";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import { updateContactInfo } from "@/actions/settings";

interface ContactProps extends Contact {
  socials: Socials[];
}

const ContactSettingsForm = ({
  initialData,
}: {
  initialData: ContactProps | null;
}) => {
  const router = useRouter();
  const title = "Contact information";
  const description = "Manage your contact information.";
  const action = "Save Changes";

  const form = useForm<z.infer<typeof ContactInfoValidation>>({
    resolver: zodResolver(ContactInfoValidation),
    defaultValues: {
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      googleMapUrl: initialData?.googleMapUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof ContactInfoValidation>) => {
    try {
      const res = await updateContactInfo(values, initialData?.id || "");
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the contact information.");
    }
  };
  return (
    <div className="flex flex-1 flex-col py-4 pt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-10 grid-cols-1 mt-5"
        >
          <div className="md:col-span-3">
            <h1 className="font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="space-y-4 md:col-span-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 dark:focus-visible:ring-[#ff3661] focus-visible:ring-[#8D021F] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                      placeholder="Enter phone number"
                      defaultCountry="PH"
                      countries={["PH"]}
                      international
                      countryCallingCodeEditable={false}
                      withCountryCallingCode
                      limitMaxLength={true}
                      value={field.value}
                      onChange={field.onChange}
                      numberInputProps={{
                        className: `rounded-md px-4 focus:outline-none bg-transparent h-full w-full !bg-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed`,
                      }}
                      maxLength={16}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleMapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Google Map URL <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter google map url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on the contact page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center mt-3 gap-2">
              <SubmitButton isSubmitting={isSubmitting} label={action} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactSettingsForm;
