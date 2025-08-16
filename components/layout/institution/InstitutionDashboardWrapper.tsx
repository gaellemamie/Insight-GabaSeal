"use client";

import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import InstitutionSidebar from './InstitutionSidebar';
import InstitutionTopNavbar from './InstitutionTopNavbar';

const InstitutionDashboardWrapper = ({children}:{children: ReactNode}) => {
     const [sidebarOpen, setSidebarOpen] = useState(false)
     const pathname = usePathname()
     const isMobile = useMobile()


     useEffect(() => {
     if (isMobile) {
          setSidebarOpen(false)
     }

     }, [pathname, isMobile]);
     return (
          <div className='flex h-screen bg-gray-50'>
               {/* Sidebar for mobile */}
               <div className={cn(
               "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300 lg:hidden",
               sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
               )} onClick={() => setSidebarOpen(false)}/>
               {/* side bar */}
               <InstitutionSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
               <div className='flex flex-1 flex-col overflow-hidden'>
                    <InstitutionTopNavbar setSidebarOpen={setSidebarOpen} />
                    {/* Main content area */}
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
                         <Suspense>{children}</Suspense>
                    </main>
               </div>
          </div>
     )
}

export default InstitutionDashboardWrapper