import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns2, RefundColumn } from "./column";

const RefundClient = ({ data }: { data: RefundColumn[] }) => {
  return (
	<div>
	  <DataTable searchKey="name" columns={columns2} data={data} />
	</div>
  );
};

export default RefundClient;

