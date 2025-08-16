"use client";

import { logoutUser } from "@/lib/actions/auth/auth";
import { ReactNode } from "react";
import { toast } from "sonner";


export default function LogoutBtn({className,name, icon}:{name?:string, icon?:ReactNode, className:string}) {
     const logout = async () => {
          toast.warning("Logging out....");
          await logoutUser();
          return toast.success("Successfully logged out");
     }
     return (
          <button type="button" onClick={logout} className={className}>{icon? icon : null} {name ? name : ""}</button>
     )
}