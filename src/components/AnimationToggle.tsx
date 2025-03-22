"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function AnimationToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [animationDisabled, setAnimationDisabled] = useState(false);

  useEffect(() => {
    // Check URL param or localStorage on component mount
    const storedPreference = localStorage.getItem("animationDisabled");
    const paramValue = searchParams.get("animation-disabled");
    
    if (paramValue === "true") {
      setAnimationDisabled(true);
      localStorage.setItem("animationDisabled", "true");
    } else if (paramValue === "false") {
      setAnimationDisabled(false);
      localStorage.setItem("animationDisabled", "false");
    } else if (storedPreference) {
      setAnimationDisabled(storedPreference === "true");
    }
  }, [searchParams]);

  const toggleAnimation = () => {
    const newValue = !animationDisabled;
    setAnimationDisabled(newValue);
    localStorage.setItem("animationDisabled", String(newValue));
    
    // Update URL parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("animation-disabled", String(newValue));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button 
      onClick={toggleAnimation}
      className="flex items-center gap-2 text-sm"
      aria-pressed={animationDisabled}
    >
      <span className={`w-10 h-5 bg-gray-300 rounded-full relative transition ${
        animationDisabled ? "" : "bg-blue-500"
      }`}>
        <span 
          className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${
            animationDisabled ? "left-0.5" : "left-5"
          }`} 
        />
      </span>
      <span className="sr-only">
        {animationDisabled ? "Enable animations" : "Disable animations"}
      </span>
      <span>Animations</span>
    </button>
  );
}
