import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/admin/app-sidebar";
import Header from "@/components/global/admin/header";
import { useUser } from "@/hooks/use-user";
import { redirect } from 'next/navigation';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { staff } = await useUser();

  if(!staff) redirect("/admin");
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
          backgroundColor: "#fff",
        } as React.CSSProperties
      }
    >
      <AppSidebar staff={staff} />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
