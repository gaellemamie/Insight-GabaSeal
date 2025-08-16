"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Building, Briefcase, GraduationCap, Landmark } from "lucide-react"
import Link from "next/link"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export default function InstitutionsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const router = useRouter()

  const institutions = [
    {
      name: "Academic",
      icon: GraduationCap,
      description:
        "Universities, colleges, and schools can securely issue and verify academic transcripts, degrees, and certificates.",
      features: ["Transcript verification", "Degree authentication", "Student records management"],
      color: "from-blue-500 to-indigo-600",
      delay: 0,
      slug: "academic",
    },
    {
      name: "Government",
      icon: Landmark,
      description:
        "Government agencies can secure official documents, licenses, permits, and public records with tamper-proof verification.",
      features: ["Official document issuance", "Public record verification", "Regulatory compliance"],
      color: "from-emerald-500 to-emerald-600",
      delay: 0.1,
      slug: "government",
    },
    {
      name: "Corporate",
      icon: Briefcase,
      description:
        "Businesses can protect contracts, agreements, and internal documents with secure digital signatures and verification.",
      features: ["Contract management", "Legal document signing", "Intellectual property protection"],
      color: "from-navy-blue-500 to-navy-blue-600",
      delay: 0.2,
      slug: "corporate",
    },
    {
      name: "Healthcare",
      icon: Building,
      description:
        "Healthcare providers can secure patient records, medical certificates, and compliance documentation.",
      features: ["Medical record security", "Compliance documentation", "Patient data protection"],
      color: "from-red-500 to-rose-600",
      delay: 0.3,
      slug: "healthcare",
    },
  ]

  const handleInstitutionClick = (slug: string) => {
    router.push(`/guidelines/${slug}`)
  }

  return (
    <section
      id="institutions"
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
            Tailored Solutions
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Institutions We Serve
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            GabaSeal provides specialized document security solutions for various types of institutions and
            organizations.
          </motion.p>
        </div>

        <div ref={ref} className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {institutions.map((institution, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: institution.delay }}
                onClick={() => handleInstitutionClick(institution.slug)}
              >
                <div className="group h-full cursor-pointer">
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/10">
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                        "--tw-gradient-from": institution.color.split(" ")[0].replace("from-", ""),
                        "--tw-gradient-to": institution.color.split(" ")[1].replace("to-", ""),
                      }}
                    >
                      <institution.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {institution.name}
                    </h3>
                    <p className="mt-2 text-gray-300">{institution.description}</p>

                    <ul className="mt-4 space-y-2">
                      {institution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <svg
                            className="h-4 w-4 mr-2 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 text-right">
                      <span className="text-emerald-400 text-sm font-medium group-hover:underline flex items-center justify-end">
                        View Guidelines
                        <svg
                          className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
              asChild
            >
              <Link href="/signup">Find Your Solution</Link>
            </Button>
            <Button size="lg" variant="link" className="text-emerald-400 hover:text-emerald-300 ml-4" asChild>
              <Link href="#contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
