"use client"
import { motion } from "framer-motion"
import { ArrowRight, FileCheck, Send, Upload } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      id: 1,
      name: "Upload",
      description: "Upload documents individually or in bulk to the secure GabaSeal platform.",
      icon: Upload,
      delay: 0,
    },
    {
      id: 2,
      name: "Sign",
      description:
        "Digitally sign documents using PKI technology with automated workflow notifications between signers.",
      icon: FileCheck,
      delay: 0.2,
    },
    {
      id: 3,
      name: "Share",
      description:
        "Share documents with controlled access, expiration dates, and QR code verification for authenticity.",
      icon: Send,
      delay: 0.4,
    },
  ]

  return (
    <section id="how-it-works" className="relative bg-white py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-navy-blue-50 filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-emerald-50 filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-navy-blue-50 text-navy-blue-600 font-medium text-sm mb-4"
          >
            Simple Process
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-navy-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our streamlined process makes it easy for organizations to secure their important documents.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="group h-full">
                  <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-navy-blue-100/50 hover:-translate-y-1">
                    <div className="absolute -top-5 left-8 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy-blue-500 to-navy-blue-700 text-white shadow-lg shadow-navy-blue-500/30 transition-transform duration-300 group-hover:scale-110">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="pt-6">
                      <h3 className="mt-4 text-xl font-semibold text-navy-blue-900 group-hover:text-navy-blue-700 transition-colors duration-300">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
                {step.id !== steps.length && (
                  <div className="absolute top-1/2 left-full hidden -translate-y-1/2 transform md:block z-10">
                    <ArrowRight className="h-6 w-6 text-navy-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add a feature highlight section for verification */}
        <div className="mt-24">
          <motion.div
            className="bg-gradient-to-br from-navy-blue-50 to-emerald-50 rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-navy-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-navy-blue-900 mb-4">QR Code Verification</h3>
                <p className="text-gray-700 mb-6">
                  Every document includes a secure QR code that links to our verification portal. Recipients can scan
                  the code or upload the document to instantly verify its authenticity and check that it hasn't been
                  tampered with.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-emerald-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-navy-blue-900">Instant verification</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-emerald-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-navy-blue-900">Tamper-proof</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-emerald-600"
                      >
                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        <path
                          fillRule="evenodd"
                          d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-navy-blue-900">Access expiration</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-[280px] mx-auto bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center">
                  <div className="w-full aspect-square bg-gradient-to-br from-navy-blue-900 to-navy-blue-700 rounded-xl p-4 flex items-center justify-center">
                    <div className="w-full aspect-square bg-white rounded-lg grid grid-cols-4 grid-rows-4 gap-1 p-2">
                      {/* Simplified QR code representation */}
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-white col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-white col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                      <div className="bg-navy-blue-900 col-span-1 row-span-1 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
