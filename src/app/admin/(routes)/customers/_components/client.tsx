import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, UserColumn } from "./column";

const UserClient = ({ data }: { data: UserColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default UserClient;
