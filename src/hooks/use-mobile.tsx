
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [touchDevice, setTouchDevice] = React.useState(false)

  React.useEffect(() => {
    // Detect if touch device
    const isTouchDevice = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 || 
                           (navigator as any).msMaxTouchPoints > 0;
    
    setTouchDevice(isTouchDevice);
    
    // Check screen size
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Modern API
    mql.addEventListener("change", onChange)
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener('orientationchange', onChange)
    }
  }, [])

  // Consider device as mobile if either screen size is small or it's a touch device
  return !!isMobile || touchDevice
}
