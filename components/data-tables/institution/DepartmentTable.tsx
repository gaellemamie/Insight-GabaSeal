"use client";

import { DepartmentDeleteBtn, DepartmentFormToggler } from "@/components/forms/institution/DepartmentForm";
import { EmployeeFormToggler } from "@/components/forms/institution/EmployeeForm";
import { EmployeeRoleFormToggler } from "@/components/forms/institution/EmployeeRoleForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { TDepartmentTableRow } from "@/lib/select-types/institution/department";
import { Edit, Plus, Trash } from "lucide-react";

export default function AdminDepartmentTable({departments, refresh, adminId}:{departments: TDepartmentTableRow[], refresh?: () => void, adminId:string}){
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Description",
               accessor: "description",
               render:((c: TDepartmentTableRow) => <p>{c.description}</p>),
          },
          {header:"Created On", accessor: "createdAt", render:(row: TDepartmentTableRow) => (new Date(row.createdAt)).toLocaleDateString()},
          {
               header: "Data",
               accessor: "id",
               render: (row: TDepartmentTableRow) => (
                    <div className="flex items-center gap-2">
                         <EmployeeRoleFormToggler departmentName={row.name} departmentId={row.id} className="py-1 px-2 text-sm text-white bg-teal-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Employee" title={`Add new Employee in ${row.name}`} />
                         <EmployeeFormToggler institutionId={row.institution.id} className="py-1 px-2 text-sm text-white bg-purple-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Department" title={`Add new Department in ${row.name}`} />
                    </div>
               )
          },
          {
               header: "Actions",
               accessor: "id",
               render: (row: TDepartmentTableRow) => (
                    <div className="flex items-center gap-2">
                         <DepartmentFormToggler id={row.id} institutionId={row.institution.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing Department: ${row.name}`} />
                         <DepartmentDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }
     ]
     return <GenericTable data={departments} columns={columns} refresh={refresh} pageSize={20} />

}

export const InstitutionDepartmentsTable = ({departments, refresh,}:{departments: TDepartmentTableRow[], refresh?: () => void,}) => {
     const columns = [
          {
               header: "Name",
               accessor: "name",
               searchable: true, sortable: true,
          },
          {
               header: "Description",
               accessor: "description",
               render:((c: TDepartmentTableRow) => <p>{c.description}</p>),
          },
          {header:"Created On", accessor: "createdAt", render:(row: TDepartmentTableRow) => (new Date(row.createdAt)).toLocaleDateString()},
          {
               header: "Data",
               accessor: "id",
               render: (row: TDepartmentTableRow) => (
                    <div className="flex items-center gap-2">
                         <EmployeeRoleFormToggler departmentName={row.name} departmentId={row.id} className="py-1 px-2 text-sm text-white bg-teal-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Role" title={`Add new Role in ${row.name}`} />
                         <EmployeeFormToggler institutionId={row.institution.id} className="py-1 px-2 text-sm text-white bg-purple-600 rounded-md flex items-center gap-1" icon={<Plus size={22}  />} name="Employee" title={`Add new employee in ${row.name}`} />
                    </div>
               )
          },
          {
               header: "Actions",
               accessor: "id",
               render: (row: TDepartmentTableRow) => (
                    <div className="flex items-center gap-2">
                         <DepartmentFormToggler id={row.id} institutionId={row.institution.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing Department: ${row.name}`} />
                         <DepartmentDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }
     ]
     return <GenericTable data={departments} columns={columns} refresh={refresh} pageSize={20} />
}