"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 text-white relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-white font-bold text-xl">GabaSeal</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Secure academic document management platform using PKI technology for digital signing and verification.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Solutions</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                    For Institutions
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                    Residents & Students
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/guidelines"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-300">
              Get the latest updates and news about academic document security.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-base text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-navy-blue-800"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-4 py-2 text-base font-medium text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200/10 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} GabaSeal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
