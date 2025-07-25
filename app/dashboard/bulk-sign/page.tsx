"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { FileText, X, CheckCircle2, AlertCircle, FileSignature, Upload } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


interface BulkDocument {
  id: string
  name: string
  size: number
  type: string
  status: "Ready" | "Signed" | "Error" | "Processing"
  errorMessage?: string
  collection?: string
}


const mockCollections = [
  { id: "col-1", name: "Financial Reports" },
  { id: "col-2", name: "HR Documents" },
  { id: "col-3", name: "Legal Documents" },
  { id: "col-4", name: "Meeting Notes" },
  { id: "col-5", name: "Project Proposals" },
  { id: "col-6", name: "Marketing Materials" },
]

export default function BulkSignPage() {

  const [documents, setDocuments] = useState<BulkDocument[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [selectedCollection, setSelectedCollection] = useState<string>("")


  const onDrop = useCallback((acceptedFiles: File[]) => {

    const newDocuments: BulkDocument[] = acceptedFiles.map((file) => ({
      id: `doc-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "Ready",
    }))

    setDocuments((prev) => [...prev, ...newDocuments])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  })


  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }


  const handleBulkSign = () => {
    if (documents.length === 0) return

    setIsProcessing(true)
    setProgress(0)
    setSuccessCount(0)
    setErrorCount(0)


    setDocuments((prev) => prev.map((doc) => ({ ...doc, status: "Processing" })))


    const totalDocuments = documents.length
    let processed = 0


    documents.forEach((doc, index) => {
      setTimeout(
        () => {

          const success = Math.random() > 0.1

          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id
                ? {
                    ...d,
                    status: success ? "Signed" : "Error",
                    errorMessage: success ? undefined : "Failed to sign document",
                    collection: selectedCollection || "Uncategorized", // Add collection information
                  }
                : d,
            ),
          )

          processed++
          setProgress(Math.round((processed / totalDocuments) * 100))

          if (success) {
            setSuccessCount((prev) => prev + 1)
          } else {
            setErrorCount((prev) => prev + 1)
          }


          if (processed === totalDocuments) {
            setTimeout(() => {
              setIsProcessing(false)
            }, 1000)
          }
        },
        (index + 1) * 800,
      ) // Stagger the processing for visual effect
    })
  }


  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return <Badge className="bg-gray-100 text-gray-700">Ready</Badge>
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-700">Processing</Badge>
      case "Signed":
        return <Badge className="bg-emerald-100 text-emerald-700">Signed</Badge>
      case "Error":
        return <Badge className="bg-rose-100 text-rose-700">Error</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-blue-900">Bulk Sign</h2>
        <p className="text-gray-600 mt-1">Sign multiple documents at once to save time.</p>
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className={`h-12 w-12 mb-4 ${isDragActive ? "text-emerald-500" : "text-gray-400"}`} />
          {isDragActive ? (
            <p className="text-lg font-medium text-emerald-600">Drop the files here...</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700">Drag and drop files here</p>
              <p className="text-sm text-gray-500 mt-2">or click to select files</p>
            </>
          )}
          <p className="text-xs text-gray-400 mt-4">Supports PDF, DOC, DOCX up to 10MB each</p>
        </div>
      </div>

      {/* Document list */}
      {documents.length > 0 && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Documents to Sign</CardTitle>
            <CardDescription>
              {documents.length} document{documents.length !== 1 ? "s" : ""} ready for signing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-blue-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(doc.status)}
                    {doc.collection && doc.status === "Signed" && (
                      <span className="ml-2 text-xs text-gray-500">Collection: {doc.collection}</span>
                    )}
                    {doc.status === "Ready" && !isProcessing && (
                      <Button variant="ghost" size="icon" onClick={() => removeDocument(doc.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    {doc.status === "Error" && <span className="text-xs text-rose-600">{doc.errorMessage}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            {isProcessing && (
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span>Signing documents...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {!isProcessing && successCount > 0 && (
              <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Successfully signed {successCount} document{successCount !== 1 ? "s" : ""}.
                </AlertDescription>
              </Alert>
            )}

            {!isProcessing && errorCount > 0 && (
              <Alert className="bg-rose-50 text-rose-800 border-rose-200">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to sign {errorCount} document{errorCount !== 1 ? "s" : ""}. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {documents.length > 0 && !isProcessing && (
              <div className="mb-4 w-full">
                <Label htmlFor="collection" className="mb-2 block text-sm font-medium">
                  Assign to Collection
                </Label>
                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                  <SelectTrigger id="collection">
                    <SelectValue placeholder="Select a collection (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCollections.map((collection) => (
                      <SelectItem key={collection.id} value={collection.name}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1 text-xs text-gray-500">
                  Documents will be organized in the selected collection after signing
                </p>
              </div>
            )}

            <Button
              onClick={handleBulkSign}
              disabled={isProcessing || documents.length === 0 || documents.every((doc) => doc.status === "Signed")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300"
            >
              <FileSignature className="mr-2 h-4 w-4" />
              {isProcessing ? "Signing..." : "Sign All Documents"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
