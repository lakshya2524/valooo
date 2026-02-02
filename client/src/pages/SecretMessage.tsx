import { motion } from "framer-motion";
import { Heart, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";
import { useLocation } from "wouter";

export default function SecretMessage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-rose-50">
      <FloatingHearts />
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-full max-w-4xl z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-purple-200 border-4 border-white relative">
          
          {/* Lock Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                className="absolute -top-2 -right-2"
              >
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 mb-8 text-center"
          >
            Secret Message 💌
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6 mb-12"
          >
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 md:p-12 border-2 border-purple-200 shadow-inner">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg md:text-2xl text-gray-800 leading-relaxed font-medium text-center"
              >
                This is my secret message for you! 💕
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-8 space-y-4"
              >
                <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center">
                I won’t attempt to reason away what my heart already understands.
I’ve grown deeply fond of you in the cute little fights (nightmares for me), in our conversations, and in the simple comfort of your presence.
Being with you feels effortless and meaningful all at once.
If your heart feels even a whisper of what mine does ( even 0.000001% would work), I would want to be with you and see where it goes.❤️
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col items-center gap-6"
          >
            <Button
              onClick={() => setLocation("/success")}
              className="px-8 py-6 text-xl rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              wapas jane k liye yeh dabbae 
            </Button>
            
            <div className="flex items-center gap-2 text-pink-500">
              <Heart className="w-6 h-6 fill-pink-500 animate-pulse" />
              <span className="text-sm font-semibold">Made with love</span>
              <Heart className="w-6 h-6 fill-pink-500 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
