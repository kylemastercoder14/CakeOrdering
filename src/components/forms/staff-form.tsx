"use client";

import { Admin } from "@prisma/client";
import React from "react";
import Heading from "@/components/global/heading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StaffValidation } from "@/validators/staff";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createStaff, updateStaff } from "@/actions/staff";

const StaffForm = ({ initialData }: { initialData: Admin | null }) => {
  const router = useRouter();
  const title = initialData ? "Edit Staff" : "Create Staff";
  const description = initialData
    ? "Edit the staff details below"
    : "Fill in the details below to create a new staff";
  const action = initialData ? "Save Changes" : "Submit";

  const form = useForm<z.infer<typeof StaffValidation>>({
    resolver: zodResolver(StaffValidation),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      role: initialData?.role || "",
      password: initialData?.password || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof StaffValidation>) => {
    try {
      if (initialData) {
        const res = await updateStaff(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/manage-staff");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createStaff(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/manage-staff");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the staff.");
    }
  };
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <Heading title={title} description={description} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 grid-cols-1 mt-5"
        >
          <div className="space-y-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Rider">Rider</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center mt-3 gap-2">
              <Button
                type="button"
                onClick={() => router.back()}
                variant="ghost"
              >
                Cancel
              </Button>
              <SubmitButton isSubmitting={isSubmitting} label={action} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StaffForm;
