"use client";

import { Products } from "@prisma/client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/global/alert-modal";
import { deleteProduct } from "@/actions/products";

const CellAction = ({ initialData }: { initialData: Products | null }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const onCopy = () => {
    const copiedData = `${initialData?.name}\n₱${initialData?.price.toFixed(
      2
    )}\n${initialData?.description}`;
    navigator.clipboard.writeText(copiedData);
    toast.success("Copied to clipboard");
  };

  const onDelete = async () => {
    try {
      const res = await deleteProduct(initialData?.id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModal(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };
  return (
    <>
      <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${initialData?.id}`)}
          >
            <Edit className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="size-4" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
