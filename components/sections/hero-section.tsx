"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, FileCheck } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-navy-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-32 right-40 w-96 h-96 bg-navy-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2 mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 font-medium text-sm mb-6"
            >
              Trusted by leading organizations worldwide
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Secure{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Document
              </span>{" "}
              Management with GabaSeal
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              GabaSeal provides organizations with a powerful platform to digitally sign, verify, and manage important
              documents using PKI technology.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="lg" variant="link" className="text-emerald-400 hover:text-emerald-300" asChild>
                <Link href="#how-it-works">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center md:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-navy-blue-800 bg-gradient-to-br ${
                      i === 0
                        ? "from-orange-400 to-red-500"
                        : i === 1
                          ? "from-blue-400 to-indigo-500"
                          : i === 2
                            ? "from-green-400 to-emerald-500"
                            : "from-purple-400 to-pink-500"
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-300">
                Trusted by <span className="font-medium text-white">1000+</span> organizations
              </span>
            </motion.div>
          </div>

          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-navy-blue-900/50 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">GS</span>
                      </div>
                      <span className="text-white font-bold text-xl">GabaSeal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                      <FileCheck className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-medium mb-2">Document Verified</h3>
                    <p className="text-gray-300 text-center">This document has been securely signed and verified.</p>

                    <div className="mt-8 w-full max-w-xs p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Issuer</span>
                        <span className="text-xs text-emerald-400">Verified</span>
                      </div>
                      <div className="text-sm text-white">Global Trust Corporation</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-navy-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
