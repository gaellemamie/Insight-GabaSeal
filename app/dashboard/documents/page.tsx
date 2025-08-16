"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select"
import {
  Search,
  Plus,
  Filter,
} from "lucide-react"
import { DocumentFormToggler } from "@/components/forms/signing/DocumentForm"
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext"
import { DocumentsTable } from "@/components/data-tables/signing/DocumentTable"
import { useQuery } from "@tanstack/react-query"
import { fetchDocument } from "@/lib/actions/signing/document"
import { SDocumentTableRow } from "@/lib/select-types/signing/document"
import { getMarker } from "@/utils/signing"


export default function DocumentsPage() {
  const {authEmployee}  = useInstitutionContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const {data:documentsData, isLoading:loadingDocuments} = useQuery({
    queryKey: ["documents", "page", authEmployee.employeeRole.department.institution.id],
    queryFn: () => fetchDocument(SDocumentTableRow, {
      documentType: {institutionId: authEmployee.employeeRole.department.institution.id}, 
      OR: [
        {unSignedBy: {contains: getMarker(authEmployee.employeeRole)}},
        {signedBy: {contains: getMarker(authEmployee.employeeRole)}}
      ]
    },1000)
  });

  console.log(documentsData);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <DocumentFormToggler institutionId={authEmployee.employeeRole.department.institution.id} name="Upload Document" icon={<Plus size={18} />} className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-md py-2 px-3 text-white flex items-center justify-center gap-2" title="New Document to sign" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="pending notification">Pending Notification</SelectItem>
          </SelectContent>
        </Select>
      </div>
        <div className="rounded-md border shadow-sm bg-white overflow-hidden p-2">
          {
            documentsData?.data ? <DocumentsTable data={documentsData.data} /> : null}
        </div>
    </div>
  )
}
