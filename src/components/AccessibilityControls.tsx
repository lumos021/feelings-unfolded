'use client';

import { useState, useContext, useEffect, useCallback } from 'react';
import { AnimationContext, AnimationConfig } from '../context/AnimationContext';

interface AccessibilityControlsProps {
  className?: string;
}

/**
 * AccessibilityControls component provides user controls for animation preferences
 * and accessibility settings.
 */
const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ className = '' }) => {
  const { 
    animationsEnabled, 
    toggleAnimations, 
    isReducedMotion,
    config,
    updateConfig
  } = useContext(AnimationContext);
  
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-accessibility-controls]')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  
  // Close menu with escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  // Handle speed change
  const handleSpeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateConfig({ speed: value });
  }, [updateConfig]);
  
  // Handle intensity change
  const handleIntensityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateConfig({ intensity: value });
  }, [updateConfig]);
  
  // Handle complexity change
  const handleComplexityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'low' | 'medium' | 'high';
    updateConfig({ complexity: value });
  }, [updateConfig]);

  return (
    <div 
      className={`relative ${className}`} 
      data-accessibility-controls
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-[#264653] p-3 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:ring-offset-2"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          id="accessibility-menu"
          className="absolute right-0 mt-2 w-64 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <h3 className="text-[#264653] font-semibold mb-3">Animation Settings</h3>
          
          <div className="space-y-4">
            {/* Toggle animations */}
            <div className="flex items-center justify-between">
              <label htmlFor="toggle-animations" className="text-gray-700 text-sm">
                Enable animations
              </label>
              <button
                id="toggle-animations"
                onClick={toggleAnimations}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:ring-offset-2 ${
                  animationsEnabled ? 'bg-[#2a9d8f]' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={animationsEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Speed control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="animation-speed" className="text-gray-700 text-sm">
                  Animation speed
                </label>
                <span className="text-xs text-gray-500">
                  {config.speed === 0.5 ? 'Slow' : config.speed === 1 ? 'Normal' : 'Fast'}
                </span>
              </div>
              <input
                id="animation-speed"
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={config.speed}
                onChange={handleSpeedChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!animationsEnabled}
              />
            </div>
            
            {/* Intensity control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="animation-intensity" className="text-gray-700 text-sm">
                  Animation intensity
                </label>
                <span className="text-xs text-gray-500">
                  {Math.round(config.intensity * 100)}%
                </span>
              </div>
              <input
                id="animation-intensity"
                type="range"
                min="0.3"
                max="1"
                step="0.1"
                value={config.intensity}
                onChange={handleIntensityChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!animationsEnabled}
              />
            </div>
            
            {/* Complexity control */}
            <div className="space-y-1">
              <label htmlFor="animation-complexity" className="text-gray-700 text-sm block">
                Visual complexity
              </label>
              <select
                id="animation-complexity"
                value={config.complexity}
                onChange={handleComplexityChange}
                className="w-full p-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#2a9d8f]"
                disabled={!animationsEnabled}
              >
                <option value="low">Low (Better performance)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Most detailed)</option>
              </select>
            </div>
            
            {isReducedMotion && (
              <p className="text-xs text-amber-700 mt-2">
                Your system is set to reduce motion. Some animations may be simplified.
              </p>
            )}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-[#2a9d8f] hover:bg-[#264653] text-white rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls; 