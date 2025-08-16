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
} from "@/components/ui/dropdown-menu"
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
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext"
import { EmployeeFormToggler } from "@/components/forms/institution/EmployeeForm"
import { EStatus } from "@/prisma/lib/generated/prisma"
import { DepartmentFormToggler } from "@/components/forms/institution/DepartmentForm"
import { fetchDepartment } from "@/lib/actions/institution/Department"
import { SDepartmentTableRow } from "@/lib/select-types/institution/department"
import { InstitutionDepartmentsTable } from "@/components/data-tables/institution/DepartmentTable"

export default function DepartmentsPage() {
  const {authEmployee} = useInstitutionContext();

  const {data, isLoading, isError} = useQuery({
    queryKey: ["departments", "list", authEmployee.employeeRole.department.institution.id],
    queryFn: () => fetchDepartment(SDepartmentTableRow, {institution: {id: authEmployee.employeeRole.department.institution.id} }, 1000)
  });

  const departments = data ? data.data : [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Departments</h2>
          <p className="text-gray-600 mt-1">Manage Institution Departments.</p>
        </div>
        <DepartmentFormToggler institutionId={authEmployee.employeeRole.department.institution.id} title="Add a new department." name="Add Department" icon={<UserPlus className="mr-2 h-4 w-4" />} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300 px-2 rounded-md flex items-center justify-center gap-1 py-2" />
      </div>
      <InstitutionDepartmentsTable departments={departments}  />
    </div>
  )
}
