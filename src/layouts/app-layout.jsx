import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import { PlusIcon, Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      <main>
        <SidebarNav />
        <Header />
        <div className="w-full md:max-w-4xl mx-auto bg-red-400">
          <Outlet />
        </div>
        <BottomNav />
      </main>
      <div className="hidden md:flex fixed bottom-8 right-8">
        <div className="border border-gray-200 px-6 py-4 rounded-lg hover:shadow-sm cursor-pointer group bg-white">
          <PlusIcon
            className="text-gray-700 group-hover:text-black transition-colors duration-100"
            size={24}
          />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
