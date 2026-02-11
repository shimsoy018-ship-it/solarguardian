import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, XCircle } from 'lucide-react';

interface Props {
  type: 'correct' | 'incorrect' | null;
}

const Effects: React.FC<Props> = ({ type }) => {
  return (
    <AnimatePresence>
      {type === 'correct' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-[100]"
        >
          <div className="relative">
             {/* Simple particle explosion simulation using multiple icons */}
             <Sparkles className="text-yellow-400 absolute -top-20 -left-20 animate-bounce" size={80} />
             <Sparkles className="text-orange-400 absolute -top-32 left-10 animate-pulse" size={60} />
             <Sparkles className="text-white absolute top-10 -right-20 animate-spin" size={70} />
             <div className="bg-green-500/90 text-white font-display text-4xl px-8 py-4 rounded-full shadow-lg border-4 border-green-300">
               정답입니다!
             </div>
          </div>
        </motion.div>
      )}

      {type === 'incorrect' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: 1, 
            x: [0, -20, 20, -10, 10, 0] // Shake effect
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-[100]"
        >
          <div className="bg-red-500/90 text-white font-display text-4xl px-8 py-4 rounded-full shadow-lg border-4 border-red-300 flex items-center gap-4">
             <XCircle size={40} />
             틀렸습니다...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Effects;