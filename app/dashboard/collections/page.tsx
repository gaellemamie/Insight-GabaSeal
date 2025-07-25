"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CollectionCard } from "@/components/collections/collection-card"
import { Search, Folder, Grid, List, Plus, FileText, Calendar, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"


interface Collection {
  id: string
  name: string
  description: string
  documentCount: number
  createdAt: string
}


const initialCollections: Collection[] = [
  {
    id: "col-1",
    name: "Financial Reports",
    description: "Quarterly and annual financial reports for the organization",
    documentCount: 24,
    createdAt: "2025-03-15T10:30:00Z",
  },
  {
    id: "col-2",
    name: "HR Documents",
    description: "Employee handbooks, policies, and other HR-related documents",
    documentCount: 18,
    createdAt: "2025-03-10T14:45:00Z",
  },
  {
    id: "col-3",
    name: "Legal Contracts",
    description: "Service agreements, NDAs, and other legal documents",
    documentCount: 12,
    createdAt: "2025-02-28T09:15:00Z",
  },
  {
    id: "col-4",
    name: "Marketing Materials",
    description: "Brochures, presentations, and other marketing assets",
    documentCount: 8,
    createdAt: "2025-02-20T11:20:00Z",
  },
  {
    id: "col-5",
    name: "Board Meeting Minutes",
    description: "Minutes from board meetings and related documents",
    documentCount: 15,
    createdAt: "2025-02-15T16:10:00Z",
  },
  {
    id: "col-6",
    name: "Research Papers",
    description: "Academic research papers and publications",
    documentCount: 32,
    createdAt: "2025-02-05T13:40:00Z",
  },
]

interface CreateCollectionModalProps {
  onCreateCollection: (name: string, description: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ onCreateCollection, isOpen, onOpenChange }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    onCreateCollection(name, description)
    setName("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>Create a new collection to organize your documents.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Create collection</Button>
      </DialogContent>
    </Dialog>
  )
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")


  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  const handleCreateCollection = (name: string, description: string) => {
    const newCollection: Collection = {
      id: `col-${collections.length + 1}`,
      name,
      description: description || "No description",
      documentCount: 0,
      createdAt: new Date().toISOString(),
    }

    setCollections([newCollection, ...collections])
    setIsCreateModalOpen(false)
  }


  const handleRenameCollection = (id: string) => {


    console.log(`Rename collection with ID: ${id}`)
  }


  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter((collection) => collection.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collections</h1>
        <CreateCollectionModal
          onCreateCollection={handleCreateCollection}
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search collections..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredCollections.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Folder className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No collections found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center">
              {collections.length === 0
                ? "No collections created yet. Create your first collection to organize your documents."
                : "No collections match your search criteria."}
            </p>
            {collections.length === 0 && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Collection
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="w-full">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  description={collection.description}
                  documentCount={collection.documentCount}
                  createdAt={collection.createdAt}
                  onRename={handleRenameCollection}
                  onDelete={handleDeleteCollection}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{collection.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{collection.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <FileText className="h-4 w-4" />
                              <span>{collection.documentCount} documents</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                          >
                            <a href={`/dashboard/collections/${collection.id}`}>View Documents</a>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleRenameCollection(collection.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCollection(collection.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
