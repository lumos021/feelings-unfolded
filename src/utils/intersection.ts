/**
 * Utility functions for handling IntersectionObserver functionality
 * for animating elements as they enter the viewport
 */

/**
 * Options for configuring the intersection observer
 */
interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Sets up an intersection observer to add a class to elements when they enter the viewport
 * 
 * @param selector - CSS selector for elements to observe
 * @param className - Class to add when element is in view
 * @param options - Configuration options for the observer
 */
export function setupIntersectionObserver(
  selector: string,
  className: string = 'in-view',
  options: IntersectionOptions = {}
): IntersectionObserver | null {
  // Return null if window is not defined (SSR)
  if (typeof window === 'undefined') return null;
  
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options;
  
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return null;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add class when element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        
        // If once is true, unobserve after adding class
        if (once) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        // Remove class when element is not in view (if not once)
        entry.target.classList.remove(className);
      }
    });
  }, {
    threshold,
    rootMargin
  });
  
  // Start observing all matching elements
  elements.forEach(element => {
    observer.observe(element);
  });
  
  return observer;
}

/**
 * Clean up an intersection observer by disconnecting it
 * 
 * @param observer - The IntersectionObserver to disconnect
 */
export function cleanupIntersectionObserver(observer: IntersectionObserver | null): void {
  if (observer) {
    observer.disconnect();
  }
}

/**
 * Hook up animation on scroll for elements with a specific class
 * To be called on component mount
 * 
 * @param animateClass - Class of elements to animate on scroll
 * @returns A cleanup function to disconnect the observer
 */
export function setupScrollAnimations(animateClass: string = 'animate-on-scroll'): () => void {
  const observer = setupIntersectionObserver(`.${animateClass}`);
  
  return () => {
    cleanupIntersectionObserver(observer);
  };
} 