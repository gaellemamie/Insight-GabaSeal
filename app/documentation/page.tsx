"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Building2,
  FileText,
  FileSignature,
  Users,
  Upload,
  Mail,
  Package,
  Globe,
  ChevronRight,
  Search,
  BookOpen,
  Code,
  Leaf,
  Shield,
  Clock,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import DigitalCertificateBanner from "@/components/govca"
import Header from "@/components/header"


const DOCUMENTATION_SECTIONS = {
  overview: {
    title: "Overview",
    description: "Learn about the Insight Platform and its capabilities",
    icon: BookOpen,
  },
  workflow: {
    title: "Workflow",
    description: "Understand the document lifecycle in Insight",
    icon: FileText,
  },
  features: {
    title: "Features",
    description: "Explore the key features of the platform",
    icon: Package,
  },
  impact: {
    title: "Impact",
    description: "See how Insight transforms document management",
    icon: Globe,
  },
  developers: {
    title: "Developers",
    description: "Technical documentation and API references",
    icon: Code,
  },
}


const WORKFLOW_STEPS = [
  {
    id: "institutions",
    title: "Adding Institutions",
    description:
      "Admin adds a new institution (e.g., school, hospital, company). Each institution must be verified by the admin.",
    icon: Building2,
    color: "bg-navy-blue-100 text-navy-blue-700",
  },
  {
    id: "login",
    title: "Institution Login",
    description: "Once verified, institutions can log into their dashboard to manage their own space.",
    icon: Users,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "teams",
    title: "Managing Teams",
    description: "Institutions can add Managers (e.g., admin or signatory roles) to help manage documents.",
    icon: Users,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "upload",
    title: "Uploading Documents",
    description:
      "Institutions can upload documents via a drag-and-drop interface. Each document includes metadata such as title, description, and associated collection.",
    icon: Upload,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "signing",
    title: "Signing Documents",
    description: "Designated managers or signatories can sign documents digitally within the dashboard.",
    icon: FileSignature,
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "sending",
    title: "Sending to Users",
    description:
      "Documents and metadata can be emailed directly to users. Option to automate email upon signing. Documents can include QR code for scanning, which direct to insight for information about document.",
    icon: Mail,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "bulk",
    title: "Bulk Signing",
    description:
      "Allows institutions to sign multiple documents in one go. Useful for mass communication, compliance docs, or student certificates.",
    icon: Package,
    color: "bg-emerald-100 text-emerald-700",
  },
]


const FEATURES = [
  {
    title: "Document Management",
    description: "Upload, organize, and manage all your documents in one secure location.",
    icon: FileText,
    color: "from-navy-blue-500 to-navy-blue-600",
  },
  {
    title: "Digital Signatures",
    description: "Securely sign documents with legally binding digital signatures.",
    icon: FileSignature,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Team Collaboration",
    description: "Add team members with different permission levels to streamline workflows.",
    icon: Users,
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "Bulk Operations",
    description: "Process multiple documents at once to save time and reduce errors.",
    icon: Package,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Secure Sharing",
    description: "Share documents securely with recipients inside or outside your organization.",
    icon: Mail,
    color: "from-rose-500 to-rose-600",
  },
  {
    title: "Verification System",
    description: "QR codes and verification links ensure document authenticity.",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
  },
]


const IMPACT_POINTS = [
  {
    title: "Paperless Operations",
    description: "Save paper, printing costs, and storage space.",
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Security & Compliance",
    description: "Ensure secure digital signatures and access controls.",
    icon: Shield,
    color: "bg-navy-blue-100 text-navy-blue-700",
  },
  {
    title: "Efficiency",
    description: "Minimize administrative burden and document turnaround time.",
    icon: Clock,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Transparency",
    description: "Clear audit trail for each document and action.",
    icon: Eye,
    color: "bg-indigo-100 text-indigo-700",
  },
]

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-12 md:py-16 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insight Platform Documentation
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome to the official documentation for the Insight Platform, a digital document management and signing
              system built for modern institutions.
            </motion.p>

            <motion.div
              className="mt-8 max-w-md mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation for desktop */}
          {!isMobile && (
            <div className="w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium text-navy-blue-900">Documentation</h3>
                </div>
                <nav className="p-2">
                  {Object.entries(DOCUMENTATION_SECTIONS).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                        activeSection === key
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-navy-blue-700",
                      )}
                    >
                      <section.icon className="h-4 w-4 shrink-0" />
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Mobile tabs navigation */}
          {isMobile && (
            <Tabs
              defaultValue="overview"
              value={activeSection}
              onValueChange={setActiveSection}
              className="w-full mb-6"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="developers">Developers</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {/* Main content area */}
          <div className="flex-1">
            {/* Overview section */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">What is Insight Platform?</h2>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Insight Platform is a web-based application that streamlines the document lifecycle — from upload,
                      organization, and digital signing to distribution and bulk notifications. It enables institutions
                      to manage their documents securely and efficiently.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button
                        onClick={() => setActiveSection("workflow")}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      >
                        Explore Workflow <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setActiveSection("features")}>
                        View Features
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">Key Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {IMPACT_POINTS.map((point, index) => (
                      <Card key={index} className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg ${point.color} flex items-center justify-center`}>
                              <point.icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{point.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{point.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">Getting Started</h2>
                  <Card className="border-none shadow-sm">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-700 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            1
                          </div>
                          <div>
                            <h3 className="font-medium text-navy-blue-900">Access Your Dashboard</h3>
                            <p className="text-gray-600 mt-1">
                              Log in to your institution dashboard at{" "}
                              <code className="bg-gray-100 px-1 py-0.5 rounded text-navy-blue-700">/dashboard</code>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-700 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            2
                          </div>
                          <div>
                            <h3 className="font-medium text-navy-blue-900">Set Up Your Team</h3>
                            <p className="text-gray-600 mt-1">
                              Add managers and team members with appropriate permissions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-700 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            3
                          </div>
                          <div>
                            <h3 className="font-medium text-navy-blue-900">Upload Your First Document</h3>
                            <p className="text-gray-600 mt-1">
                              Start by uploading a document and organizing it in a collection
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button asChild>
                          <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}

            {/* Workflow section */}
            {activeSection === "workflow" && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">How It Works — System Flow</h2>
                  <p className="text-gray-700 mb-6">
                    The Insight Platform follows a structured workflow to ensure secure and efficient document
                    management. Here's how the system works:
                  </p>

                  <DigitalCertificateBanner />

                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-navy-blue-500 md:left-1/2 md:-ml-0.5"></div>

                    <div className="space-y-8">
                      {WORKFLOW_STEPS.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""} md:flex md:items-center md:justify-center md:gap-8`}
                        >
                          {/* Circle marker */}
                          <div className="absolute left-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center md:relative md:left-auto md:translate-x-0">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white ${step.color} shadow-lg`}
                            >
                              <step.icon className="h-5 w-5" />
                            </div>
                          </div>

                          {/* Content */}
                          <div
                            className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                          >
                            <div className="group rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                              <h3 className="text-xl font-semibold text-navy-blue-900 group-hover:text-navy-blue-700 transition-colors duration-300">
                                {index + 1}. {step.title}
                              </h3>
                              <p className="mt-2 text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            <DigitalCertificateBanner />

            {/* Features section */}
            {activeSection === "features" && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">Platform Features</h2>
                  <p className="text-gray-700 mb-6">
                    Insight Platform offers a comprehensive set of features designed to streamline document management
                    for institutions of all types.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-sm`}
                              >
                                <feature.icon className="h-5 w-5" />
                              </div>
                              <CardTitle>{feature.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Impact section */}
            {activeSection === "impact" && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">Impact</h2>
                  <p className="text-gray-700 mb-6">
                    Insight Platform transforms document management for institutions, delivering significant benefits
                    across multiple dimensions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {IMPACT_POINTS.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-lg ${point.color} flex items-center justify-center`}>
                                <point.icon className="h-5 w-5" />
                              </div>
                              <CardTitle>{point.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600">{point.description}</p>
                            <div className="mt-4 space-y-2">
                              {point.title === "Paperless Operations" && (
                                <>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Reduce physical storage requirements by up to 90%
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Eliminate printing costs for routine documents
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Contribute to environmental sustainability goals
                                    </p>
                                  </div>
                                </>
                              )}

                              {point.title === "Security & Compliance" && (
                                <>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-navy-blue-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">Military-grade encryption for all documents</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-navy-blue-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Role-based access controls for sensitive information
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-navy-blue-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Compliance with industry regulations and standards
                                    </p>
                                  </div>
                                </>
                              )}

                              {point.title === "Efficiency" && (
                                <>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Reduce document processing time by up to 75%
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">Automate repetitive document tasks</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Streamline approval workflows across departments
                                    </p>
                                  </div>
                                </>
                              )}

                              {point.title === "Transparency" && (
                                <>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Complete audit trail for all document activities
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">Real-time visibility into document status</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-1" />
                                    <p className="text-sm text-gray-600">
                                      Verifiable chain of custody for sensitive documents
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle>Case Studies</CardTitle>
                      <CardDescription>Real-world examples of Insight Platform in action</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Global University</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Reduced document processing time by 80% and saved over $50,000 annually in printing and
                            storage costs.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">City Government</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Improved citizen service delivery by enabling remote document signing and verification.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Healthcare Network</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Streamlined patient documentation and consent forms, reducing administrative overhead by
                            65%.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}

            {/* Developers section */}
            {activeSection === "developers" && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy-blue-900 mb-4">Developer Documentation</h2>
                  <p className="text-gray-700 mb-6">
                    Technical resources for developers integrating with the Insight Platform.
                  </p>

                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle>API Reference</CardTitle>
                      <CardDescription>Comprehensive API documentation for developers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Authentication</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Secure your API requests using JWT authentication.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Documentation
                          </Button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Document Management</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            APIs for uploading, retrieving, and managing documents.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Documentation
                          </Button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Digital Signatures</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Implement secure digital signing in your applications.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Documentation
                          </Button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Webhooks</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Receive real-time notifications for document events.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Documentation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle>SDK & Libraries</CardTitle>
                      <CardDescription>Client libraries for popular programming languages</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">JavaScript SDK</h3>
                          <p className="text-sm text-gray-600 mt-1">For browser and Node.js applications</p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Documentation
                            </Button>
                            <Button variant="outline" size="sm">
                              npm
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Python SDK</h3>
                          <p className="text-sm text-gray-600 mt-1">For server-side applications</p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Documentation
                            </Button>
                            <Button variant="outline" size="sm">
                              PyPI
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">Java SDK</h3>
                          <p className="text-sm text-gray-600 mt-1">For enterprise applications</p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Documentation
                            </Button>
                            <Button variant="outline" size="sm">
                              Maven
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-navy-blue-900">.NET SDK</h3>
                          <p className="text-sm text-gray-600 mt-1">For Windows and .NET Core applications</p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Documentation
                            </Button>
                            <Button variant="outline" size="sm">
                              NuGet
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-navy-blue-50 rounded-lg p-6 border border-navy-blue-100">
                    <h3 className="font-medium text-navy-blue-900 mb-2">Coming Soon</h3>
                    <p className="text-navy-blue-700">
                      Our developer documentation is currently being expanded. Check back soon for more detailed API
                      references, code samples, and integration guides.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
