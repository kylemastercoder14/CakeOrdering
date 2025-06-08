"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define types based on your Prisma schema
type ProductWithStats = {
  id: string;
  name: string;
  salesToday: number;
  totalOrders: number;
  soldItems: number;
  totalRefunds: number;
  totalSales: number;
};

type CustomerWithStats = {
  id: string;
  name: string;
  email: string;
  orders: number;
  gender: string | null;
  address: string | null;
};

const Page = () => {
  const [dateRange, setDateRange] = React.useState<string>("Last 30 days");
  const [activeTab, setActiveTab] = React.useState<string>("items");
  const [products, setProducts] = React.useState<ProductWithStats[]>([]);
  const [customers, setCustomers] = React.useState<CustomerWithStats[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Create refs for printing
  const componentRef = useRef<HTMLDivElement>(null);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
      }
    `,
    documentTitle: `Dashboard Report - ${activeTab === "items" ? "Products" : "Customers"} - ${dateRange}`,
  });

  // Calculate date range based on selection
  const getDateRange = (range: string) => {
    const now = new Date();
    const fromDate = new Date();

    switch (range) {
      case "Last 7 days":
        fromDate.setDate(now.getDate() - 7);
        break;
      case "Last 15 days":
        fromDate.setDate(now.getDate() - 15);
        break;
      case "Last 30 days":
        fromDate.setDate(now.getDate() - 30);
        break;
      case "Last 60 days":
        fromDate.setDate(now.getDate() - 60);
        break;
      case "Last 90 days":
        fromDate.setDate(now.getDate() - 90);
        break;
      case "Last 180 days":
        fromDate.setDate(now.getDate() - 180);
        break;
      case "Last 365 days":
        fromDate.setDate(now.getDate() - 365);
        break;
      default:
        fromDate.setDate(now.getDate() - 30);
    }

    return { from: fromDate, to: now };
  };

  // Fetch product statistics
  const fetchProductStats = async (range: string) => {
    try {
      setLoading(true);
      const { from, to } = getDateRange(range);

      const response = await fetch(`/api/dashboard/products?from=${from.toISOString()}&to=${to.toISOString()}`);
      if (!response.ok) throw new Error("Failed to fetch product stats");

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer statistics
  const fetchCustomerStats = async (range: string) => {
    try {
      setLoading(true);
      const { from, to } = getDateRange(range);

      const response = await fetch(`/api/dashboard/customers?from=${from.toISOString()}&to=${to.toISOString()}`);
      if (!response.ok) throw new Error("Failed to fetch customer stats");

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle date range change
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (activeTab === "items") {
      fetchProductStats(value);
    } else {
      fetchCustomerStats(value);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "items") {
      fetchProductStats(dateRange);
    } else {
      fetchCustomerStats(dateRange);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setDateRange("Last 30 days");
    if (activeTab === "items") {
      fetchProductStats("Last 30 days");
    } else {
      fetchCustomerStats("Last 30 days");
    }
  };

  // Initial data fetch
  React.useEffect(() => {
    fetchProductStats(dateRange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex w-full mb-5 justify-end items-center">
        <div className="flex items-center gap-3">
          <div className="gap-y-2 flex flex-col">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 15 days">Last 15 days</SelectItem>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 60 days">Last 60 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="Last 180 days">Last 180 days</SelectItem>
                <SelectItem value="Last 365 days">Last 365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" className="mt-4" onClick={handleResetFilters}>
              Reset Filter
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="mt-4"
              onClick={handlePrint}
            >
              <PrinterIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Printable content */}
      <div ref={componentRef} className="p-4">
        <div className="no-print mb-4">
          <h1 className="text-2xl font-bold">
            {activeTab === "items" ? "Product Sales Report" : "Customer Statistics Report"}
          </h1>
          <p className="text-sm text-gray-500">
            Date Range: {dateRange} | Generated on: {new Date().toLocaleString()}
          </p>
        </div>

        <Tabs
          defaultValue="items"
          className="w-full"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          <TabsList className="no-print">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading product data...</p>
              </div>
            ) : (
              <Table>
                <TableCaption>Product Sales Statistics</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sales Today</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Sold Items</TableHead>
                    <TableHead>Total Refunds</TableHead>
                    <TableHead>Total Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>₱{product.salesToday.toFixed(2)}</TableCell>
                      <TableCell>{product.totalOrders}</TableCell>
                      <TableCell>{product.soldItems}</TableCell>
                      <TableCell>₱{product.totalRefunds.toFixed(2)}</TableCell>
                      <TableCell>₱{product.totalSales.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="customer">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading customer data...</p>
              </div>
            ) : (
              <Table>
                <TableCaption>Customer Statistics</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.gender || "N/A"}</TableCell>
                      <TableCell>{customer.address || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
