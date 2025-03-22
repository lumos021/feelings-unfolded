// components/ThreadAnimation.tsx
"use client";

import { useEffect, useRef, useContext, useState, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimationContext, AnimationConfig } from '../context/AnimationContext';
import { springLerp, round, prefersReducedMotion } from '../utils/animationUtils';
import { isMobile, getDevicePerformance } from '../utils/deviceUtils';

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  accentColor: string;
  opacity: number;
  frequency: number;
  phase: number;
  noiseOffset: number;
}

interface Point {
  x: number;
  y: number;
}

export interface Section {
  element: HTMLElement | null;
  id: string;
}

interface ThreadAnimationProps {
  sections: Section[];
}

// Define circle configurations without random values
const CIRCLE_CONFIGS = [
  { main: '#FF6B6B', accent: '#4ECDC4', angle: 0, size: 60 }, // Coral red to Turquoise
  { main: '#7A4EAF', accent: '#FF61D2', angle: Math.PI / 3, size: 50 }, // Deep purple to Pink
  { main: '#4E7AAF', accent: '#2ECC71', angle: (2 * Math.PI) / 3, size: 70 }, // Ocean blue to Emerald
  { main: '#FFB347', accent: '#FF61A0', angle: Math.PI, size: 55 }, // Golden orange to Rose
  { main: '#45B7D1', accent: '#98FB98', angle: (4 * Math.PI) / 3, size: 65 }, // Sky blue to Mint
  { main: '#FF8C42', accent: '#4EA5D9', angle: (5 * Math.PI) / 3, size: 45 } // Sunset orange to Azure
];

const THREAD_LENGTH = 3000;

// Generate background circles with responsive positioning
const generateCircles = (config: AnimationConfig): Circle[] => {
  const circles: Circle[] = [];
  const centerX = 50;
  // Adjust starting Y position to be below header
  const centerY = isMobile() ? 70 : 80;
  // Wide spread for both mobile and desktop
  const spread = isMobile() ? 2.0 : 2.2;
  // Adjust circle size based on performance level
  const performanceMultiplier = 
    config.complexity === 'low' ? 0.7 : 
    config.complexity === 'medium' ? 0.8 : 0.9;
  // Adjust opacity based on intensity
  const opacityBase = 0.35 + (config.colorIntensity * 0.15);

  for (let i = 0; i < CIRCLE_CONFIGS.length; i++) {
    const configItem = CIRCLE_CONFIGS[i];
    const x = round(centerX + Math.cos(configItem.angle) * (configItem.size * 0.25 * spread));
    const y = round(centerY + Math.sin(configItem.angle) * (configItem.size * 0.2 * spread));
    
    circles.push({
      x,
      y,
      radius: round(configItem.size * 0.4 * performanceMultiplier),
      color: configItem.main,
      accentColor: configItem.accent,
      opacity: round(opacityBase + (i * 0.02)),
      frequency: round(1.5 + (i * 0.2)),
      phase: configItem.angle,
      noiseOffset: round(i * Math.PI / 3)
    });
  }
  return circles;
};

// Generate intertwining threads within circles with more organic patterns
const generateCircleThreads = (progress: number, circles: Circle[], config: AnimationConfig): string => {
  const points: string[] = [];
  
  // Adjust complexity based on performance level
  const complexityMultiplier = 
    config.complexity === 'low' ? 0.7 :
    config.complexity === 'medium' ? 1.0 : 1.2;
  
  circles.forEach((circle) => {
    const complexity = Math.floor(12 * complexityMultiplier);
    const startAngle = circle.phase;
    
    const subPath = [];
    const step = prefersReducedMotion() ? 0.2 : 0.1;
    
    for (let i = 0; i <= complexity * Math.PI * 2; i += step) {
      const angle = round(startAngle + i + Math.sin(i * circle.frequency) * (1 - progress));
      const r = round(circle.radius * (0.8 + Math.sin(i * 3) * 0.3) * (1 - progress * 0.5));
      const x = round(circle.x + Math.cos(angle) * r * (1 + Math.sin(i * 0.5) * 0.2));
      const y = round(circle.y + Math.sin(angle) * r * (1 + Math.cos(i * 0.5) * 0.2));
      
      if (i === 0) {
        subPath.push(`M ${x},${y}`);
      } else {
        const prevX = round(circle.x + Math.cos(angle - step) * r * (1 + Math.sin((i - step) * 0.5) * 0.2));
        const prevY = round(circle.y + Math.sin(angle - step) * r * (1 + Math.cos((i - step) * 0.5) * 0.2));
        const noiseX = round(Math.sin(i * 5 + circle.noiseOffset) * 2);
        const noiseY = round(Math.cos(i * 5 + circle.noiseOffset) * 2);
        const cp1x = round(prevX + (x - prevX) * 0.5 + noiseX);
        const cp1y = round(prevY + (y - prevY) * 0.5 + noiseY);
        subPath.push(`Q ${cp1x},${cp1y} ${x},${y}`);
      }
    }
    points.push(subPath.join(' '));
  });
  
  return points.join(' ');
};

// Generate naturally converging threads with more organic movement
const generateConvergingThreads = (progress: number, circles: Circle[], sections: number, config: AnimationConfig): string => {
  const points: string[] = [];
  const totalHeight = 800;
  
  // Adjust complexity based on performance level
  const detailMultiplier = 
    config.complexity === 'low' ? 0.5 :
    config.complexity === 'medium' ? 1.0 : 1.5;
  
  // Adjust animation intensity
  const intensityFactor = config.intensity * 1.2;
  
  circles.forEach((circle) => {
    let prevX = circle.x;
    let prevY = circle.y;
    const endY = totalHeight - 100;
    
    const subPath = [];
    const segmentCount = Math.max(6, Math.floor(sections * 3 * detailMultiplier));
    
    for (let i = 0; i <= segmentCount; i++) {
      const t = i / segmentCount;
      const y = round(circle.y + (endY - circle.y) * t * progress);
      
      // Smoother transition between states with longer transition window
      const transitionProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.5));
      const randomness = round(Math.max(0.2, 1 - transitionProgress));
      const convergence = round(Math.min(1, transitionProgress));
      
      // Adjust wave amplitude based on device and settings
      const baseAmplitude = isMobile() ? 25 : 35;
      const waveAmplitude = round(baseAmplitude * randomness * intensityFactor);
      const frequency = round(circle.frequency + Math.sin(t * Math.PI * 2) * (isMobile() ? 1.4 : 1.5));
      const phase = circle.phase;
      
      const noiseFactor = round(Math.sin(t * 10 + phase) * Math.cos(t * 5) * (1 - convergence) * intensityFactor);
      // Wide spread for both mobile and desktop
      const spreadMultiplier = isMobile() ? 12 : 15;
      const targetX = round(50 + Math.sin(t * Math.PI * 2 + phase) * spreadMultiplier * (1 - convergence));
      const baseX = round(gsap.utils.interpolate(circle.x, targetX, t * convergence));
      const x = round(baseX + Math.sin(t * Math.PI * frequency + phase) * waveAmplitude + noiseFactor * (isMobile() ? 8 : 10));
      
      if (i === 0) {
        subPath.push(`M ${x},${y}`);
      } else {
        const noiseMultiplier = isMobile() ? 3 : 4;
        const noiseX = round(Math.sin(t * 8 + circle.noiseOffset) * noiseMultiplier * randomness * intensityFactor);
        const noiseY = round(Math.cos(t * 8 + circle.noiseOffset) * noiseMultiplier * randomness * intensityFactor);
        const cp1x = round(prevX + (x - prevX) * 0.5 + noiseX);
        const cp1y = round(prevY + (y - prevY) * 0.5 + noiseY);
        subPath.push(`Q ${cp1x},${cp1y} ${x},${y}`);
      }
      
      prevX = x;
      prevY = y;
    }
    points.push(subPath.join(' '));
  });
  
  return points.join(' ');
};

const ThreadAnimation: React.FC<ThreadAnimationProps> = ({ sections }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const { animationsEnabled, config, isReducedMotion } = useContext(AnimationContext);
  const [circles, setCircles] = useState<Circle[]>(() => generateCircles(config));
  
  const scrollProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const pathProgress = useRef<number>(0);
  const requestRef = useRef<number>(0);

  // Initialize pathRefs array
  useEffect(() => {
    pathRefs.current = new Array(circles.length).fill(null);
  }, [circles.length]);

  // Handle ref callback
  const setPathRef = useCallback((index: number) => (el: SVGPathElement | null) => {
    pathRefs.current[index] = el;
  }, []);

  // Regenerate circles when config changes
  useEffect(() => {
    setCircles(generateCircles(config));
  }, [config]);

  // Add window resize handler to update circles with debouncing
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCircles(generateCircles(config));
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [config]);

  // Set up the animation
  useEffect(() => {
    if (!animationsEnabled || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Use speed from config to adjust animation timing
    const speedFactor = config.speed;
    const stiffness = isMobile() ? 0.06 * speedFactor : 0.06 * speedFactor;
    const scrollScrubFactor = isReducedMotion ? 2.5 : 1.5;

    const animate = () => {
      currentProgress.current = springLerp(
        currentProgress.current,
        scrollProgress.current,
        stiffness
      );
      
      pathProgress.current = gsap.utils.interpolate(
        pathProgress.current,
        currentProgress.current,
        isMobile() ? 0.08 * speedFactor : 0.08 * speedFactor
      );
      
      pathRefs.current.forEach((pathRef, index) => {
        if (pathRef) {
          // Smoother transition between circle and converging states
          const circlePhase = Math.max(0, Math.min(1, (0.35 - pathProgress.current) / 0.2));
          const convergingPhase = Math.max(0, Math.min(1, (pathProgress.current - 0.15) / 0.2));
          
          let path;
          if (circlePhase > 0 && convergingPhase === 0) {
            path = generateCircleThreads(pathProgress.current, [circles[index]], config);
          } else if (circlePhase === 0 && convergingPhase > 0) {
            path = generateConvergingThreads(pathProgress.current, [circles[index]], sections.length, config);
          } else {
            // During transition, use converging path
            path = generateConvergingThreads(pathProgress.current, [circles[index]], sections.length, config);
          }
          
          pathRef.setAttribute('d', path);
          const offset = gsap.utils.interpolate(THREAD_LENGTH, 0, currentProgress.current);
          pathRef.style.strokeDashoffset = `${offset}`;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // Enhanced section animations with more visibility
    const sectionAnims = sections.map((section) => {
      if (!section.element) return null;
      
      gsap.set(section.element, { 
        opacity: 1,
        y: 0,
        visibility: 'visible'
      });
      
      return ScrollTrigger.create({
        trigger: section.element,
        start: "top 80%",
        end: "center center",
        onEnter: () => {
          gsap.to(section.element, {
            opacity: 1,
            y: 0,
            duration: isReducedMotion ? 0.5 : 1,
            ease: "power2.out",
            overwrite: true
          });
        },
        onLeaveBack: () => {
          gsap.to(section.element, {
            opacity: 0.5,
            y: isReducedMotion ? 10 : 20,
            duration: isReducedMotion ? 0.3 : 0.5,
            ease: "power2.in",
            overwrite: true
          });
        }
      });
    }).filter(Boolean);

    const scrollTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: scrollScrubFactor, // Adjust scrub based on reduced motion
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(requestRef.current);
      scrollTrigger.kill();
      sectionAnims.forEach(trigger => trigger?.kill());
    };
  }, [animationsEnabled, sections, circles, config, isReducedMotion]);

  // Don't render anything if animations are disabled
  if (!animationsEnabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="thread-container fixed w-full h-full top-0 left-0 -z-10 pointer-events-none overflow-visible"
      aria-hidden="true"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform'  // Performance hint for browsers
      }}
    >
      <svg 
        className="w-full h-full" 
        viewBox={isMobile() ? `-50 -20 200 900` : `-100 0 300 900`}
        preserveAspectRatio="xMidYMin slice"
        style={{ 
          opacity: 1,
          willChange: 'contents'  // Performance hint for browsers
        }}
        aria-label="Decorative thread animation"
      >
        <defs>
          {circles.map((circle, index) => (
            <radialGradient 
              key={`gradient-${index}`} 
              id={`threadGradient-${index}`} 
              cx="0.3" 
              cy="0.3"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={circle.color} stopOpacity={Math.min(0.9, circle.opacity + 0.1)} />
              <stop offset="100%" stopColor={circle.accentColor} stopOpacity={Math.min(0.7, circle.opacity)} />
            </radialGradient>
          ))}
          <filter id="glow" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation={isReducedMotion ? "2" : "3"} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circles */}
        {circles.map((circle, index) => (
          <circle
            key={`circle-${index}`}
            cx={circle.x}
            cy={circle.y}
            r={circle.radius}
            fill={`url(#threadGradient-${index})`}
            opacity={circle.opacity}
            filter="url(#glow)"
          />
        ))}

        {/* Threads - one per circle */}
        {circles.map((circle, index) => (
          <path
            key={`thread-${index}`}
            ref={setPathRef(index)}
            d=""
            fill="none"
            stroke={`url(#threadGradient-${index})`}
            strokeWidth={isMobile() ? "2" : "1.5"}
            strokeLinecap="round"
            strokeDasharray={THREAD_LENGTH}
            strokeDashoffset={THREAD_LENGTH}
            filter="url(#glow)"
            opacity={config.complexity === 'low' ? 0.6 : 0.8}
          />
        ))}
      </svg>

      <span className="sr-only">Decorative thread animation representing emotional journey</span>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ThreadAnimation);
