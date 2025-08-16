"use client";

import { InstitutionCategoryDeleteBtn, InstitutionCategoryFormToggler } from "@/components/forms/institution/InstitutionCategoryForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { TAdminInstitutionCategory } from "@/lib/select-types/institution/institution-category";
import { Edit, Trash } from "lucide-react";

export default function AdminInstitutionCategoryTable({institutions, refresh}:{institutions: TAdminInstitutionCategory[], refresh?: () => void}){
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Description",
               accessor: "description",
               render:((c: TAdminInstitutionCategory) => <p>{c.description}</p>),
          },
          {
               header: "Institutions",
               accessor: "_count",
               render:((c: TAdminInstitutionCategory) => <p>{c._count.institutions}</p>),
          },
          {
               header:"Joined On", 
               accessor: "createdAt", 
               render:(row: TAdminInstitutionCategory) => (new Date(row.createdAt)).toLocaleDateString()
          },
          {
               header: "Actions",
               accessor: "id",
               render: (row: TAdminInstitutionCategory) => (
                    <div className="flex items-center gap-2">
                         <InstitutionCategoryFormToggler id={row.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing category: ${row.name}`} />
                         <InstitutionCategoryDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }

     ]
     return <GenericTable data={institutions} columns={columns} refresh={refresh} pageSize={20} />
}