import React from 'react';
import { Egg, Baby, Shield, Sun } from 'lucide-react';
import { EvolutionStage, CharacterStage } from '../types';
import { motion } from 'framer-motion';

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

  const renderIcon = (stage: CharacterStage, size: number) => {
    switch (stage) {
      case 'god': return <Sun size={size} className={currentStage.color} />;
      case 'knight': return <Shield size={size} className={currentStage.color} />;
      case 'baby': return <Baby size={size} className={currentStage.color} />;
      case 'egg': return <Egg size={size} className={currentStage.color} />;
    }
  };

  const progressPercentage = (score / totalQuestions) * 100;

  if (isEndGame) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-6 relative"
        >
          {/* Glowing Effect for End Game */}
          <div className={`absolute inset-0 blur-3xl opacity-50 ${currentStage.stage === 'god' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
          <div className="relative z-10">
            {renderIcon(currentStage.stage, 120)}
          </div>
        </motion.div>
        <h2 className={`text-4xl font-display mb-2 ${currentStage.color}`}>{currentStage.name}</h2>
        <p className="text-gray-300 text-lg">{currentStage.description}</p>
        <p className="mt-4 text-2xl font-bold">최종 점수: {score} / {totalQuestions}</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 z-50">
      <div className="max-w-2xl mx-auto flex items-center gap-4">
        <motion.div
          key={currentStage.stage}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative shrink-0"
        >
          <div className="p-3 bg-white/10 rounded-full border border-white/20">
             {renderIcon(currentStage.stage, 40)}
          </div>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex justify-between items-end mb-1">
            <span className={`font-display text-xl ${currentStage.color}`}>{currentStage.name}</span>
            <span className="text-sm text-gray-400">진화 게이지</span>
          </div>
          
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              className={`h-full ${score >= 8 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
            {/* Markers for stages */}
            <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-white/20"></div>
            <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-white/20"></div>
            <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
             <span>알</span>
             <span>아기</span>
             <span>기사</span>
             <span>수호신</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;