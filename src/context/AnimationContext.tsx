// context/AnimationContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { prefersReducedMotion } from '../utils/animationUtils';
import { getDevicePerformance } from '../utils/deviceUtils';

export interface AnimationConfig {
  complexity: 'low' | 'medium' | 'high';
  speed: number; // 0.5 = slower, 1 = normal, 2 = faster
  intensity: number; // 0-1 scale
  colorIntensity: number; // 0-1 scale
}

interface AnimationContextProps {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  isReducedMotion: boolean;
  performanceLevel: 'low' | 'medium' | 'high';
  config: AnimationConfig;
  updateConfig: (newConfig: Partial<AnimationConfig>) => void;
}

const defaultConfig: AnimationConfig = {
  complexity: 'medium',
  speed: 1,
  intensity: 0.8,
  colorIntensity: 0.8,
};

export const AnimationContext = createContext<AnimationContextProps>({
  animationsEnabled: true,
  toggleAnimations: () => {},
  isReducedMotion: false,
  performanceLevel: 'medium',
  config: defaultConfig,
  updateConfig: () => {},
});

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  // Get initial animation state from localStorage if available
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [performanceLevel, setPerformanceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [config, setConfig] = useState<AnimationConfig>(defaultConfig);

  // Check for reduced motion preference
  useEffect(() => {
    // Initialize animation state from localStorage if available
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('animationsEnabled');
      if (savedState) {
        setAnimationsEnabled(savedState === 'true');
      }
      
      // Check for stored config
      const savedConfig = localStorage.getItem('animationConfig');
      if (savedConfig) {
        try {
          setConfig(JSON.parse(savedConfig));
        } catch (e) {
          // Fallback to defaults if parsing fails
          setConfig(defaultConfig);
        }
      }
      
      // Detect reduced motion preference
      setIsReducedMotion(prefersReducedMotion());
      
      // Detect device performance
      setPerformanceLevel(getDevicePerformance());
      
      // Set up listener for reduced motion preference changes
      const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      
      motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);
      
      return () => {
        motionMediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      };
    }
  }, []);

  // Save animation state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('animationsEnabled', animationsEnabled.toString());
    }
  }, [animationsEnabled]);
  
  // Save config to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('animationConfig', JSON.stringify(config));
    }
  }, [config]);

  // Toggle animations state
  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => !prev);
  }, []);
  
  // Update animation config
  const updateConfig = useCallback((newConfig: Partial<AnimationConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  }, []);
  
  // Apply performance-based configuration
  useEffect(() => {
    if (performanceLevel === 'low') {
      updateConfig({
        complexity: 'low',
        intensity: 0.5
      });
    }
  }, [performanceLevel, updateConfig]);
  
  // Apply reduced motion settings
  useEffect(() => {
    if (isReducedMotion) {
      updateConfig({
        speed: 0.5,
        intensity: 0.3
      });
    }
  }, [isReducedMotion, updateConfig]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    animationsEnabled: animationsEnabled && !isReducedMotion,
    toggleAnimations,
    isReducedMotion,
    performanceLevel,
    config,
    updateConfig
  }), [animationsEnabled, toggleAnimations, isReducedMotion, performanceLevel, config, updateConfig]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};
