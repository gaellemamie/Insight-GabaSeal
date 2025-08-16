"use client"

import DocumentEditor from "@/components/ui/DocumentEditor"
import Link from "next/link"
import type React from "react"

export default function DocumentTemplateAddPage() {

  return (
    <div className="p-6 space-y-6">
      <DocumentEditor />
    </div>
  )
}