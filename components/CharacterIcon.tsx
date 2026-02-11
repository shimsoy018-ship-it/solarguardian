
import React from 'react';
import { Rocket, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { CharacterStage } from '../types';

interface Props {
  stage: CharacterStage;
  size?: number;
  className?: string;
}

const CharacterIcon: React.FC<Props> = ({ stage, size = 64, className = "" }) => {
  const getStyles = () => {
    switch (stage) {
      case 'god':
        return {
          bg: 'bg-gradient-to-tr from-orange-600 via-orange-400 to-yellow-300',
          shadow: 'shadow-[0_0_40px_rgba(251,146,60,0.8)]',
          iconColor: 'text-white',
          glow: 'animate-pulse'
        };
      case 'knight':
        return {
          bg: 'bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-300',
          shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.6)]',
          iconColor: 'text-white',
          glow: ''
        };
      case 'baby':
        return {
          bg: 'bg-gradient-to-tr from-green-700 via-green-500 to-emerald-300',
          shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
          iconColor: 'text-white/90',
          glow: ''
        };
      case 'egg':
      default:
        return {
          bg: 'bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-400',
          shadow: 'shadow-[0_0_15px_rgba(255,255,255,0.2)]',
          iconColor: 'text-white/40',
          glow: ''
        };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${styles.bg} ${styles.shadow} ${styles.glow} ${className}`}
      style={{ width: size, height: size }}
    >
      {stage === 'egg' ? (
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
           <div className="w-1/2 h-2/3 border-2 border-dashed border-white/30 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]" />
        </motion.div>
      ) : (
        <div className="relative">
          <Rocket 
            size={size * 0.6} 
            className={`${styles.iconColor} transition-all duration-500`} 
            strokeWidth={2.5}
          />
          {stage === 'knight' && (
            <Shield 
              size={size * 0.3} 
              className="absolute -bottom-1 -right-1 text-white fill-blue-400" 
            />
          )}
          {stage === 'god' && (
            <Sparkles 
              size={size * 0.4} 
              className="absolute -top-4 -right-4 text-yellow-200 animate-spin-slow" 
              style={{ animationDuration: '4s' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterIcon;
