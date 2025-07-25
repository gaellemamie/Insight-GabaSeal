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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
  FileText,
  FolderOpen,
} from "lucide-react"


interface Manager {
  id: string
  name: string
  email: string
  phone: string
  role: "Admin" | "Manager" | "Viewer"
  status: "Active" | "Inactive"
  collections: string[]
  documentTypes: string[]
  lastActive: string
}


const mockManagers: Manager[] = [
  {
    id: "mgr-001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    status: "Active",
    collections: ["All Collections"],
    documentTypes: ["All Document Types"],
    lastActive: "2025-04-15T10:30:00Z",
  },
  {
    id: "mgr-002",
    name: "Prof. Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    status: "Active",
    collections: ["Transcripts", "Certificates"],
    documentTypes: ["Academic Transcripts", "Certificates"],
    lastActive: "2025-04-14T15:45:00Z",
  },
  {
    id: "mgr-003",
    name: "Dean Robert Wilson",
    email: "robert.wilson@university.edu",
    phone: "+1 (555) 345-6789",
    role: "Manager",
    status: "Active",
    collections: ["Administrative", "Letters"],
    documentTypes: ["Administrative Documents", "Reference Letters"],
    lastActive: "2025-04-13T09:20:00Z",
  },
  {
    id: "mgr-004",
    name: "Dr. Emily Parker",
    email: "emily.parker@university.edu",
    phone: "+1 (555) 456-7890",
    role: "Manager",
    status: "Active",
    collections: ["Research"],
    documentTypes: ["Research Publications"],
    lastActive: "2025-04-12T14:10:00Z",
  },
  {
    id: "mgr-005",
    name: "Prof. James Wilson",
    email: "james.wilson@university.edu",
    phone: "+1 (555) 567-8901",
    role: "Viewer",
    status: "Active",
    collections: ["Transcripts"],
    documentTypes: ["Academic Transcripts"],
    lastActive: "2025-04-10T11:30:00Z",
  },
  {
    id: "mgr-006",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@university.edu",
    phone: "+1 (555) 678-9012",
    role: "Viewer",
    status: "Inactive",
    collections: ["Certificates"],
    documentTypes: ["Certificates"],
    lastActive: "2025-03-28T16:45:00Z",
  },
]


const mockCollections = [
  "Transcripts",
  "Certificates",
  "Research",
  "Letters",
  "Administrative",
  "Templates",
  "Agreements",
]
const mockDocumentTypes = [
  "Academic Transcripts",
  "Certificates",
  "Research Publications",
  "Reference Letters",
  "Administrative Documents",
]

export default function ManagersPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Manager",
    collections: [] as string[],
    documentTypes: [] as string[],
    allCollections: false,
    allDocumentTypes: false,
  })


  const filteredManagers = mockManagers.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || manager.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || manager.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })


  const handleAddManager = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)


    const managerData = {
      ...newManager,
      collections: newManager.allCollections ? ["All Collections"] : newManager.collections,
      documentTypes: newManager.allDocumentTypes ? ["All Document Types"] : newManager.documentTypes,
    }


    setTimeout(() => {
      console.log("Adding new manager:", managerData)
      setIsLoading(false)
      setIsAddDialogOpen(false)

      setNewManager({
        name: "",
        email: "",
        phone: "",
        role: "Manager",
        collections: [],
        documentTypes: [],
        allCollections: false,
        allDocumentTypes: false,
      })

    }, 1000)
  }


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


  const handleCollectionChange = (collection: string) => {
    setNewManager((prev) => {
      const collections = prev.collections.includes(collection)
        ? prev.collections.filter((c) => c !== collection)
        : [...prev.collections, collection]

      return { ...prev, collections }
    })
  }


  const handleDocumentTypeChange = (documentType: string) => {
    setNewManager((prev) => {
      const documentTypes = prev.documentTypes.includes(documentType)
        ? prev.documentTypes.filter((dt) => dt !== documentType)
        : [...prev.documentTypes, documentType]

      return { ...prev, documentTypes }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Managers</h2>
          <p className="text-gray-600 mt-1">Manage users who can sign and verify documents.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300">
              <UserPlus className="mr-2 h-4 w-4" /> Add Manager
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Manager</DialogTitle>
              <DialogDescription>Add a new user who can sign and verify documents.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddManager}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newManager.name}
                      onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newManager.role}
                      onValueChange={(value) => setNewManager({ ...newManager, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newManager.email}
                      onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newManager.phone}
                      onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collections">Collections Access</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allCollections"
                        checked={newManager.allCollections}
                        onCheckedChange={(checked) => {
                          setNewManager({
                            ...newManager,
                            allCollections: checked === true,
                            collections: [],
                          })
                        }}
                      />
                      <Label htmlFor="allCollections" className="text-sm font-normal">
                        All Collections
                      </Label>
                    </div>
                  </div>

                  {!newManager.allCollections && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {mockCollections.map((collection) => (
                        <div key={collection} className="flex items-center space-x-2">
                          <Checkbox
                            id={`collection-${collection}`}
                            checked={newManager.collections.includes(collection)}
                            onCheckedChange={() => handleCollectionChange(collection)}
                          />
                          <Label htmlFor={`collection-${collection}`} className="text-sm font-normal">
                            {collection}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="documentTypes">Document Types Access</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allDocumentTypes"
                        checked={newManager.allDocumentTypes}
                        onCheckedChange={(checked) => {
                          setNewManager({
                            ...newManager,
                            allDocumentTypes: checked === true,
                            documentTypes: [],
                          })
                        }}
                      />
                      <Label htmlFor="allDocumentTypes" className="text-sm font-normal">
                        All Document Types
                      </Label>
                    </div>
                  </div>

                  {!newManager.allDocumentTypes && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {mockDocumentTypes.map((documentType) => (
                        <div key={documentType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`documentType-${documentType}`}
                            checked={newManager.documentTypes.includes(documentType)}
                            onCheckedChange={() => handleDocumentTypeChange(documentType)}
                          />
                          <Label htmlFor={`documentType-${documentType}`} className="text-sm font-normal">
                            {documentType}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !newManager.name || !newManager.email}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600"
                >
                  {isLoading ? "Adding..." : "Add Manager"}
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
              <TableHead>Access</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
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
                const { id, role, collections } = manager
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
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs">
                          <FolderOpen className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="truncate max-w-[150px]">{collections.join(", ")}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FileText className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[150px]">{manager.documentTypes.join(", ")}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(manager.status)}</TableCell>
                    <TableCell>{formatDate(manager.lastActive)}</TableCell>
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
                              console.log(`${manager.status === "Active" ? "Deactivate" : "Activate"} ${id}`)
                            }
                          >
                            {manager.status === "Active" ? (
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
          <span className="font-medium">{mockManagers.length}</span> managers
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
