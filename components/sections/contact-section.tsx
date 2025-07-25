"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-24 overflow-hidden"
    >
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
            Get in Touch
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact Support
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions about implementing Insight at your organization? Our team is here to help.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16 max-w-3xl mx-auto">
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 sm:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-300">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    autoComplete="organization"
                    className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-gray-300">
              Prefer to email us directly? Reach out at{" "}
              <a
                href="mailto:support@insight.com"
                className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors duration-300"
              >
                support@insight.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
