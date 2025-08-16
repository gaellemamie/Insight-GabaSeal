"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TAuthUser } from "@/lib/select-types/auth/user";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutBtn from "@/components/forms/auth/LogoutBtn";
import { Menu, Home, FileText, Settings, Bell, Building } from "lucide-react";
import Link from "next/link";
import { useSeekerContext } from "@/lib/contexts/SeekerContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";


export default function UserDashboardHeader({ user }: { user: TAuthUser }) {
     const router = useRouter();
     const [open, setOpen] = useState(false);
     const {seeker} = useSeekerContext();

     const navLinks = [
     { label: "Home", icon: Home, href: "/user" },
     { label: "Documents", icon: FileText, href: "/user/documents" },
     { label: "Institutions", icon: Building, href: "/user/institutions" },
     { label: "Notifications", icon: Bell, href: "/user/notifications" },
     { label: "Settings", icon: Settings, href: "/user/settings" },
     ];

     return (
     <header className="w-full border-b bg-white max-w-7xl my-2 rounded-md sticky top-2 mx-auto shadow-sm px-4 py-2 flex items-center justify-between">
          {/* Left: Logo / Brand */}
          <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/user")}
          >
          <Avatar className="h-14 w-14 border">
               <AvatarImage src={user.image || undefined} alt={user.email} />
               <AvatarFallback>
               {seeker.name.charAt(0).toUpperCase()}
               </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-1">
               <span className="text-sm font-medium text-gray-600">{seeker.name}</span>
               <span className="text-sm text-gray-500">{seeker.email}</span>
          </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
               <Link 
                    href={link.href}
               key={link.label}
               prefetch
               className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
               >
               <link.icon size={18} />
               <span className="text-sm font-medium">{link.label}</span>
               </Link>
          ))}
          </nav>

          {/* Right: User Info + Logout */}
          <div className="hidden md:flex items-center gap-4">
          <LogoutBtn
               name="Logout"
               className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
          />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
               <VisuallyHidden>
                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
               </VisuallyHidden>
               <SheetTrigger asChild>
               <Button variant="outline" size="icon">
               <Menu className="h-5 w-5" />
               </Button>
               </SheetTrigger>
               <SheetContent side="left" className="p-4">
                    <div className="flex items-center gap-3 border-b pb-4 mb-4">
                    <Avatar className="h-10 w-10 border">
                         <AvatarImage src={user.image || undefined} alt={user.email} />
                         <AvatarFallback>
                         {seeker.name.charAt(0).toUpperCase()}
                         </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                         <span className="font-medium text-gray-800">{seeker.name}</span>
                         <span className="text-xs text-gray-500">
                         {seeker.email}
                         </span>
                    </div>
                    </div>
                    <nav className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                         <button
                         key={link.label}
                         onClick={() => {
                              router.push(link.href);
                              setOpen(false);
                         }}
                         className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
                         >
                         <link.icon size={20} />
                         <span className="text-sm font-medium">{link.label}</span>
                         </button>
                    ))}
                    </nav>
                    <div className="mt-6">
                    <LogoutBtn
                         name="Logout"
                         className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                    />
                    </div>
               </SheetContent>
          </Sheet>
          </div>
     </header>
     );
}
