"use client"

import { DocumentTypesContainer } from "@/components/collections/DocumentTypesContainer"
import { DocumentTypeFormToggler } from "@/components/forms/signing/DocumentTypeForm"
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext"
import { Plus } from "lucide-react"
import Link from "next/link"
import type React from "react"

export default function DocumentTemplatesPage() {
  const {authEmployee} = useInstitutionContext();
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document Templates</h1>
        <DocumentTypeFormToggler name="New Template" title="New Document Type" institutionId={authEmployee.employeeRole.department.institution.id} className="text-white flex items-center gap-1 bg-green-800 rounded-lg py-2 px-4" icon={<Plus size={18} />}  /> 
      </div>
      <DocumentTypesContainer institutionId={authEmployee.employeeRole.department.institution.id} />
    </div>
  )
}