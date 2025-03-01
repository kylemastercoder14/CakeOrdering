import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, LogColumn } from "./column";

const LogClient = ({ data }: { data: LogColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default LogClient;
