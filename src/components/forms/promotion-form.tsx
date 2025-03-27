"use client";

import { Categories, Products, Promotions } from "@prisma/client";
import React from "react";
import Heading from "@/components/global/heading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PromotionValidation } from "@/validators/promotions";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/global/image-upload";
import { toast } from "sonner";
import Image from "next/image";
import { CircleHelp, CopyIcon } from "lucide-react";
import ProductModal from "@/components/modals/product-modal";
import { createPromotion, updatePromotion } from "@/actions/promotions";

interface PromotionFormProps extends Promotions {
  products: Products[];
}

const PromotionForm = ({
  initialData,
  products,
  categories,
}: {
  initialData: PromotionFormProps | null;
  products: Products[];
  categories: Categories[];
}) => {
  const router = useRouter();
  const title = initialData ? "Edit Promotion" : "Create Promotion";
  const description = initialData
    ? "Edit the promotion details below"
    : "Fill in the details below to create a new promotion";
  const action = initialData ? "Save Changes" : "Submit";

  const [productModal, setProductModal] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<Products[]>(
    []
  );
  const [selectedForBatchDelete, setSelectedForBatchDelete] = React.useState<
    string[]
  >([]);

  // Initialize selectedProducts with initialData products
  React.useEffect(() => {
    if (initialData?.products) {
      const initialProducts = products.filter((product) =>
        initialData.products.some((p) => p.id === product.id)
      );
      setSelectedProducts(initialProducts);
    }
  }, [initialData, products]);

  const handleDelete = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleBatchDelete = () => {
    setSelectedProducts((prev) =>
      prev.filter((product) => !selectedForBatchDelete.includes(product.id))
    );
    setSelectedForBatchDelete([]); // Clear the batch selection after deletion
  };

  const handleBatchSelection = (productId: string) => {
    setSelectedForBatchDelete((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const form = useForm<z.infer<typeof PromotionValidation>>({
    resolver: zodResolver(PromotionValidation),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      discount: initialData?.discount || 0,
      products: initialData?.products.map((product) => product.id) || [],
      startDate: initialData?.startDate
        ? new Date(initialData.startDate)
        : undefined,
      endDate: initialData?.endDate
        ? new Date(initialData.endDate)
        : undefined,
    },
  });

  React.useEffect(() => {
    form.setValue(
      "products",
      selectedProducts.map((product) => product.id)
    );
    form.trigger("products");
  }, [selectedProducts, form]);

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof PromotionValidation>) => {
    try {
      const data = {
        ...values,
        products: selectedProducts,
      };
      if (initialData) {
        const res = await updatePromotion(data, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/promotions");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createPromotion(data);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/promotions");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the promotion.");
    }
  };
  return (
    <>
      <ProductModal
        isOpen={productModal}
        onClose={() => setProductModal(false)}
        products={products}
        selectedProducts={selectedProducts}
        categories={categories}
        setSelectedProducts={setSelectedProducts}
      />
      <div className="flex flex-1 flex-col p-4 pt-0">
        <Heading title={title} description={description} />
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-5 gap-10">
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
                          placeholder="Enter promotion name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your promotion name. This will be displayed on
                        Homepage.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount (%) <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isSubmitting}
                          placeholder="Enter promotion discount (e.g. 10)"
                          {...field}
                        />
                      </FormControl>
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
                          placeholder="Enter product description"
                          {...field}
                          className="h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          Start date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;tomorrow at 3pm&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. tomorrow at 3pm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          End date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;one week from now&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. one week from now"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
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
                <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border mt-7">
                  <h1 className="font-semibold text-lg">Products</h1>
                  <p className="text-muted-foreground">
                    Select products and set promotional prices
                  </p>
                  <Button
                    disabled={isSubmitting}
                    onClick={() => setProductModal(true)}
                    type="button"
                    variant="outline"
                    className="mt-3 border-[#251201] bg-transparent hover:bg-transparent text-[#251201] hover:text-[#251201]/80"
                  >
                    Select Products
                  </Button>
                  {/* show only if there are selected products. */}
                  {selectedProducts.length > 0 && (
                    <>
                      <Button
                        disabled={
                          isSubmitting || selectedForBatchDelete.length === 0
                        }
                        onClick={handleBatchDelete}
                        variant="destructive"
                        className="ml-2"
                      >
                        Batch Delete
                      </Button>
                      <div className="mt-3 overflow-y-auto border rounded-xl shadow min-h-[50vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">
                                <Checkbox
                                  checked={
                                    selectedForBatchDelete.length ===
                                      selectedProducts.length &&
                                    selectedProducts.length > 0
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedForBatchDelete(
                                        selectedProducts.map((p) => p.id)
                                      );
                                    } else {
                                      setSelectedForBatchDelete([]);
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead className="w-[450px]">
                                Product Name
                              </TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Availability</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedProducts.map((product) => {
                              return (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedForBatchDelete.includes(
                                        product.id
                                      )}
                                      onCheckedChange={() =>
                                        handleBatchSelection(product.id)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-start gap-2">
                                      <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                      />
                                      <div>
                                        <p className="line-clamp-1 text-sm">
                                          {product.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                          <p className="text-sm text-muted-foreground">
                                            ID: {product.id}
                                          </p>
                                          <CopyIcon className="w-3 h-3 cursor-pointer" />
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <p>₱{product.price.toFixed(2)}</p>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-3 h-3 rounded-full ${
                                          product.status === "In stock"
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                        }`}
                                      ></div>
                                      <span>{product.status}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() => handleDelete(product.id)}
                                      variant="destructive"
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </>
                  )}
                </div>
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
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PromotionForm;
