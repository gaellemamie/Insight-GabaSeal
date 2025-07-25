"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Building2, Download, Edit, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"


interface Institution {
  id: string
  name: string
  type: "Academic" | "Government" | "Corporate" | "Healthcare"
  email: string
  contactPerson: string
  status: "Verified" | "Pending" | "Rejected"
  documentsCount: number
  createdAt: string
}


const mockInstitutions: Institution[] = [
  {
    id: "inst-001",
    name: "Global University",
    type: "Academic",
    email: "admin@globaluniversity.edu",
    contactPerson: "Dr. Sarah Johnson",
    status: "Verified",
    documentsCount: 1284,
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "inst-002",
    name: "Ministry of Education",
    type: "Government",
    email: "contact@education.gov",
    contactPerson: "Robert Wilson",
    status: "Verified",
    documentsCount: 3542,
    createdAt: "2025-02-03T14:45:00Z",
  },
  {
    id: "inst-003",
    name: "TechCorp Inc.",
    type: "Corporate",
    email: "documents@techcorp.com",
    contactPerson: "Emily Chen",
    status: "Verified",
    documentsCount: 872,
    createdAt: "2025-02-18T09:15:00Z",
  },
  {
    id: "inst-004",
    name: "Central Hospital",
    type: "Healthcare",
    email: "records@centralhospital.org",
    contactPerson: "Dr. Michael Brown",
    status: "Verified",
    documentsCount: 2156,
    createdAt: "2025-03-05T11:20:00Z",
  },
  {
    id: "inst-005",
    name: "City College",
    type: "Academic",
    email: "admin@citycollege.edu",
    contactPerson: "Prof. James Wilson",
    status: "Pending",
    documentsCount: 342,
    createdAt: "2025-03-28T16:10:00Z",
  },
  {
    id: "inst-006",
    name: "Department of Transportation",
    type: "Government",
    email: "records@transport.gov",
    contactPerson: "Lisa Rodriguez",
    status: "Pending",
    documentsCount: 128,
    createdAt: "2025-04-02T13:40:00Z",
  },
  {
    id: "inst-007",
    name: "HealthPlus Medical Center",
    type: "Healthcare",
    email: "admin@healthplus.org",
    contactPerson: "Dr. Jessica Lee",
    status: "Rejected",
    documentsCount: 0,
    createdAt: "2025-04-10T10:05:00Z",
  },
]

export default function InstitutionsPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const filteredInstitutions = mockInstitutions.filter((institution) => {
    const matchesSearch =
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || institution.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || institution.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })


  const handleVerifyInstitution = (id: string) => {
    setIsLoading(true)

    setTimeout(() => {
      console.log(`Verifying institution with ID: ${id}`)
      setIsLoading(false)

    }, 1000)
  }


  const handleDeleteInstitution = (id: string) => {
    setIsLoading(true)

    setTimeout(() => {
      console.log(`Deleting institution with ID: ${id}`)
      setIsLoading(false)

    }, 1000)
  }


  const handleAddInstitution = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      console.log("Adding new institution")
      setIsLoading(false)
      setIsAddDialogOpen(false)

    }, 1000)
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">{status}</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">{status}</Badge>
      case "Rejected":
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Institutions</h2>
          <p className="text-gray-600 mt-1">Manage and verify registered institutions.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700 hover:from-navy-blue-600 hover:to-navy-blue-800 border-0 text-white shadow-md shadow-navy-blue-500/20 hover:shadow-navy-blue-600/30 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" /> Add Institution
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Institution</DialogTitle>
              <DialogDescription>
                Enter the details of the institution you want to add to the platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddInstitution}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactPerson" className="text-right">
                    Contact Person
                  </Label>
                  <Input id="contactPerson" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700"
                >
                  {isLoading ? "Adding..." : "Add Institution"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search institutions..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Institutions table */}
      <div className="rounded-md border shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstitutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No institutions found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredInstitutions.map((institution, index) => (
                <motion.tr
                  key={institution.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-navy-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-navy-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-blue-900">{institution.name}</p>
                        <p className="text-xs text-gray-500">{institution.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{institution.type}</TableCell>
                  <TableCell>{institution.contactPerson}</TableCell>
                  <TableCell>{getStatusBadge(institution.status)}</TableCell>
                  <TableCell>{institution.documentsCount.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(institution.createdAt)}</TableCell>
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
                        <DropdownMenuItem onClick={() => console.log(`View ${institution.id}`)}>
                          <Building2 className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log(`Edit ${institution.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        {institution.status === "Pending" && (
                          <DropdownMenuItem onClick={() => handleVerifyInstitution(institution.id)}>
                            <Upload className="mr-2 h-4 w-4" />
                            <span>Verify</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => console.log(`Export ${institution.id}`)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export Data</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteInstitution(institution.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - would be connected to API pagination in real implementation */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredInstitutions.length}</span> of{" "}
          <span className="font-medium">{mockInstitutions.length}</span> institutions
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
