// Type definitions for requestIdleCallback
interface RequestIdleCallbackOptions {
  timeout?: number;
}

interface RequestIdleCallbackDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => number;
    cancelIdleCallback: (id: number) => void;
  }
}

export const lazyLoadAnimation = (callback: () => void) => {
  if (typeof window === "undefined") return;
  
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, 200);
  }
};

export const isBrowserSupported = () => {
  if (typeof window === "undefined") return false;
  
  // Check for basic animation support
  const hasRequestAnimationFrame = "requestAnimationFrame" in window;
  const hasTransform = "transform" in document.documentElement.style;
  
  return hasRequestAnimationFrame && hasTransform;
};

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // @ts-expect-error: navigator.userAgentData is not yet widely supported in TypeScript types
  const userAgentData = navigator.userAgentData;
  if (userAgentData?.mobile) return true;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
