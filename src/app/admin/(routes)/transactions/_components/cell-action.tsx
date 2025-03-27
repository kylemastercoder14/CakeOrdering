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
  CircleCheck,
  Ellipsis,
  Fullscreen,
  Trash,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/global/alert-modal";
import { approveOrder, deleteOrder, pickUpOrder, rejectOrder } from "@/actions/order";
import { Modal } from "@/components/ui/modal";
import ViewOrder from "./view-order";

const CellAction = ({ id, status }: { id: string; status: string }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalReject, setOpenModalReject] = React.useState(false);
  const [openModalApprove, setOpenModalApprove] = React.useState(false);
  const [openModalPickup, setOpenModalPickup] = React.useState(false);
  const [openModalView, setOpenModalView] = React.useState(false);

  const onDelete = async () => {
    try {
      const res = await deleteOrder(id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModal(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    }
  };

  const onReject = async () => {
    try {
      const res = await rejectOrder(id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModalReject(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject order");
    }
  };

  const onApprove = async () => {
    try {
      const res = await approveOrder(id as string);
      if (res.success) {
        toast.success(res.success);
        setOpenModalApprove(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve order");
    }
  };

  const onPickup = async () => {
    try {
      const res = await pickUpOrder(id as string);
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
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <AlertModal
        isOpen={openModalReject}
        onClose={() => setOpenModalReject(false)}
        onConfirm={onReject}
        description="This action cannot be undone. This will reject the order and notify the customer."
      />
      <AlertModal
        isOpen={openModalApprove}
        onClose={() => setOpenModalApprove(false)}
        onConfirm={onApprove}
        description="This action cannot be undone. This will approve the order and notify the customer."
      />
      <AlertModal
        isOpen={openModalPickup}
        onClose={() => setOpenModalPickup(false)}
        onConfirm={onPickup}
        description="This action cannot be undone. This will notify the rider to pick up the order."
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
          {status === "Pending" && (
            <>
              <DropdownMenuItem onClick={() => setOpenModalApprove(true)}>
                <CircleCheck className="size-4" />
                Approve Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenModalReject(true)}>
                <XCircle className="size-4" />
                Reject Order
              </DropdownMenuItem>
            </>
          )}
          {status === "Approved" && (
            <DropdownMenuItem onClick={() => setOpenModalPickup(true)}>
              <Bike className="size-4" />
              Ready for Pickup
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpenModalView(true)}>
            <Fullscreen className="size-4" />
            View Order
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
