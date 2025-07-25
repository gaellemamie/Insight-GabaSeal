"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export interface CreateCollectionProps {
  onCreateCollection: (name: string, description: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCollectionModal({ onCreateCollection, isOpen, onOpenChange }: CreateCollectionProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onCreateCollection(name, description)
    setName("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Create Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>Create a collection to organize related documents together.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Collection Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter collection name"
                className="w-full"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter collection description (optional)"
                className="w-full"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              Create Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
