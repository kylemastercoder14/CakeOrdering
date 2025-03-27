import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, OrderColumn } from "./column";

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default OrderClient;

