/**
 * Animation utility functions
 */

interface Point {
  x: number;
  y: number;
}

/**
 * Enhanced lerp with spring effect for smoother animations
 * @param current Current value
 * @param target Target value
 * @param stiffness Spring stiffness factor (0-1)
 * @returns Interpolated value
 */
export const springLerp = (current: number, target: number, stiffness: number): number => {
  const diff = target - current;
  return current + diff * stiffness;
};

/**
 * Rounds a number to 3 decimal places for better performance
 * @param n Number to round
 * @returns Rounded number
 */
export const round = (n: number): number => Math.round(n * 1000) / 1000;

/**
 * Debounces a function call
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): ((...funcArgs: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Checks if user prefers reduced motion
 * @returns Boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a path with natural-looking curves
 * @param points Array of control points
 * @param tension Tension factor for curves (0-1)
 * @returns SVG path string
 */
export const createSmoothPath = (points: Point[], tension: number = 0.5): string => {
  if (points.length < 2) return '';
  
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    
    // Calculate control points
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    
    // First control point
    const cp1x = round(current.x + dx * tension);
    const cp1y = round(current.y + dy * tension);
    
    // Second control point
    const cp2x = round(next.x - dx * tension);
    const cp2y = round(next.y - dy * tension);
    
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
  }
  
  return path;
};

/**
 * Applies easing to a value between 0 and 1
 * @param t Value between 0 and 1
 * @param easingType Type of easing function
 * @returns Eased value
 */
export const applyEasing = (t: number, easingType: 'easeInOut' | 'easeIn' | 'easeOut' = 'easeInOut'): number => {
  // Clamp t between 0 and 1
  t = Math.max(0, Math.min(1, t));
  
  switch (easingType) {
    case 'easeIn':
      return t * t * t;
    case 'easeOut':
      return 1 - Math.pow(1 - t, 3);
    case 'easeInOut':
    default:
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}; 