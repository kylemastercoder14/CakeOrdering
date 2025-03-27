"use client";

import { About } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StoreInfoValidation } from "@/validators/settings";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Editor from "@/components/global/editor";
import { updateStoreInfo } from "@/actions/settings";
import ImageUpload from "../global/image-upload";

const AboutSettingsForm = ({ initialData }: { initialData: About | null }) => {
  const router = useRouter();
  const title = "Store information";
  const description = "This will show on your homepage.";
  const action = "Save Changes";

  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof StoreInfoValidation>>({
    resolver: zodResolver(StoreInfoValidation),
    defaultValues: {
      logo: initialData?.logo || "",
      storeName: initialData?.storeName || "",
      about: initialData?.content || "",
      mission: initialData?.mission || "",
      vision: initialData?.vision || "",
      coreValues: initialData?.coreValues || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof StoreInfoValidation>) => {
    try {
      const res = await updateStoreInfo(values, initialData?.id || "");
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the store information.");
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
            <div className="space-y-4">
              <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Logo <span className="text-red-600">*</span>
              </p>
              {initialData?.logo && !isEditing && (
                <div className="flex items-center">
                  <Avatar className="w-20 h-20 mr-4">
                    <AvatarImage src={initialData?.logo as string} />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={toggleEdit}
                    type="button"
                    className="mx-2"
                    size="sm"
                  >
                    Change logo
                  </Button>
                </div>
              )}

              {!initialData?.logo || isEditing && (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
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
                  <Button
                    type="button"
                    size="sm"
                    onClick={toggleEdit}
                    variant="destructive"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Store Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Editor disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mission <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Editor disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Vision <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Editor disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="coreValues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Core Values <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Editor disabled={isSubmitting} {...field} />
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
              <SubmitButton isSubmitting={isSubmitting} label={action} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutSettingsForm;
