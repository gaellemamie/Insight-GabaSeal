import type React from "react"
import { Suspense } from "react"
import { AdminTopNavigationBar } from "@/components/layout/admin/AdminTopNavigationBar"
import AdminSideBar from "@/components/layout/admin/AdminSideBar"
import { getSessionUser } from "@/lib/actions/auth/user"
import { EUserType } from "@/prisma/lib/generated/prisma"
import { redirect } from "next/navigation"
import { SAdminTableRow } from "@/lib/select-types/management/admin"
import {  fetchAdmin } from "@/lib/actions/management/Admin"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const {user}  = await getSessionUser();
  if(!user) return redirect('/login');
  if(user.type !== EUserType.ADMIN) return redirect('/');
  const admins = await fetchAdmin(SAdminTableRow, {email: user.email}, 1);
  const adminData = admins.data[0];
  let admin;
  admin = adminData;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <AdminSideBar user={user} admin={admin} />

      {/* Main content area */}
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <AdminTopNavigationBar />
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
