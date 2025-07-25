"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="relative bg-white py-24 overflow-hidden">
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
            Our Mission
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-navy-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Insight
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Building trust in digital documents through secure, verifiable signatures and authentication.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-navy-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

                <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 relative">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">I</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Insight Platform</h3>
                        <p className="text-gray-300">Securing the future of digital documents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-semibold text-navy-blue-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  Insight was founded with a clear vision: to transform how documents are issued, shared, and verified.
                  We believe in a world where organizations can issue secure documents, and recipients can verify them
                  instantly with complete confidence in their authenticity.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-navy-blue-900 mb-3">Advanced Security</h3>
                <p className="text-gray-600">
                  Using Public Key Infrastructure (PKI) technology, we provide military-grade security for all
                  documents. Our platform ensures that credentials cannot be tampered with and can be cryptographically
                  verified by anyone with proper authorization.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-navy-blue-900 mb-3">Global Trust Network</h3>
                <p className="text-gray-600">
                  We're building a global network of trusted organizations and recipients. Our platform bridges the gap
                  between document issuers and verifiers, creating a seamless ecosystem for secure document management
                  across industries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
