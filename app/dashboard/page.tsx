"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, FileCheck, Clock, AlertCircle, Plus, ArrowUpRight, FileSignature, Download } from "lucide-react"

export default function InstitutionDashboard() {
  const stats = [
    {
      title: "Total Documents",
      value: "1,284",
      icon: FileText,
      change: "+12% from last month",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Verified Documents",
      value: "964",
      icon: FileCheck,
      change: "+8% from last month",
      color: "from-navy-blue-500 to-navy-blue-700",
    },
    {
      title: "Pending Signatures",
      value: "28",
      icon: Clock,
      change: "-5% from last month",
      color: "from-amber-500 to-amber-700",
    },
    {
      title: "Issues Reported",
      value: "3",
      icon: AlertCircle,
      change: "+1 from last month",
      color: "from-rose-500 to-rose-700",
    },
  ]

  const recentDocuments = [
    {
      name: "Academic Transcript - John Smith",
      type: "PDF",
      status: "Verified",
      date: "Apr 15, 2025",
      statusColor: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Certificate of Completion - CS50",
      type: "PDF",
      status: "Pending",
      date: "Apr 14, 2025",
      statusColor: "bg-amber-100 text-amber-700",
    },
    {
      name: "Research Publication Approval",
      type: "PDF",
      status: "Verified",
      date: "Apr 12, 2025",
      statusColor: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Faculty Recommendation Letter",
      type: "PDF",
      status: "Needs Review",
      date: "Apr 10, 2025",
      statusColor: "bg-rose-100 text-rose-700",
    },
    {
      name: "Student Exchange Program Agreement",
      type: "PDF",
      status: "Verified",
      date: "Apr 8, 2025",
      statusColor: "bg-emerald-100 text-emerald-700",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue-900">Institution Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back to your document management portal.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-none shadow-md lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Your recently processed documents</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-emerald-600 hover:text-emerald-700">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-blue-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.type} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.statusColor}`}>
                      {doc.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Signing Activity</CardTitle>
            <CardDescription>Recent document signing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dr. Sarah Johnson", role: "Department Head", time: "2 hours ago", docs: 5 },
                { name: "Prof. Michael Chen", role: "Faculty Member", time: "5 hours ago", docs: 2 },
                { name: "Dean Robert Wilson", role: "Dean of Students", time: "Yesterday", docs: 8 },
                { name: "Dr. Emily Parker", role: "Research Director", time: "2 days ago", docs: 3 },
              ].map((person, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-navy-blue-100 flex items-center justify-center mr-3">
                      <FileSignature className="h-4 w-4 text-navy-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-blue-900">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-navy-blue-900">{person.docs} docs</p>
                    <p className="text-xs text-gray-500">{person.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
