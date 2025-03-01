"use client";

import { Blogs } from "@prisma/client";
import React from "react";
import Heading from "@/components/global/heading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogValidation } from "@/validators/blogs";

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
import { createBlog, updateBlog } from "@/actions/blogs";

const BlogForm = ({ initialData }: { initialData: Blogs | null }) => {
  const router = useRouter();
  const title = initialData ? "Edit Blog" : "Create Blog";
  const description = initialData
    ? "Edit the blog details below"
    : "Fill in the details below to create a new blog";
  const action = initialData ? "Save Changes" : "Submit";

  const form = useForm<z.infer<typeof BlogValidation>>({
    resolver: zodResolver(BlogValidation),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof BlogValidation>) => {
    try {
      if (initialData) {
        const res = await updateBlog(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/blogs");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createBlog(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/blogs");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the blog.");
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter blog title"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your blog title. This will be displayed on your blog
                    page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Enter blog content"
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
                      disabled={isSubmitting}
                      endpoint="image"
                      onChange={field.onChange}
                      initialImage={initialData?.imageUrl}
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

export default BlogForm;
