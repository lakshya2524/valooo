import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Heart, Sparkles, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";
import confetti from "canvas-confetti";

export default function Success() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Initial burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF0000', '#FFFFFF']
    });
    
    // Heart rain effect
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const skews = [1];
    
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    
    (function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      
      skews.forEach(function(skew) {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: (Math.random() * skew) - 0.2
          },
          colors: ['#FFC0CB', '#FF69B4', '#E6E6FA'],
          shapes: ['circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4)
        });
      });
      
      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      <FloatingHearts />
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-full max-w-3xl z-10 text-center"
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-pink-200 border border-white/50 relative">
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8 flex justify-center"
          >
             {/* Excited bear/cat gif */}
            <img 
              src="https://media1.tenor.com/m/nZ122eN52cEAAAAC/happy-cat-cat.gif"
              alt="Happy jumping cat"
              className="w-64 h-64 object-contain rounded-2xl shadow-lg border-4 border-white rotate-3"
            />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mb-6 py-2"
          >
            YAY!!! ❤️
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-body text-foreground/80 font-semibold">
              I knew you'd say yes!
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
              This is going to be the best Valentine's Day ever. Get ready for an amazing date! 
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <Button
              onClick={() => setLocation("/gallery")}
              className="px-8 py-6 text-xl rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
              data-testid="button-view-gallery"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              View Amrit's Gallery
            </Button>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-pink-400 uppercase tracking-widest">See you soon!</span>
              <Heart className="w-8 h-8 text-pink-500 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-pink-200 animate-pulse">
        <Sparkles size={48} />
      </div>
      <div className="absolute bottom-10 right-10 text-pink-200 animate-pulse delay-700">
        <Sparkles size={64} />
      </div>
    </div>
  );
}
