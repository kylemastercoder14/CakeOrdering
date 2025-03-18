"use client";

import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative flex items-center justify-center mt-10">
      {/* Search Input */}
      <div className="bg-white/65 w-[600px] shadow-md h-[40px] rounded-md flex items-center justify-between pr-1 pl-5 mr-3">
        <input
          type="text"
          className="bg-transparent border-none outline-none text-sm w-full"
          placeholder="Search any products here..."
        />
        <button className="rounded-full py-2 px-4">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
