"use client";

import { AdminDeleteBtn, AdminFormToggler } from "@/components/forms/management/AdminForm";
import { GenericTable } from "@/components/ui/generic-data-table";
import { TAdminTableRow } from "@/lib/select-types/management/admin";
import { Edit, Trash } from "lucide-react";

export default function AdminsTable({admins, refresh}:{admins: TAdminTableRow[], refresh?: () => void}){
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
               header: "Status",
               accessor: "status",
               searchable: true, sortable: true,
          },
          {
               header: "Role",
               accessor: "role",
               searchable: true, sortable: true,
          },
          {header:"Joined On", accessor: "createdAt", render:(row: TAdminTableRow) => (new Date(row.createdAt)).toLocaleDateString()},
          {
               header: "Actions",
               accessor: "id",
               render: (row: TAdminTableRow) => (
                    <div className="flex items-center gap-2">
                         <AdminFormToggler id={row.id} className="text-orange-600" icon={<Edit size={22} />} title={`Editing category: ${row.name}`} />
                         <AdminDeleteBtn id={row.id} className="" icon={<Trash size={22} />} />
                    </div>
               )
          }
     ]
     return <GenericTable data={admins} columns={columns} refresh={refresh} pageSize={20} />
}