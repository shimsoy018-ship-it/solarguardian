
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play, Stars, Volume2, VolumeX } from 'lucide-react';
import StarBackground from './components/StarBackground';
import CharacterDisplay from './components/CharacterDisplay';
import Effects from './components/Effects';
import CharacterIcon from './components/CharacterIcon';
import { QUIZ_DATA } from './data/quizData';
import { GameStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentQuestion = QUIZ_DATA[currentQIndex];

  // BGM 자동 재생 시도 및 사용자 인터랙션 감지
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && !isMuted) {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.log("자동 재생이 차단되었습니다. 사용자 상호작용이 필요합니다.");
        }
      }
    };

    // 마운트 시 재생 시도
    playAudio();

    // 브라우저 정책으로 자동 재생 실패 시, 첫 클릭에 재생하도록 설정
    const handleUserInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("재생 실패:", e));
      }
    }
  };

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
      
      {/* Background Music Audio Element */}
      {/* 우주 분위기의 무료 BGM 사용 */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=music-for-video-universe-space-114441.mp3" 
      />

      {/* Sound Toggle Button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all text-white shadow-lg"
        aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-32 z-10 w-full max-w-4xl mx-auto">
        
        <AnimatePresence mode="wait">
          {status === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center bg-space-800/80 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 shadow-2xl max-w-lg w-full"
            >
              <div className="mb-8 flex justify-center">
                 <CharacterIcon stage="god" size={120} />
              </div>
              <h1 className="text-5xl md:text-6xl font-display mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-orange-200">
                태양계 수호대
              </h1>
              <p className="text-xl text-blue-300 font-display mb-6 tracking-widest uppercase">별의 탄생</p>
              
              <div className="text-gray-300 mb-10 leading-relaxed text-lg space-y-2">
                <p>어둠의 세력이 태양계의 지식을 훔쳐갔습니다.</p>
                <p>10개의 퀴즈를 풀어 별의 힘을 되찾고,</p>
                <p>당신의 수호대를 <strong className="text-orange-400">전설의 수호신</strong>으로 진화시키세요!</p>
              </div>

              <button 
                onClick={startGame}
                className="w-full py-5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 rounded-2xl text-2xl font-display transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(251,146,60,0.4)] flex items-center justify-center gap-3"
              >
                <Play fill="currentColor" size={28} /> 모험 시작하기
              </button>
            </motion.div>
          )}

          {status === 'playing' && (
            <motion.div
              key={`q-${currentQIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-3xl"
            >
              <div className="flex justify-between items-center mb-6 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-display border border-cyan-500/30">
                    {currentQIndex + 1}
                  </div>
                  <span className="text-cyan-300 font-display text-2xl">Mission</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Stars size={18} className="text-yellow-400" />
                  <span className="font-bold">획득 점수: {score}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-snug break-keep text-center">
                  {currentQuestion.question}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(option)}
                      disabled={isProcessing}
                      className="p-5 rounded-2xl text-left text-lg font-medium transition-all
                        bg-white/5 hover:bg-white/20 border border-white/10 hover:border-cyan-400/50 shadow-lg group flex items-center gap-4"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold group-hover:bg-cyan-500/40 transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {status === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl text-center"
            >
              <CharacterDisplay score={score} totalQuestions={QUIZ_DATA.length} isEndGame={true} />

              <div className="mt-8 space-y-4">
                {score >= 8 ? (
                  <div className="p-8 bg-orange-500/20 border border-orange-500/30 rounded-3xl shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                    <h3 className="text-3xl font-display text-orange-400 mb-3">🎉 전설의 귀환!</h3>
                    <p className="text-blue-100 text-lg">태양계가 다시 밝게 빛나기 시작했습니다.<br/>당신은 진정한 우주의 수호자입니다!</p>
                  </div>
                ) : (
                  <div className="p-8 bg-blue-500/20 border border-blue-500/30 rounded-3xl">
                    <h3 className="text-3xl font-display text-blue-300 mb-3">🌌 아직은 성장이 필요합니다</h3>
                    <p className="text-blue-100 text-lg">태양계의 어둠을 걷어내기엔 지식이 조금 부족해요.<br/>다시 도전하여 더 밝은 빛을 모아주세요!</p>
                  </div>
                )}

                <button 
                  onClick={startGame}
                  className="w-full py-5 bg-white text-space-900 hover:bg-blue-50 rounded-2xl text-2xl font-display transition-all shadow-xl flex items-center justify-center gap-3 mt-6 active:scale-95"
                >
                  <RotateCcw size={24} /> 운명 개척하기 (재도전)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status !== 'result' && (
        <CharacterDisplay score={score} totalQuestions={QUIZ_DATA.length} />
      )}
    </div>
  );
};

export default App;
