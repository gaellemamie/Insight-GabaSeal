"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      name: "Enhanced Security",
      description: "Military-grade encryption and PKI technology ensure your documents are tamper-proof.",
      icon: "shield-check",
      delay: 0,
    },
    {
      name: "Trusted Verification",
      description: "Recipients can instantly verify the authenticity of documents via QR codes or document upload.",
      icon: "check-circle",
      delay: 0.1,
    },
    {
      name: "Legal Compliance",
      description: "Meet regulatory requirements for document security and digital signatures.",
      icon: "scale",
      delay: 0.2,
    },
    {
      name: "Streamlined Workflow",
      description: "Automated signing workflows with notifications and bulk processing capabilities.",
      icon: "workflow",
      delay: 0.3,
    },
  ]

  const icons = {
    "shield-check": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.674 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "check-circle": (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ),
    scale: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75zm4.878 13.543l1.872-7.662 1.872 7.662h-3.744zm-9.756 0L5.25 8.131l-1.872 7.662h3.744z"
          clipRule="evenodd"
        />
      </svg>
    ),
    workflow: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path
          fillRule="evenodd"
          d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <section className="relative bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-24 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 font-medium text-sm mb-4"
          >
            Why Choose Insight
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Organizational Benefits
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how Insight transforms document security for organizations of all types.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: benefit.delay }}
              >
                <div className="group h-full">
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                      {icons[benefit.icon]}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {benefit.name}
                    </h3>
                    <p className="mt-2 text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add a feature highlight for certificate repository */}
        <motion.div
          className="mt-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.54 15h6.42l.5 1.5H8.29l.5-1.5zm8.085-8.995a.75.75 0 10-.75-1.299 12.81 12.81 0 00-3.558 3.05L11.03 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 001.146-.102 11.312 11.312 0 013.612-3.321z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure Certificate Repository</h3>
              <p className="text-gray-300 mb-6">
                Store your organization's PFX certificates securely in our encrypted repository. Our platform ensures
                that your signing certificates are protected with the highest level of security while remaining easily
                accessible for authorized signers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Encrypted storage for all certificates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Role-based access control</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Certificate expiration management</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-navy-blue-700 to-navy-blue-900 relative">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

              <div className="relative h-full flex items-center justify-center p-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-xs w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Certificate Vault</span>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Corporate_Cert.pfx</span>
                        <span className="text-xs text-emerald-400">Active</span>
                      </div>
                      <div className="mt-1 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span className="text-gray-400">Expires in:</span>
                        <span className="text-white">245 days</span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Legal_Dept_Cert.pfx</span>
                        <span className="text-xs text-emerald-400">Active</span>
                      </div>
                      <div className="mt-1 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span className="text-gray-400">Expires in:</span>
                        <span className="text-white">312 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
