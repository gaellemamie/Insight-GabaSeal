"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  FileSignature,
  Users,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  LogOut,
  HelpCircle,
  Building2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()


  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "Collections", href: "/dashboard/collections", icon: FolderOpen },
    { name: "Bulk Sign", href: "/dashboard/bulk-sign", icon: FileSignature },
    { name: "Managers", href: "/dashboard/managers", icon: Users },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
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
                  <p className="text-sm font-medium text-navy-blue-900">Global University</p>
                  <p className="text-xs text-gray-500">Academic Institution</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
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
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john.doe@university.edu</p>
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
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-navy-blue-900">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
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
                    <span className="hidden md:inline-block">John Doe</span>
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
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
