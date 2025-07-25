"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, Building2, Users } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Institutions",
      value: "124",
      icon: Building2,
      change: "+12% from last month",
      color: "from-navy-blue-500 to-navy-blue-700",
    },
    {
      title: "Active Users",
      value: "3,842",
      icon: Users,
      change: "+8% from last month",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Document Verifications",
      value: "28.6k",
      icon: Activity,
      change: "+24% from last month",
      color: "from-emerald-400 to-navy-blue-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-blue-900">Welcome to Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">Monitor and manage all institutions and platform activities.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Institutions</CardTitle>
            <CardDescription>Newly registered institutions in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Global University", type: "Academic", date: "Apr 12, 2025" },
                { name: "Ministry of Education", type: "Government", date: "Apr 10, 2025" },
                { name: "TechCorp Inc.", type: "Corporate", date: "Apr 8, 2025" },
                { name: "Central Hospital", type: "Healthcare", date: "Apr 5, 2025" },
              ].map((institution, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-navy-blue-900">{institution.name}</p>
                    <p className="text-sm text-gray-500">{institution.type}</p>
                  </div>
                  <div className="text-sm text-gray-500">{institution.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Response Time", value: "124ms", status: "Excellent" },
                { name: "Document Processing", value: "98.7%", status: "Healthy" },
                { name: "Verification Service", value: "99.9%", status: "Optimal" },
                { name: "Storage Utilization", value: "68%", status: "Good" },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-navy-blue-900">{metric.name}</p>
                    <p className="text-sm text-gray-500">{metric.value}</p>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {metric.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
