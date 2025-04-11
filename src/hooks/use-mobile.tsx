
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
    const checkSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Initial check
    checkSize();
    
    // Set up listeners for changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener("change", checkSize);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkSize);
    }
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', checkSize);
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkSize);
      } else {
        window.removeEventListener('resize', checkSize);
      }
      window.removeEventListener('orientationchange', checkSize);
    }
  }, []);

  // Consider device as mobile if either screen size is small or it's a touch device
  return !!isMobile || touchDevice;
}
