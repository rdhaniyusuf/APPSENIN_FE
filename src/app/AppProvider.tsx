'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/Auth";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import HeaderComp from "@/components/Header";
import SidebarComp from "@/components/Sidebar";
import { HeroUIProvider, ScrollShadow } from '@heroui/react'

export function AppProviders({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setLoading(true); // Reset loading state on route change

    const checkAuth = () => {
      if (!isAuthenticated() && pathname !== "/auth/login") {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      setLoading(false);
    };

    const timer = setTimeout(checkAuth, 1000); // Reduced delay for better UX

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <HeroUIProvider>
      {loading && (
        <div className="w-full top-0 left-0 absolute min-h-screen backdrop-blur-sm z-10">
          <div className="flex flex-col items-center min-h-screen justify-center">
            <div className="mb-6">
              <Loading />
            </div>
          </div>
        </div>
      )}
      {!loading && showAlert && pathname !== "/auth/login" && (
        <div className="w-full top-0 left-0 absolute min-h-screen backdrop-blur-sm z-10">
          <div className="flex flex-col items-center min-h-screen justify-center">
            <Alert
              colorA="danger"
              contentA="You need to log in to access this page."
              titleA="Access Denied"
              buttonTextA="Go to Login"
              hrefA="/auth/login"
            />
          </div>
        </div>
      )}

      {!loading && !showAlert && (
        <div className="min-h-screen z-0 flex">
          {pathname !== "/auth/login" && <SidebarComp />}
          <div className="h-max flex-1">
            {pathname !== "/auth/login" && <HeaderComp />}
            <ScrollShadow hideScrollBar className="h-[calc(90vh)]">
              <main className="p-2 px-6">
                {children}
              </main>
            </ScrollShadow>
          </div>
        </div>
      )}
    </HeroUIProvider>
  )
}

export default AppProviders;
