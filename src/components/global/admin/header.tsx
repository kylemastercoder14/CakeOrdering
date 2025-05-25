"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Extract relevant path segments
  const lastSegment = pathSegments[pathSegments.length - 1]; // 'create', 'id', or main entity
  const parentSegment = pathSegments.length > 2 ? pathSegments[pathSegments.length - 2] : null; // 'products', 'categories', etc.

  // Detect if the last segment is "create"
  const isCreate = lastSegment === "create";

  // Detect if the last segment is an ID (alphanumeric and longer than 8 chars)
  const isEdit = parentSegment && /^[a-zA-Z0-9_-]{8,}$/.test(lastSegment);

  // Determine entity type dynamically
  const entityType = parentSegment
    ? parentSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Construct parent path for navigation
  const parentPath = `/admin/${parentSegment || lastSegment}`;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1 hover:[#0F2A1D]/80" />
      <Separator orientation="vertical" className="mr-2 h-4 bg-[#0F2A1D]" />
      <Breadcrumb>
        <BreadcrumbList>
          {pathname !== "/admin/dashboard" && (
            <>
              <BreadcrumbItem className="hidden text-[#0F2A1D]/70 md:block">
                <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </>
          )}

          {/* Main Category */}
          <BreadcrumbItem>
            {parentSegment ? (
              <BreadcrumbLink href={parentPath} className="capitalize">
                {entityType}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-[#0F2A1D] capitalize font-semibold">
                {entityType}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {/* Create Breadcrumb */}
          {isCreate && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#0F2A1D] capitalize font-semibold">
                  Create {entityType}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {/* Edit Breadcrumb */}
          {isEdit && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#0F2A1D] capitalize font-semibold">
                  Edit {entityType}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default Header;
