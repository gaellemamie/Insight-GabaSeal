"use client";

import LogoutBtn from '@/components/forms/auth/LogoutBtn';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInstitutionContext } from '@/lib/contexts/InstitutionContext';
import { InstitutionNavLinks } from '@/lib/data/InstitutionNavLinks';
import { TAuthUser } from '@/lib/select-types/auth/user';
import { cn } from '@/lib/utils';
import { Building2, ChevronDown, HelpCircle, LogOut, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const InstitutionSidebar = ({sidebarOpen, setSidebarOpen}: {sidebarOpen: boolean, setSidebarOpen: (option:boolean) => void}) => {
      const pathname = usePathname();
      const {authEmployee} = useInstitutionContext();
  return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-navy-blue-900 font-bold text-lg">Insight</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-4">
          <div className="px-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-navy-blue-900">{authEmployee.employeeRole.department.institution.name}</p>
                  <p className="text-xs text-gray-500">{authEmployee.employeeRole.department.institution.field}</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1 px-2">
            {InstitutionNavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all",
                  pathname === item.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    pathname === item.href ? "text-emerald-600" : "text-gray-500 group-hover:text-emerald-500",
                  )}
                />
                {item.name}
                {item.name === "Notifications" && (
                  <span className="ml-auto bg-emerald-100 text-emerald-700 py-0.5 px-2 rounded-full text-xs">5</span>
                )}
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
              <p className="text-sm font-medium text-gray-900 truncate">{authEmployee.name}</p>
              <p className="text-xs text-gray-500 truncate">{authEmployee.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
      </div>
  )
}

export default InstitutionSidebar