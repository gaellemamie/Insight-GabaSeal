"use client";

import AdminInstitutionCategoryTable from "@/components/data-tables/institution/AdminInstitutionCategoryTable";
import { InstitutionCategoryFormToggler } from "@/components/forms/institution/InstitutionCategoryForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchInstitutionCategory } from "@/lib/actions/institution/InstitutionCategory";
import { QueryKeys } from "@/lib/query-keys";
import { SAdminInstitutionCategory } from "@/lib/select-types/institution/institution-category";
import { useQuery } from "@tanstack/react-query";
import { Building2, Plus } from "lucide-react";

export default function CategoriesPage() {
     const {data: institutionsData, isLoading, isError} = useQuery({
     queryKey: ["admin-institution-categories-page"],
     queryFn: () => fetchInstitutionCategory(SAdminInstitutionCategory, undefined, 1000)
     });

     const institutions = institutionsData ? institutionsData.data : [];

     return (
          <div className="space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                    <h2 className="text-2xl font-bold text-navy-blue-900">Institutions Categories</h2>
                    <p className="text-gray-600 mt-1">Manage institutions categories.</p>
               </div>
                    <InstitutionCategoryFormToggler title="Add new Institution Category" className="py-2 px-3 rounded-md text-white flex items-center gap-2 text-base bg-gradient-to-r from-navy-blue-500 to-navy-blue-700 hover:from-navy-blue-600 hover:to-navy-blue-800 border-0  shadow-md shadow-navy-blue-500/20 hover:shadow-navy-blue-600/30 transition-all duration-300 " name="New Category" icon={<Plus />} />

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
                         We couldn’t load the institutions. Please try again later.
                         </AlertDescription>
                    </Alert>
                    : 
                    <AdminInstitutionCategoryTable institutions={institutions} />
                    }
               </div>
          </div>
     )
}