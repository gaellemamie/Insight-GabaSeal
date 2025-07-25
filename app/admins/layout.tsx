"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { LayoutDashboard, Building2, Settings, Menu, X, Bell, Search, User } from "lucide-react"
import { Suspense } from "react"

export default function AdminLayout({
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
    { name: "Dashboard", href: "/admins", icon: LayoutDashboard },
    { name: "Institutions", href: "/admins/institutions", icon: Building2 },
    { name: "Settings", href: "/admins/settings", icon: Settings },
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
            {navigation.map((item) => (
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
              <p className="text-sm font-medium text-gray-900 truncate">Super Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@insight.com</p>
            </div>
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
                {navigation.find((item) => item.href === pathname)?.name || "Admin Portal"}
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
