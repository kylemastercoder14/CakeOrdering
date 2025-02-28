import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, PromotionColumn } from "./column";

const PromotionClient = ({ data }: { data: PromotionColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default PromotionClient;
