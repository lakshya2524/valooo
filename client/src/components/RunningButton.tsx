import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";

interface RunningButtonProps {
  children: React.ReactNode;
  onCatch?: () => void;
}

export function RunningButton({ children, onCatch }: RunningButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const controls = useAnimation();

  // Reset position if window resizes to prevent it getting stuck off-screen
  useEffect(() => {
    const handleResize = () => setPosition({ x: 0, y: 0 });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveButton = () => {
    // Increase count to potentially make it easier or harder later (or just fun stats)
    setHoverCount(prev => prev + 1);
    
    // Calculate available window space (with safety margin)
    // We limit movement to roughly within the viewport but relative to current spot
    const xRange = Math.min(window.innerWidth - 100, 300); 
    const yRange = Math.min(window.innerHeight - 100, 300);

    const newX = (Math.random() - 0.5) * xRange * 2;
    const newY = (Math.random() - 0.5) * yRange * 2;

    setPosition({ x: newX, y: newY });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={moveButton}
      onTouchStart={moveButton} // Mobile support
      className="inline-block"
    >
      <Button 
        variant="secondary"
        className="px-8 py-6 text-xl rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors shadow-md"
        onClick={onCatch}
      >
        {children}
      </Button>
    </motion.div>
  );
}
