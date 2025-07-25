"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export interface CollectionProps {
  id: string
  name: string
  description: string
  documentCount: number
  createdAt: string
  onRename: (id: string) => void
  onDelete: (id: string) => void
}

export function CollectionCard({
  id,
  name,
  description,
  documentCount,
  createdAt,
  onRename,
  onDelete,
}: CollectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onRename(id)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {documentCount} {documentCount === 1 ? "document" : "documents"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Created {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          >
            <Link href={`/dashboard/collections/${id}`}>View Documents</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
