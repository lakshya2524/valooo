import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars } from "lucide-react";
import confetti from "canvas-confetti";
import { useCreateResponse } from "@/hooks/use-response";
import { FloatingHearts } from "@/components/FloatingHearts";
import { RunningButton } from "@/components/RunningButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { mutate: sendResponse, isPending } = useCreateResponse();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleYes = () => {
    // 1. Trigger Confetti
    setShowConfetti(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // 2. Send API request
    sendResponse(
      { answer: "YES" },
      {
        onSuccess: () => {
          setTimeout(() => setLocation("/success"), 1500); // Wait a bit for confetti
        },
        onError: () => {
          // Even if API fails (maybe offline), let them proceed to success page!
          // Love shouldn't depend on network connectivity ;)
          setTimeout(() => setLocation("/success"), 1500);
        }
      }
    );
  };

  const handleNoClick = () => {
    toast({
      title: "Nice try! 😜",
      description: "That button is just for decoration.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-2xl z-10"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-xl shadow-primary/10 border-4 border-white text-center relative overflow-visible">
          
          {/* Decorative Cat Image */}
          <div className="mb-8 relative inline-block">
             {/* cute begging cat */}
            <motion.img 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              src="/uploads/cute-begging-cat.jpg"
              alt="Cute begging cat"
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto rounded-2xl"
            />
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </motion.div>
          </div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-primary mb-6 drop-shadow-sm"
          >
            Will you be my Valentine?
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 font-medium"
          >
            I don’t just like the idea of you , I like you
          </motion.p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-[120px]">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleYes}
                disabled={isPending || showConfetti}
                className="px-10 py-8 text-2xl rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 border-none transition-all duration-300"
              >
                {isPending ? (
                  <Stars className="w-6 h-6 animate-spin mr-2" /> 
                ) : (
                  <span className="flex items-center gap-2">YES! <Heart className="fill-white w-6 h-6" /></span>
                )}
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <RunningButton onCatch={handleNoClick}>
                No 😢
              </RunningButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
