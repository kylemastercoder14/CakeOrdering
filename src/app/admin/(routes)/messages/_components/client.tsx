import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, MessageColumn } from "./column";

const MessageClient = ({ data }: { data: MessageColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default MessageClient;
