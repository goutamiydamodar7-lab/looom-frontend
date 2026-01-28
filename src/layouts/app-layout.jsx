import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import { PlusIcon, Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateThread from "@/Hooks/use-create-thread";

const AppLayout = () => {
  const thread = useCreateThread();
  return (
    <div className="app">
      <main>
        <SidebarNav onCreateClick={thread.openDialog}/>
        <Header />
        <div className="w-full md:max-w-4xl mx-auto bg-red-400">
          <Outlet />
        </div>
        <BottomNav />
        <Dialog open={thread.open} onOpenChange={thread.setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
