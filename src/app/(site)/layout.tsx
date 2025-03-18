import React from "react";
import Navigation from "@/components/global/site/navigation";
import ChatBot from '@/components/global/chatbot';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navigation />
      <main className='h-screen bg-[#D0F2B7] w-full'>
      {children}
      </main>
      <ChatBot />
    </main>
  );
};

export default MainLayout;
