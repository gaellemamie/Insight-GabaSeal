"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, FileCheck, Shield, Clock, Building2, CalendarDays, FileText } from "lucide-react"
import { useEffect, useState } from "react"


const mockDocument = {
  id: "2023diplom-cert143",
  title: "Bachelor of Computer Science - Distinction",
  recipient: "Irankunda Ezechiel",
  issuedBy: "Global University",
  issuedDate: "2023-05-15",
  expiryDate: "No Expiry",
  collection: "2023diplom",
  status: "Verified",
  type: "Academic Certificate",
  verificationDate: new Date().toISOString(),
  issuerInfo: {
    name: "Global University",
    type: "Academic Institution",
    verifiedSince: "2022-01-01",
    documentsIssued: 1284,
  },
}

export default function VerifyPage() {
  const params = useParams()
  const { collection, id } = params
  const [formattedDate, setFormattedDate] = useState<string>("")

  useEffect(() => {

    setFormattedDate(new Date(mockDocument.verificationDate).toLocaleString())
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-24 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-navy-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-32 right-40 w-96 h-96 bg-navy-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <motion.div 
            className="w-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 font-medium text-sm mb-6"
          >
            Document Verification Portal
          </motion.div>

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-2xl overflow-hidden backdrop-blur-sm bg-white/5">
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6">
                    <FileCheck className="h-10 w-10 text-white" />
                  </div>

                  <Badge 
                    className="mb-4 px-4 py-1 text-base bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm"
                  >
                    Verified
                  </Badge>

                  <h1 className="text-3xl font-bold text-white text-center mb-2">
                    {mockDocument.title}
                  </h1>
                  <p className="text-gray-400 text-center mb-8">
                    Issued to {mockDocument.recipient}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy-blue-400/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-navy-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Issued By</p>
                          <p className="text-white font-medium">{mockDocument.issuerInfo.name}</p>
                          <p className="text-sm text-gray-400">{mockDocument.issuerInfo.type}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Verification Status</p>
                          <p className="text-white font-medium">Cryptographically Verified</p>
                          <p className="text-sm text-emerald-400">No tampering detected</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                          <CalendarDays className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Issue Date</p>
                          <p className="text-white font-medium">{mockDocument.issuedDate}</p>
                          <p className="text-sm text-gray-400">Expiry: {mockDocument.expiryDate}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-400/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Document Type</p>
                          <p className="text-white font-medium">{mockDocument.type}</p>
                          <p className="text-sm text-gray-400">Collection: {mockDocument.collection}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-white/10 mt-8 pt-8">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formattedDate ? `Verified on ${formattedDate}` : "Verifying..."}
                        </span>
                      </div>
                      <div>
                        Document ID: {mockDocument.id}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm">
              Powered by Insight Platform • Secure Document Verification
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}