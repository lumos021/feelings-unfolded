"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  animationDisabled?: boolean;
}

export default function SectionReveal({ 
  children, 
  id, 
  animationDisabled = false 
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-10% 0px -10% 0px"
  });

  return (
    <section
      id={id}
      ref={ref}
      className="py-20 container mx-auto px-4 relative"
    >
      <motion.div
        initial={animationDisabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={isInView || animationDisabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
      
      {/* Section indicator connected to thread */}
      {!animationDisabled && isInView && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-blue-500 left-1/2 -translate-x-1/2 top-0 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </section>
  );
}
