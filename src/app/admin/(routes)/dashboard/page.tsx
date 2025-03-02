import React from "react";
import Heading from "@/components/global/heading";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { PieChartComponent } from '@/components/charts/pie-chart';
import { LineChartComponent } from '@/components/charts/line-chart';

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex w-full justify-between items-center">
        <Heading
          title="Analytics Report"
          description="Last Updated: 03/02/2025 - 8:30 AM"
        />
        <div className="flex items-center gap-3">
          <div className="gap-y-2 flex flex-col">
            <Label>Date Range</Label>
            <Select>
              <SelectTrigger className='w-[200px]'>
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
          <div className="gap-y-2 flex flex-col">
            <Label>Transaction status</Label>
            <Select>
              <SelectTrigger className='w-[250px]'>
                <SelectValue placeholder="Select transaction status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">
                  <div className="flex items-center">
                    <div className="mr-2 size-2 rounded-full bg-yellow-600"></div>
                    Pending
                  </div>
                </SelectItem>
                <SelectItem value="Processing">
                  <div className="flex items-center">
                    <div className="mr-2 size-2 rounded-full bg-blue-600"></div>
                    Processing
                  </div>
                </SelectItem>
                <SelectItem value="Completed">
                  <div className="flex items-center">
                    <div className="mr-2 size-2 rounded-full bg-green-600"></div>
                    Completed
                  </div>
                </SelectItem>
                <SelectItem value="Declined">
                  <div className="flex items-center">
                    <div className="mr-2 size-2 rounded-full bg-red-600"></div>
                    Declined
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="default" className="mt-4">
            Reset Filter
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <BarChartComponent />
      </div>
      <div className="mt-5 grid lg:grid-cols-10 grid-cols-1 gap-4">
        <div className="lg:col-span-4">
          <PieChartComponent />
        </div>
        <div className="lg:col-span-6">
          <LineChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;
