"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Upload, Download, FileText, Key, Palette } from "lucide-react"


interface Institution {
  id: string
  name: string
  logo: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  email: string
  website: string
  primaryColor: string
  secondaryColor: string
}

interface Certificate {
  id: string
  name: string
  issuer: string
  validFrom: string
  validTo: string
  status: "active" | "expired" | "revoked"
}

interface Template {
  id: string
  name: string
  description: string
  documentType: string
  lastUpdated: string
}


const mockInstitution: Institution = {
  id: "inst-001",
  name: "Global University",
  logo: "/placeholder.svg?height=100&width=100",
  address: "123 Academic Way",
  city: "University City",
  state: "CA",
  zip: "90210",
  country: "United States",
  phone: "+1 (555) 123-4567",
  email: "admin@globaluniversity.edu",
  website: "https://www.globaluniversity.edu",
  primaryColor: "#4f46e5",
  secondaryColor: "#10b981",
}

const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    name: "Global University Signing Certificate",
    issuer: "DigiCert Academic Authority",
    validFrom: "2023-01-01",
    validTo: "2025-12-31",
    status: "active",
  },
  {
    id: "cert-002",
    name: "Document Encryption Certificate",
    issuer: "Academic Trust Network",
    validFrom: "2023-01-01",
    validTo: "2024-06-30",
    status: "active",
  },
  {
    id: "cert-003",
    name: "Legacy Signing Certificate",
    issuer: "University Certification Authority",
    validFrom: "2020-01-01",
    validTo: "2023-01-01",
    status: "expired",
  },
]

const mockTemplates: Template[] = [
  {
    id: "templ-001",
    name: "Academic Transcript",
    description: "Official academic transcript template with university seal",
    documentType: "Transcript",
    lastUpdated: "2023-03-15",
  },
  {
    id: "templ-002",
    name: "Degree Certificate",
    description: "Official degree certificate with signatures",
    documentType: "Certificate",
    lastUpdated: "2023-02-20",
  },
  {
    id: "templ-003",
    name: "Recommendation Letter",
    description: "Faculty recommendation letter template",
    documentType: "Letter",
    lastUpdated: "2023-04-05",
  },
]

export default function SettingsPage() {
  const [institution, setInstitution] = useState<Institution>(mockInstitution)
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates)
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)


  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)


    setTimeout(() => {
      console.log("Saving institution profile:", institution)
      setIsSaving(false)
      setIsEditing(false)

    }, 1000)
  }


  const handleCertificateUpload = () => {

    console.log("Uploading certificate")
  }


  const handleCreateTemplate = () => {

    console.log("Creating template")
  }


  const getCertificateStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Active</span>
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Expired</span>
          </Badge>
        )
      case "revoked":
        return (
          <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Revoked</span>
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Institution Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Institution Profile</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="templates">Document Templates</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Institution Information</CardTitle>
                  <CardDescription>Manage your institution's profile information</CardDescription>
                </div>
                {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={institution.logo || "/placeholder.svg"} alt={institution.name} />
                      <AvatarFallback>{institution.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" type="button">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Institution Name</Label>
                      <Input
                        id="name"
                        value={institution.name}
                        onChange={(e) => setInstitution({ ...institution, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={institution.website}
                        onChange={(e) => setInstitution({ ...institution, website: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={institution.email}
                        onChange={(e) => setInstitution({ ...institution, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={institution.phone}
                        onChange={(e) => setInstitution({ ...institution, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={institution.address}
                      onChange={(e) => setInstitution({ ...institution, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={institution.city}
                        onChange={(e) => setInstitution({ ...institution, city: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={institution.state}
                        onChange={(e) => setInstitution({ ...institution, state: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input
                        id="zip"
                        value={institution.zip}
                        onChange={(e) => setInstitution({ ...institution, zip: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        disabled={!isEditing}
                        value={institution.country}
                        onValueChange={(value) => setInstitution({ ...institution, country: value })}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Digital Certificates</CardTitle>
                  <CardDescription>Manage your institution's signing and encryption certificates</CardDescription>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Certificate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-gray-500" />
                          <h3 className="font-medium">{certificate.name}</h3>
                          {getCertificateStatusBadge(certificate.status)}
                        </div>
                        <p className="text-sm text-gray-500">Issued by: {certificate.issuer}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Valid From:</span> {certificate.validFrom}
                      </div>
                      <div>
                        <span className="text-gray-500">Valid To:</span> {certificate.validTo}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Certificate Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-renew certificates</p>
                        <p className="text-sm text-gray-500">Automatically renew certificates before expiry</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Certificate expiry notifications</p>
                        <p className="text-sm text-gray-500">
                          Send notifications when certificates are about to expire
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require certificate for all signatures</p>
                        <p className="text-sm text-gray-500">All document signatures must use a valid certificate</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Document Templates</CardTitle>
                  <CardDescription>Manage your institution's document templates</CardDescription>
                </div>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Document Type:</span> {template.documentType}
                      </div>
                      <div>
                        <span className="text-gray-500">Last Updated:</span> {template.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the appearance of your institution's dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Brand Colors</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Primary Color</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: institution.primaryColor }}
                          ></div>
                          <Input
                            value={institution.primaryColor}
                            onChange={(e) => setInstitution({ ...institution, primaryColor: e.target.value })}
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Secondary Color</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: institution.secondaryColor }}
                          ></div>
                          <Input
                            value={institution.secondaryColor}
                            onChange={(e) => setInstitution({ ...institution, secondaryColor: e.target.value })}
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Theme Preferences</Label>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Enable dark mode for the dashboard</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-gray-500">Increase contrast for better accessibility</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reduced Motion</p>
                      <p className="text-sm text-gray-500">Minimize animations throughout the interface</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Email Branding</Label>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Custom Email Header</p>
                      <p className="text-sm text-gray-500">Use custom branding in email notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Include Institution Logo</p>
                      <p className="text-sm text-gray-500">Add your institution logo to emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Palette className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
