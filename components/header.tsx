"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"


const navigation = [
  { name: "Home", href: "/" },
  { name: "Institutions", href: "#institutions" },
  { name: "Documentation", href: "/documentation" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Gaba Seal</span>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy-blue-600 to-navy-blue-800 flex items-center justify-center shadow-lg shadow-navy-blue-600/20">
                <span className="text-white font-bold text-lg">GS</span>
              </div>
              <span className="text-navy-blue-900 font-bold text-xl">GabaSeal</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 text-gray-900 hover:text-navy-blue-600 transition-colors relative group",
                pathname === item.href && "text-navy-blue-600",
              )}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-navy-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="outline"
            className="border-navy-blue-200 hover:border-navy-blue-300 hover:bg-navy-blue-50 transition-all duration-300"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-navy-blue-600 to-navy-blue-700 hover:from-navy-blue-700 hover:to-navy-blue-800 border-0 shadow-lg shadow-navy-blue-600/20 hover:shadow-navy-blue-700/30 transition-all duration-300"
            asChild
          >
            <Link href="#contact">Contact</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <motion.div
            className="fixed top-0 right-0 h-[100dvh] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Gaba Seal</span>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy-blue-600 to-navy-blue-800 flex items-center justify-center shadow-lg shadow-navy-blue-600/20">
                      <span className="text-white font-bold text-lg">I</span>
                    </div>
                    <span className="text-navy-blue-900 font-bold text-xl">Gaba Seal</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flex-1">
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                        pathname === item.href && "text-navy-blue-600 bg-navy-blue-50",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full justify-center border-navy-blue-200 hover:border-navy-blue-300 hover:bg-navy-blue-50 transition-all duration-300"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  {/* <Button
                    className="w-full justify-center bg-gradient-to-r from-navy-blue-600 to-navy-blue-700 hover:from-navy-blue-700 hover:to-navy-blue-800 border-0 shadow-lg shadow-navy-blue-600/20 hover:shadow-navy-blue-700/30 transition-all duration-300"
                    asChild
                  >
                    <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </Button> */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}
