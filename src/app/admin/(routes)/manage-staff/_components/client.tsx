import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, AdminColumn } from "./column";

const AdminClient = ({ data }: { data: AdminColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default AdminClient;
