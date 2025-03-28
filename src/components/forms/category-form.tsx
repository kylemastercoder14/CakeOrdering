"use client";

import { Categories } from "@prisma/client";
import React from "react";
import Heading from "@/components/global/heading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryValidation } from "@/validators/categories";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/global/image-upload";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/categories";

const CategoryForm = ({ initialData }: { initialData: Categories | null }) => {
  const router = useRouter();
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData
    ? "Edit the category details below"
    : "Fill in the details below to create a new category";
  const action = initialData ? "Save Changes" : "Submit";

  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    try {
      if (initialData) {
        const res = await updateCategory(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/categories");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createCategory(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/categories");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the category.");
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter category name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your category name. This will be displayed on your
                    product page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Enter category description"
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      defaultValue={field.value || ""}
                      onImageUpload={(url) => field.onChange(url)}
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

export default CategoryForm;
