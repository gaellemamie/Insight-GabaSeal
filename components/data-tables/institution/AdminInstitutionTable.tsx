"use client";

import { DepartmentFormToggler } from "@/components/forms/institution/DepartmentForm";
import { EmployeeFormToggler } from "@/components/forms/institution/EmployeeForm";
import { InstitutionDeleteBtn, InstitutionFormToggler } from "@/components/forms/institution/InstitutionForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { InstitutionViewToggler } from "@/components/views/InstitutionView";
import { TAdminInstitution } from "@/lib/select-types/institution/institution";
import { Edit, Eye, Plus, Trash } from "lucide-react";

export default function AdminInstitutionTable({institutions, refresh, adminId}:{institutions: TAdminInstitution[], refresh?: () => void, adminId:string}){
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Phone",
               accessor: "phone",
               searchable: true, sortable: true,
          },
          {
               header: "Email",
               accessor: "email",
               searchable: true, sortable: true,
          },
          {
               header: "Location",
               accessor: "location",
               searchable: true, sortable: true,
          },
          {
               header: "Type",
               accessor: "serviceType",
               searchable: true, sortable: true,
          },
          {
               header: "Category",
               accessor: "category",
               render: ((i: TAdminInstitution) => i.category.name),
               searchable: true, sortable: true,
          },
          {header:"Joined On", accessor: "createdAt", render:(row: TAdminInstitution) => (new Date(row.createdAt)).toLocaleDateString()},
          // {
          //      header: "Data",
          //      accessor: "id",
          //      render: (row: TAdminInstitution) => (
          //           <div className="flex items-center gap-2">
          //                <EmployeeFormToggler institutionId={row.id} className="py-1 px-2 text-sm text-white bg-teal-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Employee" title={`Add new Employee in ${row.name}`} />
          //                <DepartmentFormToggler institutionId={row.id} className="py-1 px-2 text-sm text-white bg-purple-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Department" title={`Add new Department in ${row.name}`} />
          //           </div>
          //      )
          // },
          {
               header: "Actions",
               accessor: "id",
               render: (row: TAdminInstitution) => (
                    <div className="flex items-center gap-2">
                         <InstitutionViewToggler id={row.id} className="text-orange-600" icon={<Eye size={22} />} title={`${row.name} content`} />
                         <InstitutionFormToggler adminId="" id={row.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing Institution: ${row.name}`} />
                         <InstitutionDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }
     ]
     return <GenericTable data={institutions} columns={columns} refresh={refresh} pageSize={20} />
}