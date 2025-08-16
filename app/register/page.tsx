"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, FormEvent, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { getRedirectPath } from "@/utils/auth"
import { createUser, getSessionUser } from "@/lib/actions/auth/user"
import { CredentialsSignin } from "@/lib/actions/auth/auth"
import { PasswordInputGroup, SelectInputGroup, TextInputGroup } from "@/components/forms/InputGroups"
import { ESeekerType, EUserType } from "@/prisma/lib/generated/prisma"
import { differenceInYears } from "date-fns"
import { createSeeker } from "@/lib/actions/seeker/Seeker"
import { useQueryClient } from "@tanstack/react-query"

export default function RegisterPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient();

     const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
     e.preventDefault()
     setIsSubmitting(true);

     try {
          toast.warning("Registering...")
          const data = new FormData(e.currentTarget);
          const name = String(data.get("name"));
          const email = String(data.get("email"));
          const phone = String(data.get("phone"));
          const nationalId = String(data.get("nationalId"));
          const dob = new Date(String(data.get("dob")));
          const location = String(data.get("location"));
          const type = String(data.get("type"));
          const password = String(data.get("password"));
          const confirmPassword = String(data.get("confirm-password"));

          if(!name || !email || !location || !type) return toast.warning("Please name, email,location or type is missing!");
          if(phone.length !== 10 || !phone.startsWith("07")) return toast.warning("Please enter a valid phone number");
          if(nationalId.length !== 16 ) return toast.warning("Please enter a valid national Id");
          const age = differenceInYears(new Date(), dob);
          if(age <= 18) return toast.warning("You are too young to use this platform!");
          if( password !== confirmPassword) return toast.warning("Passwords do not match");

          const newUser = await createUser({
               email, password, type: EUserType.SEEKER,
          });
          if(!newUser) return toast.error("Auth Service down. Try again later");
          const newSeeker = await createSeeker({
               name, email, location, dob, type: type as ESeekerType, nationalId, institutions: "",
               userId: newUser.id
          });
          if(newSeeker) {
               toast.success("Successfully registered your account!");
               queryClient.invalidateQueries();
               return router.push("/login");
          }else{
               return toast.error("Something went wrong. Please contact support!");
          }
     } catch (err) {
          return toast.error(err instanceof Error ? err.message : 'An error occurred during registration')
     } finally {
          setIsSubmitting(false)
     }
     }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-blue-900 via-navy-blue-800 to-navy-blue-700 py-24 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px] z-0"></div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-5">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-400 font-medium text-sm mb-4"
          >
            Welcome to GabaSeal
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Register for seeker Account
          </motion.h2>
        </div>

        <div ref={ref} className="mt-16">
          <motion.div
            className="rounded-2xl border w-full border-white/90 bg-white backdrop-blur-sm shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 sm:p-8">
              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                    <TextInputGroup required name="name" label="Full Names: " type="text" placeholder="ex. Dushime Brother" />
                    <TextInputGroup required name="email" label="Email:" type="email" placeholder="ex. dushime@gmail.com" />
                    <TextInputGroup required name="phone" label="Phone Number:" type="phone" placeholder="ex. 07888..." />
                    <TextInputGroup required name="nationalId" label="National Id:" type="text" inputMode="numeric" placeholder="ex. 11995...." />
                    <TextInputGroup required name="dob" label="Date of Birth:" type="date" placeholder="" />
                    <TextInputGroup required name="location" label="Location:" type="text" placeholder="ex kigali, Gasabo - Remera" />
                    <SelectInputGroup required name="type" label="Account Type" values={Object.values(ESeekerType).map(type => ({label: type, value:type}))} />
                    <PasswordInputGroup required name="password" type="password" label="Password" placeholder="*******" />
                    <PasswordInputGroup required name="confirm-password" type="password" label="Confirm Password" placeholder="*******" />
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
                  >
                    {isSubmitting ? "Registering in..." : "Register"}
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
            <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300">
              ← Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}