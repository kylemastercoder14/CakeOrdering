"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { Admin } from "@prisma/client";

const data = {
  navMain: [
    {
      title: "General",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Categories",
          url: "/admin/categories",
        },
        {
          title: "Products",
          url: "/admin/products",
        },
        {
          title: "Transactions",
          url: "/admin/transactions",
        },
        {
          title: "Customers",
          url: "/admin/customers",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      items: [
        {
          title: "Promotions",
          url: "/admin/promotions",
        },
        {
          title: "Blogs",
          url: "/admin/blogs",
        },
      ],
    },
    {
      title: "Others",
      url: "#",
      items: [
        {
          title: "Manage Staff",
          url: "/admin/manage-staff",
        },
        {
          title: "Settings",
          url: "/admin/settings",
        },
        {
          title: "Messages",
          url: "/admin/messages",
        },
        {
          title: "Logs",
          url: "/admin/logs",
        },
      ],
    },
  ],
};

const riderData = {
  navMain: [
    {
      title: "General",
      url: "#",
      items: [
        {
          title: "Order Management",
          url: "/admin/order-management",
        },
      ],
    },
  ],
};

export function AppSidebar({
  staff,
  ...props
}: React.ComponentProps<typeof Sidebar> & { staff: Admin }) {
  const pathname = usePathname();
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="hover:bg-[#47301B] hover:text-white"
              size="lg"
              asChild
            >
              <a href="/admin/dashboard">
                <div className="relative w-10 h-10">
                  <Image
                    fill
                    className="w-full h-full"
                    src="/assets/logo.png"
                    alt="Logo"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    {"Marian's"} Homebakeshop
                  </span>
                  <span className="">
                    {staff.role === "Rider" ? "Rider Panel" : "Admin Panel"}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {staff.role === "Rider" ? (
            <SidebarMenu className="gap-2">
              {riderData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-[#47301B] hover:text-white pointer-events-none font-semibold"
                    asChild
                  >
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          ) : (
            <SidebarMenu className="gap-2">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-[#47301B] hover:text-white pointer-events-none font-semibold"
                    asChild
                  >
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser staff={staff} />
      </SidebarFooter>
    </Sidebar>
  );
}
