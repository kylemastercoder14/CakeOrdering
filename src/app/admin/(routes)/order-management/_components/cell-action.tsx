/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bike,
  Box,
  CircleCheck,
  Ellipsis,
  Fullscreen,
  Trash,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/global/alert-modal";
import {
  deliverOrder,
} from "@/actions/order";
import { Modal } from "@/components/ui/modal";
import ViewOrder from "./view-order";

const CellAction = ({ id, status }: { id: string; status: string }) => {
  const router = useRouter();
  const [openModalPickup, setOpenModalPickup] = React.useState(false);
  const [openModalView, setOpenModalView] = React.useState(false);

  const onDelivery = async () => {
    try {
      const res = await deliverOrder(id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModalPickup(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update for pickup");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModalPickup}
        onClose={() => setOpenModalPickup(false)}
        onConfirm={onDelivery}
        description="This action cannot be undone. Are you sure you want to proceed?"
      />
      <Modal
        className="max-w-4xl"
        isOpen={openModalView}
        onClose={() => setOpenModalView(false)}
      >
        <ViewOrder id={id} />
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenModalPickup(true)}>
            <Box className="size-4" />
            Out for delivery
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModalView(true)}>
            <Fullscreen className="size-4" />
            View Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
