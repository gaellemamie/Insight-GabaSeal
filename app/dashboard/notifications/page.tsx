"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, Clock, Search, RefreshCw, Bell, Settings, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"


interface Notification {
  id: string
  type: "Document" | "Signature" | "Verification" | "System"
  subject: string
  recipient: string
  status: "Delivered" | "Failed" | "Pending"
  sentAt: string
}

interface NotificationSetting {
  id: string
  event: string
  description: string
  email: boolean
  inApp: boolean
}


const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "Document",
    subject: "New document uploaded: Academic Transcript - John Smith",
    recipient: "john.smith@example.com",
    status: "Delivered",
    sentAt: "2025-04-15T10:30:00Z",
  },
  {
    id: "notif-002",
    type: "Signature",
    subject: "Document requires your signature: Certificate of Completion - CS50",
    recipient: "michael.chen@university.edu",
    status: "Delivered",
    sentAt: "2025-04-14T15:45:00Z",
  },
  {
    id: "notif-003",
    type: "Verification",
    subject: "Document verified: Research Publication Approval",
    recipient: "emily.parker@university.edu",
    status: "Delivered",
    sentAt: "2025-04-12T11:20:00Z",
  },
  {
    id: "notif-004",
    type: "Document",
    subject: "Document shared with you: Faculty Recommendation Letter",
    recipient: "robert.wilson@university.edu",
    status: "Pending",
    sentAt: "2025-04-10T14:05:00Z",
  },
  {
    id: "notif-005",
    type: "System",
    subject: "Certificate expiring soon: Global University Signing Certificate",
    recipient: "admin@university.edu",
    status: "Delivered",
    sentAt: "2025-04-08T08:45:00Z",
  },
  {
    id: "notif-006",
    type: "Signature",
    subject: "Signature request expired: Department Budget Approval",
    recipient: "finance@university.edu",
    status: "Failed",
    sentAt: "2025-04-03T09:10:00Z",
  },
]

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: "setting-001",
    event: "Document Upload",
    description: "When a new document is uploaded to the system",
    email: true,
    inApp: true,
  },
  {
    id: "setting-002",
    event: "Signature Request",
    description: "When a document requires your signature",
    email: true,
    inApp: true,
  },
  {
    id: "setting-003",
    event: "Document Verification",
    description: "When a document is verified",
    email: false,
    inApp: true,
  },
  {
    id: "setting-004",
    event: "Document Shared",
    description: "When a document is shared with you",
    email: true,
    inApp: true,
  },
  {
    id: "setting-005",
    event: "Certificate Expiry",
    description: "When a signing certificate is about to expire",
    email: true,
    inApp: true,
  },
  {
    id: "setting-006",
    event: "Signature Request Expiry",
    description: "When a signature request is about to expire",
    email: true,
    inApp: false,
  },
]

export default function NotificationsPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings)
  const [activeTab, setActiveTab] = useState("history")


  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch =
      notification.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || notification.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })


  const handleResendNotification = (id: string) => {
    setIsLoading(true)


    setTimeout(() => {
      console.log(`Resending notification with ID: ${id}`)
      setIsLoading(false)

    }, 1000)
  }


  const handleUpdateNotificationSetting = (id: string, field: "email" | "inApp", value: boolean) => {
    setNotificationSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting)),
    )


    console.log(`Updating notification setting ${id}, ${field}: ${value}`)
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{status}</span>
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{status}</span>
          </Badge>
        )
      case "Failed":
        return (
          <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>{status}</span>
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <Tabs defaultValue="history" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">
            <Bell className="h-4 w-4 mr-2" />
            Notification History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search notifications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Type</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="signature">Signature</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[40%]">Subject</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No notifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{notification.subject}</TableCell>
                      <TableCell>{notification.recipient}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>{formatDate(notification.sentAt)}</TableCell>
                      <TableCell className="text-right">
                        {notification.status === "Failed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResendNotification(notification.id)}
                            disabled={isLoading}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Resend
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Notification Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Sent</span>
                    <span className="font-medium">{mockNotifications.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivered</span>
                    <span className="font-medium">
                      {mockNotifications.filter((n) => n.status === "Delivered").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="font-medium">
                      {mockNotifications.filter((n) => n.status === "Pending").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Failed</span>
                    <span className="font-medium">{mockNotifications.filter((n) => n.status === "Failed").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Notification Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Document</span>
                    <span className="font-medium">{mockNotifications.filter((n) => n.type === "Document").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Signature</span>
                    <span className="font-medium">
                      {mockNotifications.filter((n) => n.type === "Signature").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Verification</span>
                    <span className="font-medium">
                      {mockNotifications.filter((n) => n.type === "Verification").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">System</span>
                    <span className="font-medium">{mockNotifications.filter((n) => n.type === "System").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Failed Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Test Notification
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Email Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-send Notifications</h3>
                    <p className="text-sm text-gray-500">Automatically send notifications when events occur</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Daily Digest</h3>
                    <p className="text-sm text-gray-500">Receive a daily summary of all notifications</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Critical Alerts</h3>
                    <p className="text-sm text-gray-500">Always send notifications for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Event</TableHead>
                  <TableHead className="w-[40%]">Description</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">In-App</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationSettings.map((setting) => (
                  <TableRow key={setting.id}>
                    <TableCell className="font-medium">{setting.event}</TableCell>
                    <TableCell>{setting.description}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={setting.email}
                        onCheckedChange={(checked) => handleUpdateNotificationSetting(setting.id, "email", checked)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={setting.inApp}
                        onCheckedChange={(checked) => handleUpdateNotificationSetting(setting.id, "inApp", checked)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
