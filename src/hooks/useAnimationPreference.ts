// hooks/useAnimationPreference.ts
import { useEffect, useState } from 'react';

export default function useAnimationPreference(): boolean {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!prefersReducedMotion);
  }, []);

  return enabled;
}
