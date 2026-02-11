
import React from 'react';
import { EvolutionStage } from '../types';
import { motion } from 'framer-motion';
import CharacterIcon from './CharacterIcon';

interface Props {
  score: number;
  totalQuestions: number;
  isEndGame?: boolean;
}

const getEvolutionStage = (score: number): EvolutionStage => {
  if (score >= 8) {
    return {
      stage: 'god',
      name: '태양계 수호신',
      minScore: 8,
      maxScore: 10,
      color: 'text-yellow-400',
      description: '온 우주를 밝히는 전설의 존재'
    };
  } else if (score >= 6) {
    return {
      stage: 'knight',
      name: '별의 기사',
      minScore: 6,
      maxScore: 7,
      color: 'text-blue-400',
      description: '어둠에 맞서는 용감한 전사'
    };
  } else if (score >= 3) {
    return {
      stage: 'baby',
      name: '아기 전사',
      minScore: 3,
      maxScore: 5,
      color: 'text-green-400',
      description: '이제 막 힘을 깨우친 꼬마'
    };
  } else {
    return {
      stage: 'egg',
      name: '신비한 알',
      minScore: 0,
      maxScore: 2,
      color: 'text-gray-300',
      description: '무한한 잠재력을 품은 알'
    };
  }
};

const CharacterDisplay: React.FC<Props> = ({ score, totalQuestions, isEndGame = false }) => {
  const currentStage = getEvolutionStage(score);
  const progressPercentage = (score / totalQuestions) * 100;

  if (isEndGame) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <CharacterIcon stage={currentStage.stage} size={160} />
        </motion.div>
        <h2 className={`text-5xl font-display mb-3 ${currentStage.color}`}>{currentStage.name}</h2>
        <p className="text-blue-100 text-xl font-medium opacity-80 mb-6">{currentStage.description}</p>
        
        <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
          <p className="text-2xl font-bold">지식 보존율: <span className={currentStage.color}>{score * 10}%</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 z-50">
      <div className="max-w-2xl mx-auto flex items-center gap-6">
        <motion.div
          key={currentStage.stage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="shrink-0"
        >
          <CharacterIcon stage={currentStage.stage} size={64} />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className={`font-display text-2xl ${currentStage.color} block leading-tight`}>{currentStage.name}</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Evolution Level</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white">{score} / {totalQuestions}</span>
              <span className="text-xs text-gray-500 block">STARS</span>
            </div>
          </div>
          
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
            <motion.div 
              className={`h-full ${
                score >= 8 ? 'bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 
                score >= 6 ? 'bg-gradient-to-r from-blue-600 to-cyan-400' :
                score >= 3 ? 'bg-gradient-to-r from-green-600 to-emerald-400' :
                'bg-gradient-to-r from-slate-600 to-slate-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-bold">
             <span className={score < 3 ? 'text-gray-300' : ''}>EGG</span>
             <span className={score >= 3 && score < 6 ? 'text-green-400' : ''}>BABY</span>
             <span className={score >= 6 && score < 8 ? 'text-blue-400' : ''}>KNIGHT</span>
             <span className={score >= 8 ? 'text-orange-400' : ''}>GUARDIAN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;
