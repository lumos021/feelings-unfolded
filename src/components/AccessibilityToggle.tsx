// components/AccessibilityToggle.tsx
"use client";

import { useContext } from 'react';
import { AnimationContext } from '../context/AnimationContext';

const AccessibilityToggle: React.FC = () => {
  const { animationsEnabled, toggleAnimations } = useContext(AnimationContext);

  return (
    <div className="accessibility-controls">
      <button
        onClick={toggleAnimations}
        className="a11y-toggle"
        aria-pressed={!animationsEnabled}
      >
        {animationsEnabled ? 'Disable animations' : 'Enable animations'}
      </button>
    </div>
  );
};

export default AccessibilityToggle;
