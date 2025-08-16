"use client";

import AdminsTable from "@/components/data-tables/management/AdminsTable";
import { AdminFormToggler } from "@/components/forms/management/AdminForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdmin } from "@/lib/actions/management/Admin";
import { QueryKeys } from "@/lib/query-keys";
import { SAdminTableRow } from "@/lib/select-types/management/admin";
import { useQuery } from "@tanstack/react-query";
import { Building2, Plus } from "lucide-react";

export default function UsersPage() {
     const {data: institutionsData, isLoading, isError} = useQuery({
     queryKey: [QueryKeys.management.admins],
     queryFn: () => fetchAdmin(SAdminTableRow, undefined, 1000)
     });

     const admins = institutionsData ? institutionsData.data : [];

     return (
          <div className="space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                    <h2 className="text-2xl font-bold text-navy-blue-900">Users Management</h2>
                    <p className="text-gray-600 mt-1">Management admins of Gaba seal</p>
               </div>
                    <AdminFormToggler title="Save new Admin" className="py-2 px-3 rounded-md text-white flex items-center gap-2 text-base bg-gradient-to-r from-navy-blue-500 to-navy-blue-700 hover:from-navy-blue-600 hover:to-navy-blue-800 border-0  shadow-md shadow-navy-blue-500/20 hover:shadow-navy-blue-600/30 transition-all duration-300 " name="New Admin" icon={<Plus />} />

               </div>
               <div className="rounded-md border shadow-sm bg-white overflow-hidden p-2">
               {
                    isLoading ? 
                    <div className="space-y-4">
                         {[...Array(3)].map((_, i) => (
                         <Skeleton key={i} className="h-16 w-full rounded-xl" />
                         ))}
                    </div>
                    :
                    isError ? 
                    <Alert variant="destructive">
                         <Building2 className="h-4 w-4" />
                         <AlertTitle>Something went wrong</AlertTitle>
                         <AlertDescription>
                         We couldn’t load the users. Please try again later.
                         </AlertDescription>
                    </Alert>
                    : 
                    <AdminsTable admins={admins} />
                    }
               </div>
          </div>
     )
}