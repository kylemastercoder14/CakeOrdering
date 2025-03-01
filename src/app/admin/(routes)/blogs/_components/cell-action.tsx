"use client";

import { Blogs } from "@prisma/client";
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
import { deleteBlog } from '@/actions/blogs';

const CellAction = ({ initialData }: { initialData: Blogs | null }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const onCopy = () => {
    const coiedData = `${initialData?.title}\n${initialData?.content}`;
    navigator.clipboard.writeText(coiedData);
    toast.success("Copied to clipboard");
  };

  const onDelete = async () => {
    try {
      const res = await deleteBlog(initialData?.id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModal(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
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
            onClick={() => router.push(`/admin/blogs/${initialData?.id}`)}
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
