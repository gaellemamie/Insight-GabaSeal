"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ForgotPasswordPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-24 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 font-medium text-sm mb-4"
          >
            Reset Password
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Reset your password
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16">
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 sm:p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200 p-2"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
                  >
                    Send reset link
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link href="/login" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
              ← Back to login
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
