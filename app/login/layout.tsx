import { getSessionUser } from "@/lib/actions/auth/user";
import { getRedirectPath } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function LoginLayout({children}:{children:ReactNode}) {
     const {user} = await getSessionUser();
     if(user) return redirect(getRedirectPath(user.type));
     return (
          <>
               {children}
          </>
     )
}