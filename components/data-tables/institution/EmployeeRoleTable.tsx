"use client";

import { EmployeeRoleDeleteBtn, EmployeeRoleFormToggler } from "@/components/forms/institution/EmployeeRoleForm";
import { InstitutionCategoryDeleteBtn, InstitutionCategoryFormToggler } from "@/components/forms/institution/InstitutionCategoryForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { TEmployeeRoleTableRow } from "@/lib/select-types/institution/employee-role";
import { TAdminInstitutionCategory } from "@/lib/select-types/institution/institution-category";
import { Edit, Trash } from "lucide-react";

export default function AdminEmployeeRoleTable({institutions, refresh}:{institutions: TEmployeeRoleTableRow[], refresh?: () => void}){
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Description",
               accessor: "description",
               render:((c: TEmployeeRoleTableRow) => <p>{c.description}</p>),
          },
          
          {
               header:"CreatedAt", 
               accessor: "createdAt", 
               render:(row: TEmployeeRoleTableRow) => (new Date(row.createdAt)).toLocaleDateString()
          },
          {
               header: "Actions",
               accessor: "id",
               render: (row: TEmployeeRoleTableRow) => (
                    <div className="flex items-center gap-2">
                         <EmployeeRoleFormToggler departmentName={row.department.name} departmentId={row.department.id} id={row.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing employee role: ${row.name}`} />
                         <EmployeeRoleDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }

     ]
     return <GenericTable data={institutions} columns={columns} refresh={refresh} pageSize={20} />
}