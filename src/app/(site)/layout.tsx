import React from "react";
import Navigation from "@/components/global/site/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[#C3DCAA] h-screen">
      <Navigation />
      {children}
    </main>
  );
};

export default MainLayout;
