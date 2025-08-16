"use client";

import { createContext, ReactNode, useContext } from "react";
import { TAuthEmployee } from "../select-types/institution/employee";

interface InstitutionContextType {
     authEmployee: TAuthEmployee;
}

const AuthContext = createContext<InstitutionContextType | undefined>(undefined);

export function InstitutionProvider({authEmployee, children}:{children: ReactNode, authEmployee: TAuthEmployee}) {
     return (
          <AuthContext.Provider value={{authEmployee}}>
               {children}
          </AuthContext.Provider>
     )
}

export function useInstitutionContext() {
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error("useInstitutionContext must be used within an InstitutionProvider");
     }
     return context;
}