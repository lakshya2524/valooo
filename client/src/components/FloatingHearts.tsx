import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Initial batch
    setHearts(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((i) => (
        <div
          key={i}
          className="absolute animate-float opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <Heart 
            className="text-primary/20 fill-primary/10" 
            size={24 + Math.random() * 32} 
          />
        </div>
      ))}
    </div>
  );
}
