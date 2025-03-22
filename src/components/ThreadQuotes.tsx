"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Healing is not linear, but it is possible.",
  "Your feelings are valid and deserve to be acknowledged.",
  "Self-awareness is the first step toward growth.",
  "Small steps lead to big changes.",
  "You are not defined by your struggles."
];

export default function ThreadQuotes() {
  const [activeQuote, setActiveQuote] = useState<number | null>(null);
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20">
      <div className="relative">
        {quotes.map((quote, index) => (
          <div key={index} className="relative">
            <motion.button
              className="w-4 h-4 bg-blue-400 rounded-full mb-10 relative z-10 hover:scale-150 transition"
              onMouseEnter={() => setActiveQuote(index)}
              onMouseLeave={() => setActiveQuote(null)}
              whileHover={{ scale: 1.5 }}
              aria-label={`Mental health quote ${index + 1}`}
            />
            
            <AnimatePresence>
              {activeQuote === index && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-8 top-0 bg-white p-3 rounded-lg shadow-md max-w-xs -translate-y-1/2"
                >
                  <p className="text-sm italic">{quote}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
