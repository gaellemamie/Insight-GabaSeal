"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if viewport width is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Consider < 768px as mobile
    }

    // Check on initial load
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
