"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Building, Briefcase, GraduationCap, Landmark, FileCheck, Upload, Send } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


const institutionData = {
  academic: {
    name: "Academic Institutions",
    icon: GraduationCap,
    description: "Guidelines for universities, colleges, and schools to securely issue and verify academic documents.",
    color: "from-blue-500 to-indigo-600",
    steps: [
      {
        title: "Register Your Institution",
        description: "Create an account with your official academic email and complete the verification process.",
      },
      {
        title: "Set Up Signing Authority",
        description: "Designate which staff members can sign different types of academic documents.",
      },
      {
        title: "Upload Academic Templates",
        description: "Add your institution's transcript, degree, and certificate templates to the platform.",
      },
      {
        title: "Configure Student Access",
        description: "Set up how students can request and access their verified documents.",
      },
      {
        title: "Begin Document Issuance",
        description: "Start issuing secure, verifiable academic documents to your students.",
      },
    ],
    features: [
      "Batch processing for graduation seasons",
      "Integration with student information systems",
      "Customizable academic document templates",
      "Student portal for document requests",
      "Verification API for employers and other institutions",
    ],
  },
  government: {
    name: "Government Agencies",
    icon: Landmark,
    description:
      "Guidelines for government entities to secure official documents, licenses, permits, and public records.",
    color: "from-emerald-500 to-emerald-600",
    steps: [
      {
        title: "Agency Registration",
        description: "Register your government agency with proper authorization credentials.",
      },
      {
        title: "Department Setup",
        description: "Configure different departments and their document signing authorities.",
      },
      {
        title: "Document Classification",
        description: "Set up document types and their respective security levels.",
      },
      {
        title: "Workflow Configuration",
        description: "Establish approval workflows for different document types.",
      },
      {
        title: "Public Verification Portal",
        description: "Configure how citizens can verify the authenticity of your documents.",
      },
    ],
    features: [
      "Multi-level approval workflows",
      "Secure document archiving",
      "Audit trails for regulatory compliance",
      "Public verification portal",
      "Integration with existing government systems",
    ],
  },
  corporate: {
    name: "Corporate Organizations",
    icon: Briefcase,
    description:
      "Guidelines for businesses to protect contracts, agreements, and internal documents with secure digital signatures.",
    color: "from-navy-blue-500 to-navy-blue-600",
    steps: [
      {
        title: "Business Registration",
        description: "Register your company and verify your business credentials.",
      },
      {
        title: "Department Configuration",
        description: "Set up departments like Legal, HR, and Finance with appropriate permissions.",
      },
      {
        title: "Contract Templates",
        description: "Upload your standard contract templates and configure signing fields.",
      },
      {
        title: "External Partner Setup",
        description: "Configure how external partners can receive and sign documents.",
      },
      {
        title: "Workflow Automation",
        description: "Set up automated workflows for common business processes.",
      },
    ],
    features: [
      "Contract lifecycle management",
      "Integration with CRM and ERP systems",
      "Secure document sharing with external parties",
      "Automated reminders for contract renewals",
      "Bulk processing for employee documents",
    ],
  },
  healthcare: {
    name: "Healthcare Providers",
    icon: Building,
    description:
      "Guidelines for healthcare organizations to secure patient records, medical certificates, and compliance documentation.",
    color: "from-red-500 to-rose-600",
    steps: [
      {
        title: "Healthcare Provider Registration",
        description: "Register your healthcare organization with proper medical credentials.",
      },
      {
        title: "HIPAA Compliance Setup",
        description: "Configure security settings to ensure HIPAA compliance.",
      },
      {
        title: "Medical Document Templates",
        description: "Upload templates for medical records, prescriptions, and certificates.",
      },
      {
        title: "Patient Portal Configuration",
        description: "Set up secure access for patients to their medical documents.",
      },
      {
        title: "Integration with EHR Systems",
        description: "Connect GabaSeal with your existing Electronic Health Record systems.",
      },
    ],
    features: [
      "HIPAA-compliant document security",
      "Patient record access controls",
      "Medical certificate verification",
      "Integration with healthcare systems",
      "Audit trails for compliance reporting",
    ],
  },
}

export default function InstitutionGuidelines() {
  const params = useParams()
  const [institution, setInstitution] = useState<any>(null)
  const type = params.type as string

  useEffect(() => {
    if (type && institutionData[type as keyof typeof institutionData]) {
      setInstitution(institutionData[type as keyof typeof institutionData])
    }
  }, [type])

  if (!institution) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-blue-900">Loading guidelines...</h2>
        </div>
      </div>
    )
  }

  const IconComponent = institution.icon

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-20 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left md:w-2/3">
              <Link
                href="/#institutions"
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all institutions
              </Link>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div
                  className={`h-14 w-14 rounded-xl bg-gradient-to-br ${institution.color} flex items-center justify-center shadow-lg mr-4`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">{institution.name}</h1>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl">{institution.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-blue-900">Implementation Steps</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these steps to get your {institution.name.toLowerCase()} set up on the GabaSeal platform.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-navy-blue-500 md:left-1/2 md:-ml-0.5"></div>

            <div className="space-y-12">
              {institution.steps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""} md:flex md:items-center md:justify-center md:gap-8`}
                >
                  {/* Circle marker */}
                  <div className="absolute left-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center md:relative md:left-auto md:translate-x-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${institution.color} text-white shadow-lg`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="group rounded-xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      {/* Gradient background that appears on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${institution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      ></div>

                      <div
                        className={`absolute top-0 right-0 h-20 w-20 bg-gradient-to-br ${institution.color} opacity-10 rounded-full -mr-10 -mt-10`}
                      ></div>

                      <h3 className="text-xl font-semibold text-navy-blue-900 group-hover:text-navy-blue-700 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-blue-900">Key Features for {institution.name}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              GabaSeal provides specialized features designed specifically for {institution.name.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institution.features.map((feature: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${institution.color} flex items-center justify-center mr-4 shrink-0`}
                  >
                    {index % 3 === 0 ? (
                      <FileCheck className="h-5 w-5 text-white" />
                    ) : index % 3 === 1 ? (
                      <Upload className="h-5 w-5 text-white" />
                    ) : (
                      <Send className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="link" className="text-navy-blue-600 hover:text-navy-blue-800 ml-4" asChild>
              <Link href="#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
