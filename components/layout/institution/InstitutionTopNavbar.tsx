"use client";

import LogoutBtn from '@/components/forms/auth/LogoutBtn';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useInstitutionContext } from '@/lib/contexts/InstitutionContext';
import { InstitutionNavLinks } from '@/lib/data/InstitutionNavLinks'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { Bell, HelpCircle, LogOut, Menu, Search, Settings, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const InstitutionTopNavbar = ({setSidebarOpen}: {setSidebarOpen: (option: boolean) => void}) => {
     const pathname = usePathname();
     const {authEmployee} = useInstitutionContext();
     return (
          <header className="bg-white shadow-sm z-10">
               <div className="flex h-16 items-center justify-between px-4 sm:px-6">
               <div className="flex items-center">
               <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
               </Button>
               <h1 className="text-xl font-semibold text-navy-blue-900">
                    {InstitutionNavLinks.find((item) => item.href === pathname)?.name || "Dashboard"}
               </h1>
               </div>

               <div className="flex items-center gap-3">
               <div className="hidden md:block relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                    type="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Search documents..."
                    />
               </div>

               <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500"></span>
               </Button>

               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                         <div className="h-6 w-6 rounded-full bg-navy-blue-100 flex items-center justify-center">
                         <User className="h-3 w-3 text-navy-blue-600" />
                         </div>
                         <span className="hidden md:inline-block">{authEmployee.name}</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white p-2 rounded-md shadow-md">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                         <User className="mr-2 h-4 w-4" />
                         <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                         <Settings className="mr-2 h-4 w-4" />
                         <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                         <HelpCircle className="mr-2 h-4 w-4" />
                         <span>Help</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                         <LogoutBtn name='Log out' icon={<LogOut className="mr-2 h-4 w-4" />} className='w-full flex items-center justify-start gap-' />
                    </DropdownMenuItem>
                    </DropdownMenuContent>
               </DropdownMenu>
               </div>
               </div>
          </header>
     )
}

export default InstitutionTopNavbar