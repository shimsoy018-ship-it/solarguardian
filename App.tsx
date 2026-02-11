import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, RotateCcw, Play } from 'lucide-react';
import StarBackground from './components/StarBackground';
import CharacterDisplay from './components/CharacterDisplay';
import Effects from './components/Effects';
import { QUIZ_DATA } from './data/quizData';
import { GameStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentQuestion = QUIZ_DATA[currentQIndex];

  const startGame = () => {
    setStatus('playing');
    setCurrentQIndex(0);
    setScore(0);
    setFeedback(null);
  };

  const handleAnswer = (option: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    // Delay for animation and feedback reading
    setTimeout(() => {
      setFeedback(null);
      setIsProcessing(false);
      
      if (currentQIndex < QUIZ_DATA.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        setStatus('result');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen text-white font-sans relative flex flex-col overflow-hidden">
      <StarBackground />
      <Effects type={feedback} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-32 z-10 w-full max-w-4xl mx-auto">
        
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {status === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center bg-space-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full"
            >
              <div className="mb-6 flex justify-center">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(251,146,60,0.6)]">
                    <Rocket size={48} className="text-white" />
                 </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
                태양계 수호대:<br/>별의 탄생
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed">
                어둠의 세력이 태양계의 빛을 훔쳐갔습니다.<br/>
                10개의 퀴즈를 풀어 지식을 되찾고,<br/>
                당신의 캐릭터를 <strong>전설의 수호신</strong>으로 진화시키세요!
              </p>
              <button 
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Play fill="currentColor" /> 모험 시작하기
              </button>
            </motion.div>
          )}

          {/* GAMEPLAY SCREEN */}
          {status === 'playing' && (
            <motion.div
              key={`q-${currentQIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl"
            >
              {/* Progress Bar (Top) */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-cyan-300 font-display text-xl">Mission {currentQIndex + 1} / {QUIZ_DATA.length}</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">현재 점수: {score}</span>
              </div>

              {/* Question Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-normal break-keep">
                  {currentQuestion.question}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(option)}
                      disabled={isProcessing}
                      className="p-4 rounded-xl text-left text-lg font-medium transition-all
                        bg-gradient-to-br from-indigo-900/50 to-purple-900/50 hover:from-indigo-600 hover:to-purple-600
                        border border-white/10 hover:border-cyan-300/50 shadow-lg group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold group-hover:bg-white/20 transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {status === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg text-center"
            >
              <CharacterDisplay score={score} totalQuestions={QUIZ_DATA.length} isEndGame={true} />

              <div className="mt-8 space-y-4">
                {score >= 8 ? (
                  <div className="p-6 bg-green-500/20 border border-green-500/30 rounded-2xl">
                    <h3 className="text-2xl font-display text-green-300 mb-2">🎉 임무 완수!</h3>
                    <p className="text-gray-200">태양계에 평화가 찾아왔습니다!<br/>당신은 진정한 수호자입니다.</p>
                  </div>
                ) : (
                  <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-2xl">
                    <h3 className="text-2xl font-display text-red-300 mb-2">⚠️ 임무 실패...</h3>
                    <p className="text-gray-200">빛이 아직 부족합니다.<br/>다시 도전하여 8개 이상의 별을 모으세요!</p>
                  </div>
                )}

                <button 
                  onClick={startGame}
                  className="w-full py-4 bg-white text-space-900 hover:bg-gray-200 rounded-xl text-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  <RotateCcw /> 다시 도전하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Character Footer (Only show during play or intro, hidden in result as it's shown larger) */}
      {status !== 'result' && (
        <CharacterDisplay score={score} totalQuestions={QUIZ_DATA.length} />
      )}
    </div>
  );
};

export default App;