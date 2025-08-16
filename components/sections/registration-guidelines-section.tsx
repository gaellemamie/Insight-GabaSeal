"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useInView } from "framer-motion"
import { useRef } from "react"
import DigitalCertificateBanner from "../govca"

export default function RegistrationGuidelinesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Register your organization with basic information and verify your email address.",
      delay: 0,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      id: 2,
      title: "Verify Organization",
      description: "Complete the verification process to confirm your organization's identity.",
      delay: 0.1,
      gradient: "from-navy-blue-400 to-navy-blue-600",
    },
    {
      id: 3,
      title: "Set Up Signing Authority",
      description:
        "Establish who in your organization has the authority to sign documents and configure approval workflows.",
      delay: 0.2,
      gradient: "from-emerald-500 to-navy-blue-500",
    },
    {
      id: 4,
      title: "Upload PFX Certificates",
      description: "Securely store your organization's cryptographic certificates in our protected repository.",
      delay: 0.3,
      gradient: "from-navy-blue-500 to-emerald-500",
    },
    {
      id: 5,
      title: "Start Signing",
      description: "Begin uploading, bulk signing, and managing documents for your organization.",
      delay: 0.4,
      gradient: "from-emerald-600 to-emerald-400",
    },
  ]

  return (
    <section id="guidelines" className="relative bg-white py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 -ml-40 -mt-40 w-96 h-96 rounded-full bg-navy-blue-50 filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 -mr-40 -mb-40 w-96 h-96 rounded-full bg-emerald-50 filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-navy-blue-50 text-navy-blue-600 font-medium text-sm mb-4"
          >
            Get Started
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-navy-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Registration Guidelines
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Follow these steps to get your organization set up on the GabaSeal platform.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-navy-blue-500 md:left-1/2 md:-ml-0.5"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  className={`relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""} md:flex md:items-center md:justify-center md:gap-8`}
                >
                  {/* Circle marker */}
                  <div className="absolute left-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center md:relative md:left-auto md:translate-x-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${step.gradient} text-white shadow-lg`}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="group rounded-xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      {/* Gradient background that appears on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      ></div>

                      <div
                        className={`absolute top-0 right-0 h-20 w-20 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full -mr-10 -mt-10`}
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

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {/* <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
              asChild
            >
              <Link href="/signup">Register Your Organization</Link>
            </Button>
            <Button size="lg" variant="link" className="text-navy-blue-600 hover:text-navy-blue-800 ml-4" asChild>
              <Link href="/guidelines">View Detailed Guidelines</Link>
            </Button> */}
            <DigitalCertificateBanner />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
