/* eslint-disable react-hooks/exhaustive-deps */
"use client";


import { ESeekerType } from "@/prisma/lib/generated/prisma";
import { usePathname} from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TAuthSeeker } from "../select-types/seeker/seeker";

interface SeekerContextType {
     seeker: TAuthSeeker;
}

const SeekerContext = createContext<SeekerContextType | undefined>(undefined);

export function SeekerProvider({seeker, children}:{children: ReactNode, seeker: TAuthSeeker}) {
     return (
          <SeekerContext.Provider value={{seeker}}>
               {children}
          </SeekerContext.Provider>
     )
}

export function useSeekerContext() {
     const context = useContext(SeekerContext);
     if (!context) {
          throw new Error("useSeekerContext must be used within an SeekerProvider");
     }
     return context;
}