"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import CellAction from "./cell-action";

export type OrderColumn = {
  id: string;
  orderNumber: string;
  totalAmount: string;
  name: string;
  orderStatus: string;
};

export type RefundColumn = {
  id: string;
  orderNumber: string;
  totalAmount: string;
  refundStatus: string;
  name: string;
  reason: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Order Number
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Total Amount
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Order Status
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      const statusClass =
        status === "Pending"
          ? "bg-yellow-600"
          : status === "Rejected"
          ? "bg-red-600"
          : "bg-green-600";

      return (
        <span
          className={`text-sm font-medium px-3 py-1.5 rounded-md text-white ${statusClass}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <CellAction id={row.original.id} status={row.original.orderStatus} />,
  },
];

export const columns2: ColumnDef<RefundColumn>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Order Number
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Total Amount
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "refundStatus",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Refund Status
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      const status = row.original.refundStatus;
      const statusClass =
        status === "Pending"
          ? "bg-yellow-600"
          : status === "Rejected"
          ? "bg-red-600"
          : "bg-green-600";

      return (
        <span
          className={`text-sm font-medium px-3 py-1.5 rounded-md text-white ${statusClass}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Reason
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  // {
  //   accessorKey: "action",
  //   header: "",
  //   cell: ({ row }) => <CellAction2 id={row.original.id} status={row.original.refundStatus} />,
  // },
];
