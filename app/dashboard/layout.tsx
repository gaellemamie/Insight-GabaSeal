import type React from "react"
import InstitutionDashboardWrapper from "@/components/layout/institution/InstitutionDashboardWrapper";
import { getSessionUser } from "@/lib/actions/auth/user";
import { redirect } from "next/navigation";
import { EUserType } from "@/prisma/lib/generated/prisma";
import { fetchEmployee } from "@/lib/actions/institution/Employee";
import { SAuthEmployee } from "@/lib/select-types/institution/employee";
import { InstitutionProvider } from "@/lib/contexts/InstitutionContext";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const {user} = await getSessionUser();
  if(!user) return redirect("/login");
  if(user.type !== EUserType.EMPLOYEE) return redirect("/");
  const employees = await fetchEmployee(SAuthEmployee, {email: user.email}, 1);
  const employee = employees.data[0];
  return (
    <InstitutionProvider authEmployee={employee}>
      <InstitutionDashboardWrapper>
        {children}
      </InstitutionDashboardWrapper>
    </InstitutionProvider>
  )
}
