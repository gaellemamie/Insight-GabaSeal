"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  FileText,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/lib/contexts/AuthContext"
import { useSeekerContext } from "@/lib/contexts/SeekerContext"
import SeekerInstitutionsContainer from "@/components/sections/user/SeekerInstitutionsContainer"

export default function SeekerDashboard() {
  const router = useRouter()
  const {
    currentUser,
    getDocumentTypes,
    getSeekerRequests,
    getInstitutions,
    getVerificationRequests,
  } = useAppStore()

  const [documentTypes, setDocumentTypes] = useState<any[]>([])
  const [myRequests, setMyRequests] = useState<any[]>([])
  const [institutions, setInstitutions] = useState<any[]>([])
  const [verificationRequests, setVerificationRequests] = useState<any[]>([])
  const {seeker} = useSeekerContext();

  useEffect(() => {
    

    // Load data
    const allDocTypes = getDocumentTypes()
    const verifiedInstitutions = getInstitutions().filter((inst) => inst.status === "verified")
    const requests = getSeekerRequests(undefined, "")
    const verifications = getVerificationRequests("")

    setDocumentTypes(allDocTypes)
    setInstitutions(verifiedInstitutions)
    setMyRequests(requests)
    setVerificationRequests(verifications)
  }, [currentUser, getDocumentTypes, getSeekerRequests, getInstitutions, getVerificationRequests, router])

  const stats = [
    {
      title: "Available Documents",
      value: documentTypes.length.toString(),
      icon: FileText,
      change: "From verified institutions",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "My Requests",
      value: myRequests.length.toString(),
      icon: Clock,
      change: "Total submitted",
      color: "from-navy-blue-500 to-navy-blue-700",
    },
    {
      title: "Approved",
      value: myRequests.filter((r) => r.status === "approved").length.toString(),
      icon: CheckCircle,
      change: "Ready for download",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Verifications",
      value: verificationRequests.length.toString(),
      icon: Shield,
      change: "Documents verified",
      color: "from-purple-500 to-purple-700",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-0 py-4 flex flex-col items-center gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Welcome back {seeker.name}!!</h2>
          <p className="text-gray-600 mt-1">
            Request and verify documents from verified
            institutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <div
                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}
                  >
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-blue-900">{stat.value}</div>
                <CardDescription className="text-xs mt-1">{stat.change}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <SeekerInstitutionsContainer />
    </div>
  )
}
