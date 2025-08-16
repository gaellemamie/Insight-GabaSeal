"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion"
import {
  UserPlus,
  Search,
  MoreHorizontal,
  User,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchEmployee } from "@/lib/actions/institution/Employee"
import { SEmployeeTableRow } from "@/lib/select-types/institution/employee"
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext"
import { EmployeeFormToggler } from "@/components/forms/institution/EmployeeForm"
import { EStatus } from "@/prisma/lib/generated/prisma"


export default function ManagersPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const {authEmployee} = useInstitutionContext();

  const {data, isLoading, isError} = useQuery({
    queryKey: ["employees", "list", authEmployee.employeeRole.department.institution.id],
    queryFn: () => fetchEmployee(SEmployeeTableRow, {employeeRole: {department:{institutionId: authEmployee.employeeRole.department.institution.id}}}, 1000)
  });


  const managers = data ? data.data : [];
  const total = data ? data.pagination.total : 0;

  const filteredManagers = managers.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || manager.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || manager.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-navy-blue-100 text-navy-blue-700 hover:bg-navy-blue-200">{role}</Badge>
      case "Manager":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">{role}</Badge>
      case "Viewer":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">{role}</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Managers</h2>
          <p className="text-gray-600 mt-1">Manage users who can sign and verify documents.</p>
        </div>
        <EmployeeFormToggler institutionId={authEmployee.employeeRole.department.institution.id} title="Add a new user who can sign and verify documents." name="Add Manager" icon={<UserPlus className="mr-2 h-4 w-4" />} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300 px-2 rounded-md flex items-center justify-center gap-1 py-2" />
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search managers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Managers table */}
      <div className="rounded-md border shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManagers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No managers found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredManagers.map((manager, index) => {
                const { id, role} = manager
                return (
                  <motion.tr
                    key={manager.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-navy-blue-900">{manager.name}</p>
                          <p className="text-xs text-gray-500">{manager.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(role)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          <span>{manager.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{manager.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(manager.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => console.log(`Edit ${id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log(`Permissions ${id}`)}>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Permissions</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              console.log(`${manager.status === EStatus.ACTIVE ? "Deactivate" : "Activate"} ${id}`)
                            }
                          >
                            {manager.status === EStatus.ACTIVE ? (
                              <>
                                <User className="mr-2 h-4 w-4" />
                                <span>Deactivate</span>
                              </>
                            ) : (
                              <>
                                <User className="mr-2 h-4 w-4" />
                                <span>Activate</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => console.log(`Delete ${id}`)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - would be connected to API pagination in real implementation */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredManagers.length}</span> of{" "}
          <span className="font-medium">{total}</span> managers
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}