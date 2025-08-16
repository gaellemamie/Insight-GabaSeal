"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface GeneralSettings {
  platformName: string
  supportEmail: string
  contactPhone: string
  defaultLanguage: string
  timeZone: string
  maintenanceMode: boolean
  maintenanceMessage: string
}

interface SecuritySettings {
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
    expiryDays: number
  }
  twoFactorAuth: boolean
  sessionTimeout: number
  ipRestrictions: boolean
  allowedIPs: string
}

interface EmailSettings {
  smtpServer: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  senderName: string
  senderEmail: string
  enableSSL: boolean
}

interface ApiSettings {
  apiKey: string
  webhookUrl: string
  rateLimitPerMinute: number
  enableCors: boolean
  allowedOrigins: string
}


const mockGeneralSettings: GeneralSettings = {
  platformName: "GabaSeal Document Platform",
  supportEmail: "support@gabaseal.com",
  contactPhone: "+1 (555) 123-4567",
  defaultLanguage: "en",
  timeZone: "UTC",
  maintenanceMode: false,
  maintenanceMessage: "The system is currently undergoing scheduled maintenance. Please check back later.",
}

const mockSecuritySettings: SecuritySettings = {
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
  },
  twoFactorAuth: true,
  sessionTimeout: 30,
  ipRestrictions: false,
  allowedIPs: "192.168.1.1, 10.0.0.1",
}

const mockEmailSettings: EmailSettings = {
  smtpServer: "smtp.gabaseal.com",
  smtpPort: 587,
  smtpUsername: "notifications@gabaseal.com",
  smtpPassword: "••••••••••••",
  senderName: "GabaSeal Platform",
  senderEmail: "notifications@gabaseal.com",
  enableSSL: true,
}

const mockApiSettings: ApiSettings = {
  apiKey: "sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX",
  webhookUrl: "https://api.gabaseal.com/webhooks/incoming",
  rateLimitPerMinute: 100,
  enableCors: true,
  allowedOrigins: "gabaseal.com, admin.gabaseal.com",
}

export default function SettingsPage() {

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(mockGeneralSettings)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(mockEmailSettings)
  const [apiSettings, setApiSettings] = useState<ApiSettings>(mockApiSettings)

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)


  const handleSaveSettings = (settingType: string) => {
    setIsLoading(true)
    setSaveSuccess(false)
    setSaveError(false)


    setTimeout(() => {
      console.log(`Saving ${settingType} settings`)
      setIsLoading(false)


      if (Math.random() > 0.05) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        setSaveError(true)
        setTimeout(() => setSaveError(false), 5000)
      }
    }, 1000)
  }


  const handleGenerateApiKey = () => {
    setIsLoading(true)


    setTimeout(() => {
      console.log("Generating new API key")
      setIsLoading(false)


      setApiSettings({
        ...apiSettings,
        apiKey: "sk_live_" + Math.random().toString(36).substring(2, 15),
      })

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-blue-900">Platform Settings</h2>
        <p className="text-gray-600 mt-1">Configure and manage platform settings.</p>
      </div>

      {saveSuccess && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your settings have been saved successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {saveError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <Alert className="bg-rose-50 text-rose-800 border-rose-200">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was a problem saving your settings. Please try again.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings and appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultLanguage: value })}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select
                    value={generalSettings.timeZone}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeZone: value })}
                  >
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  When enabled, users will see a maintenance message instead of the platform.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Textarea
                  id="maintenanceMessage"
                  value={generalSettings.maintenanceMessage}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMessage: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSaveSettings("general")}
                disabled={isLoading}
                className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and authentication settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minLength">Minimum Password Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      min={8}
                      max={32}
                      value={securitySettings.passwordPolicy.minLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordPolicy: {
                            ...securitySettings.passwordPolicy,
                            minLength: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDays">Password Expiry (days)</Label>
                    <Input
                      id="expiryDays"
                      type="number"
                      min={0}
                      value={securitySettings.passwordPolicy.expiryDays}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordPolicy: {
                            ...securitySettings.passwordPolicy,
                            expiryDays: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                    <p className="text-xs text-gray-500">Set to 0 for no expiration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireUppercase"
                      checked={securitySettings.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordPolicy: {
                            ...securitySettings.passwordPolicy,
                            requireUppercase: checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="requireUppercase">Require uppercase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireNumbers"
                      checked={securitySettings.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordPolicy: {
                            ...securitySettings.passwordPolicy,
                            requireNumbers: checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="requireNumbers">Require numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireSpecialChars"
                      checked={securitySettings.passwordPolicy.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordPolicy: {
                            ...securitySettings.passwordPolicy,
                            requireSpecialChars: checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="requireSpecialChars">Require special characters</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth" className="block mb-1">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min={5}
                    max={240}
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ipRestrictions" className="block mb-1">
                      IP Restrictions
                    </Label>
                    <p className="text-sm text-gray-500">Limit admin access to specific IP addresses</p>
                  </div>
                  <Switch
                    id="ipRestrictions"
                    checked={securitySettings.ipRestrictions}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipRestrictions: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                  <Textarea
                    id="allowedIPs"
                    value={securitySettings.allowedIPs}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIPs: e.target.value })}
                    placeholder="Enter comma-separated IP addresses"
                    disabled={!securitySettings.ipRestrictions}
                  />
                  <p className="text-xs text-gray-500">Enter comma-separated IP addresses or CIDR ranges</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSaveSettings("security")}
                disabled={isLoading}
                className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications and communications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpServer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <div className="relative">
                    <Input
                      id="smtpPassword"
                      type={showPassword ? "text" : "password"}
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableSSL"
                  checked={emailSettings.enableSSL}
                  onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableSSL: checked })}
                />
                <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Test Email Configuration</h4>
                <div className="flex gap-2">
                  <Input placeholder="Enter test email address" />
                  <Button variant="outline">Send Test</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSaveSettings("email")}
                disabled={isLoading}
                className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Settings Tab */}
        <TabsContent value="api">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure API access and integration settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input id="apiKey" type={showApiKey ? "text" : "password"} value={apiSettings.apiKey} readOnly />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => copyToClipboard(apiSettings.apiKey)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                  <Button variant="outline" onClick={handleGenerateApiKey}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Generate New
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  This key provides full access to the API. Keep it secure and don't share it publicly.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={apiSettings.webhookUrl}
                  onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                />
                <p className="text-xs text-gray-500">URL where platform events will be sent.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rateLimitPerMinute">Rate Limit (requests per minute)</Label>
                <Input
                  id="rateLimitPerMinute"
                  type="number"
                  min={10}
                  max={1000}
                  value={apiSettings.rateLimitPerMinute}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, rateLimitPerMinute: Number.parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableCors" className="block mb-1">
                    Enable CORS
                  </Label>
                  <p className="text-sm text-gray-500">Allow cross-origin requests to the API</p>
                </div>
                <Switch
                  id="enableCors"
                  checked={apiSettings.enableCors}
                  onCheckedChange={(checked) => setApiSettings({ ...apiSettings, enableCors: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedOrigins">Allowed Origins</Label>
                <Textarea
                  id="allowedOrigins"
                  value={apiSettings.allowedOrigins}
                  onChange={(e) => setApiSettings({ ...apiSettings, allowedOrigins: e.target.value })}
                  placeholder="Enter comma-separated domains"
                  disabled={!apiSettings.enableCors}
                />
                <p className="text-xs text-gray-500">
                  Enter comma-separated domains that are allowed to access the API (e.g., example.com, api.example.com)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">API Documentation</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Access the API documentation to learn how to integrate with the GabaSeal platform.
                </p>
                <Button variant="outline">View API Documentation</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleSaveSettings("api")}
                disabled={isLoading}
                className="bg-gradient-to-r from-navy-blue-500 to-navy-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
