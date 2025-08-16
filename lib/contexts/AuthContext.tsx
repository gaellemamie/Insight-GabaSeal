/* eslint-disable react-hooks/exhaustive-deps */
"use client";


import { EUserType } from "@/prisma/lib/generated/prisma";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TAuthUser } from "../select-types/auth/user";

interface AuthContextType {
     user: TAuthUser | null | undefined;
     setUser: (user: TAuthUser | null | undefined) => void;
     authOn: boolean;
     setAuthOn: (option:boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({authUser, children}:{children: ReactNode, authUser: TAuthUser | null | undefined}) {
     const [user, setUser] = useState<TAuthUser | null | undefined>(authUser);
     const [authOn, setAuthOn] = useState(authUser ? false : true);
     const pathname = usePathname();
     const router = useRouter();

     return (
          <AuthContext.Provider value={{user, setUser, authOn, setAuthOn}}>
               {children}
          </AuthContext.Provider>
     )
}

export function useAuthContext() {
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error("useAuthContext must be used within an AuthProvider");
     }
     return context;
}