import UserDashboardHeader from "@/components/layout/user/UserDashboardHeader";
import { getSessionUser } from "@/lib/actions/auth/user";
import { fetchSeeker } from "@/lib/actions/seeker/Seeker";
import { SeekerProvider } from "@/lib/contexts/SeekerContext";
import { SAuthSeeker } from "@/lib/select-types/seeker/seeker";
import { EUserType } from "@/prisma/lib/generated/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const {user} = await getSessionUser();
    if(!user) return redirect("/login");
    if(user.type !== EUserType.SEEKER) return redirect("/");
    const {data:seekers} = await fetchSeeker(SAuthSeeker, {userId: user.id},1);
    return (
    <SeekerProvider seeker={seekers[0]} >  
      <div className="min-h-screen bg-gray-200">
        <UserDashboardHeader user={user} />
        <div className="w-full max-w-7xl mx-auto flex flex-col items-start gap-4 py-4">
          {children}
        </div>
      </div>
    </SeekerProvider>
              
    )
}