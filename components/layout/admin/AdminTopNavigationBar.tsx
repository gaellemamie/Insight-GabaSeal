"use client";


import LogoutBtn from "@/components/forms/auth/LogoutBtn";
import { Button } from "@/components/ui/button"
import { AdminNavigationLinks } from "@/lib/data/AdminNavLinks"
import { Bell, LogOut, Menu, Search } from "lucide-react"
import { usePathname } from "next/navigation";
import { useState } from "react";

export const AdminTopNavigationBar = () => {
     const pathname = usePathname();
     const [sidebarOpen, setSidebarOpen] = useState(false)

     return (
          <header className="bg-white shadow-sm z-10">
               <div className="flex h-16 items-center justify-between px-4 sm:px-6">
               <div className="flex items-center">
               <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
               </Button>
               <h1 className="text-xl font-semibold text-navy-blue-900">
                    {AdminNavigationLinks.find((item) => item.href === pathname)?.name || "Admin Portal"}
               </h1>
               </div>

               <div className="flex items-center gap-3">
               <div className="hidden md:block relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                    type="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-navy-blue-500 focus:border-navy-blue-500"
                    placeholder="Search..."
                    />
               </div>

               <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500"></span>
               </Button>
               <LogoutBtn className="text-gray-600 hover:bg-gray-100 rounded-sm p-2" icon={<LogOut size={22} />} />
               </div>
               </div>
          </header>
     )
}