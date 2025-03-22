/**
 * Device and browser detection utilities
 */

/**
 * Checks if the current device is mobile based on screen width and user agent
 * @returns Boolean indicating if device is mobile
 */
export const isMobile = (): boolean => {
  // Return false during SSR
  if (typeof window === 'undefined') return false;
  
  // First check screen width for a quick result
  const isMobileWidth = window.innerWidth <= 768;
  
  // Then check userAgent for a more accurate result
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Additional check using navigator.userAgentData if available
  if ('userAgentData' in navigator) {
    try {
      // @ts-expect-error: navigator.userAgentData is not yet in all TypeScript definitions
      const isMobileDevice = navigator.userAgentData?.mobile === true;
      return isMobileDevice || isMobileWidth || isMobileUserAgent;
    } catch (e) {
      // Fallback if userAgentData fails
      return isMobileWidth || isMobileUserAgent;
    }
  }
  
  return isMobileWidth || isMobileUserAgent;
};

/**
 * Checks the device's performance capabilities
 * @returns Performance capability rating: 'low', 'medium', or 'high'
 */
export const getDevicePerformance = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium';
  
  // Check available logical processors (CPU cores)
  const processors = window.navigator?.hardwareConcurrency || 0;
  
  // Check device memory if available
  // @ts-expect-error: navigator.deviceMemory is not yet in all TypeScript definitions
  const memory = window.navigator?.deviceMemory || 0;
  
  // Calculate performance score based on hardware
  const performanceScore = Math.min(10, processors + (memory / 2));
  
  if (performanceScore <= 3) return 'low';
  if (performanceScore <= 6) return 'medium';
  return 'high';
};

/**
 * Checks if the browser supports necessary features for animations
 * @returns Boolean indicating if all required features are supported
 */
export const isBrowserSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for minimum required features
  const hasRequestAnimationFrame = 'requestAnimationFrame' in window;
  const hasTransform = 'transform' in document.documentElement.style;
  const hasSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
  
  return hasRequestAnimationFrame && hasTransform && hasSVG;
};

/**
 * Returns information about the current device for adaptive rendering
 * @returns Object with device information 
 */
export const getDeviceInfo = () => {
  return {
    isMobile: isMobile(),
    performanceLevel: getDevicePerformance(),
    prefersReducedMotion: typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
    hasTouchScreen: typeof window !== 'undefined'
      ? ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
      : false
  };
}; 