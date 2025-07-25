"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Download,
  FileSignature,
  Info,
  Upload,
  File,
  X,
  Filter,
} from "lucide-react"
import { useDropzone } from "react-dropzone"


interface Document {
  id: string
  title: string
  description: string
  fileName: string
  fileSize: number
  fileType: string
  status: "Draft" | "Signed" | "Pending Notification"
  collection: string
  uploadDate: string
}


const mockCollections = [
  { id: "col-1", name: "Legal Documents" },
  { id: "col-2", name: "Financial Reports" },
  { id: "col-3", name: "HR Documents" },
  { id: "col-4", name: "Meeting Notes" },
  { id: "col-5", name: "Project Proposals" },
  { id: "col-6", name: "Marketing Materials" },
]


const mockDocuments: Document[] = [
  {
    id: "doc-1",
    title: "Q1 Financial Report",
    description: "Quarterly financial report for Q1 2025",
    fileName: "Q1_Financial_Report_2025.pdf",
    fileSize: 2457600, // 2.4 MB
    fileType: "application/pdf",
    status: "Signed",
    collection: "Financial Reports",
    uploadDate: "2025-04-15",
  },
  {
    id: "doc-2",
    title: "Employee Handbook",
    description: "Updated employee handbook for 2025",
    fileName: "Employee_Handbook_2025.pdf",
    fileSize: 3145728, // 3 MB
    fileType: "application/pdf",
    status: "Draft",
    collection: "HR Documents",
    uploadDate: "2025-04-10",
  },
  {
    id: "doc-3",
    title: "Board Meeting Minutes",
    description: "Minutes from the April board meeting",
    fileName: "Board_Meeting_Minutes_April_2025.docx",
    fileSize: 1048576, // 1 MB
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    status: "Pending Notification",
    collection: "Meeting Notes",
    uploadDate: "2025-04-08",
  },
  {
    id: "doc-4",
    title: "Service Agreement",
    description: "Service agreement with vendor XYZ",
    fileName: "Service_Agreement_XYZ.pdf",
    fileSize: 1572864, // 1.5 MB
    fileType: "application/pdf",
    status: "Draft",
    collection: "Legal Documents",
    uploadDate: "2025-04-05",
  },
  {
    id: "doc-5",
    title: "Marketing Campaign Proposal",
    description: "Proposal for Q2 marketing campaign",
    fileName: "Q2_Marketing_Campaign_Proposal.pptx",
    fileSize: 4194304, // 4 MB
    fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    status: "Signed",
    collection: "Marketing Materials",
    uploadDate: "2025-04-01",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [newDocument, setNewDocument] = useState({
    title: "",
    description: "",
    collection: "",
  })


  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.fileName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || document.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0])
      }
    },
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
  })


  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedFile || !newDocument.title) return


    const newDoc: Document = {
      id: `doc-${documents.length + 1}`,
      title: newDocument.title,
      description: newDocument.description || "No description",
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      fileType: uploadedFile.type,
      status: "Draft",
      collection: newDocument.collection || "Uncategorized",
      uploadDate: new Date().toISOString().split("T")[0],
    }


    setDocuments([newDoc, ...documents])


    setNewDocument({
      title: "",
      description: "",
      collection: "",
    })
    setUploadedFile(null)
    setIsUploadDialogOpen(false)
  }


  const handleSignDocument = (id: string) => {
    setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, status: "Signed" as const } : doc)))
  }


  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }


  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">{status}</Badge>
      case "Signed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">{status}</Badge>
      case "Pending Notification":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a document to your secure document repository.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUploadDocument}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                    placeholder="Enter document title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    placeholder="Enter document description"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="collection">Collection</Label>
                  <Select
                    value={newDocument.collection}
                    onValueChange={(value) => setNewDocument({ ...newDocument, collection: value })}
                  >
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCollections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.name}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Document File</Label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragActive ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {uploadedFile ? (
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <File className="h-8 w-8 text-gray-400 mr-2" />
                          <div className="text-left">
                            <p className="text-sm font-medium truncate max-w-[250px]">{uploadedFile.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setUploadedFile(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className={`h-10 w-10 mb-2 ${isDragActive ? "text-emerald-500" : "text-gray-400"}`} />
                        {isDragActive ? (
                          <p className="text-lg font-medium text-emerald-600">Drop the file here...</p>
                        ) : (
                          <>
                            <p className="text-lg font-medium text-gray-700">Drag and drop a file here</p>
                            <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
                          </>
                        )}
                        <p className="text-xs text-gray-400 mt-2">Supports PDF, DOC, DOCX, PPT, PPTX up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!uploadedFile || !newDocument.title}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600"
                >
                  Upload Document
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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

      {filteredDocuments.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No documents found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center">
              {documents.length === 0
                ? "No documents uploaded yet. Upload your first document to get started."
                : "No documents match your search criteria. Try adjusting your filters."}
            </p>
            {documents.length === 0 && (
              <Button onClick={() => setIsUploadDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border shadow-sm bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Document</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document, index) => (
                <motion.tr
                  key={document.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-blue-900">{document.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[300px]">
                          {document.fileName} ({formatFileSize(document.fileSize)})
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{document.collection}</TableCell>
                  <TableCell>{getStatusBadge(document.status)}</TableCell>
                  <TableCell>{document.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {document.status !== "Signed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSignDocument(document.id)}
                          title="Sign Document"
                        >
                          <FileSignature className="h-4 w-4 text-emerald-600" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" title="View Metadata">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDeleteDocument(document.id)}>Delete</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
