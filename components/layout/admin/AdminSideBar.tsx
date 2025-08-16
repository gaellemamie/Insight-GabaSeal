"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { AdminNavigationLinks } from "@/lib/data/AdminNavLinks";
import { TAuthUser } from "@/lib/select-types/auth/user";
import { TAdminTableRow } from "@/lib/select-types/management/admin";
import { cn } from "@/lib/utils";
import { User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSideBar ({user, admin}: {user:TAuthUser, admin:TAdminTableRow}) {
     const [sidebarOpen, setSidebarOpen] = useState(false)
       const pathname = usePathname();
       const isMobile = useMobile();

       useEffect(() => {
          if (isMobile) {
               setSidebarOpen(false)
          }
          }, [pathname, isMobile]);
     return(
          <>
               <div
                    className={cn(
                         "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300 lg:hidden",
                         sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                    onClick={() => setSidebarOpen(false)}
                    />

                    {/* Sidebar */}
                    <div
                    className={cn(
                         "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64",
                         sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                    >
                    <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                         <Link href="/admins" className="flex items-center gap-2">
                         <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-navy-blue-600 to-navy-blue-800 flex items-center justify-center shadow-md shadow-navy-blue-600/20">
                         <span className="text-white font-bold text-sm">I</span>
                         </div>
                         <span className="text-navy-blue-900 font-bold text-lg">Admin</span>
                         </Link>
                         <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                         <X className="h-5 w-5" />
                         </Button>
                    </div>

                    <div className="py-4">
                         <nav className="space-y-1 px-2">
                         {AdminNavigationLinks.map((item) => (
                         <Link
                              key={item.name}
                              href={item.href}
                              className={cn(
                              "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all",
                              pathname === item.href
                                   ? "bg-navy-blue-50 text-navy-blue-700"
                                   : "text-gray-700 hover:bg-gray-50 hover:text-navy-blue-600",
                              )}
                         >
                              <item.icon
                              className={cn(
                                   "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                   pathname === item.href ? "text-navy-blue-600" : "text-gray-500 group-hover:text-navy-blue-500",
                              )}
                              />
                              {item.name}
                         </Link>
                         ))}
                         </nav>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                         <div className="flex items-center gap-3 px-2 py-3">
                         <div className="h-8 w-8 rounded-full bg-navy-blue-100 flex items-center justify-center">
                         <User className="h-4 w-4 text-navy-blue-600" />
                         </div>
                         <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium text-gray-900 truncate">{admin.name}</p>
                         <p className="text-xs text-gray-500 truncate">{user.email}</p>
                         </div>
                         </div>
                    </div>
                    </div>
          </>
     )
}