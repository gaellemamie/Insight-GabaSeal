"use client";

import { AdminDeleteBtn, AdminFormToggler } from "@/components/forms/management/AdminForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { TEmployeeTableRow } from "@/lib/select-types/institution/employee";
import { Edit, Trash } from "lucide-react";

export default function EmployeesTable({admins, refresh}:{admins: TEmployeeTableRow[], refresh?: () => void}){
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Email",
               accessor: "email",
               searchable: true, sortable: true,
          },
          {
               header: "Phone",
               accessor: "phone",
               searchable: true, sortable: true,
          },
          {
               header: "Status",
               accessor: "status",
               searchable: true, sortable: true,
          },
          {
               header: "Role",
               accessor: "role",
               searchable: true, sortable: true,
          },
          {
               header:"Work Info", 
               accessor: "employeeRole", 
               render:(row: TEmployeeTableRow) => (
                    <div className="flex flex-col items-start gap-1">
                         <p className="text-sm text-gray-600 font-medium">{row.employeeRole.department.name}</p>
                         <p className="text-sm text-gray-600">{row.employeeRole.name}</p>
                    </div>
               )
          },
          {header:"Joined On", accessor: "createdAt", render:(row: TEmployeeTableRow) => (new Date(row.createdAt)).toLocaleDateString()},
          {
               header: "Actions",
               accessor: "id",
               render: (row: TEmployeeTableRow) => (
                    <div className="flex items-center gap-2">
                         <AdminFormToggler id={row.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing category: ${row.name}`} />
                         <AdminDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }
     ]
     return <GenericTable data={admins} columns={columns} refresh={refresh} pageSize={20} />
}