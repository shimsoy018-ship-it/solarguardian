
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

interface Props {
  type: 'correct' | 'incorrect' | null;
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

const Effects: React.FC<Props> = ({ type, correctAnswer, explanation, onNext, isLastQuestion }) => {
  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`relative w-full max-w-lg rounded-3xl p-1 shadow-2xl ${
              type === 'correct' 
                ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
                : 'bg-gradient-to-br from-red-400 to-orange-600'
            }`}
          >
            <div className="bg-space-900 rounded-[1.3rem] p-6 md:p-8 h-full">
              {/* Header Icon & Title */}
              <div className="flex flex-col items-center mb-6">
                {type === 'correct' ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <CheckCircle2 size={48} className="text-green-400" />
                    </div>
                    <h2 className="text-3xl font-display text-green-400">정답입니다!</h2>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                      <XCircle size={48} className="text-red-400" />
                    </div>
                    <h2 className="text-3xl font-display text-red-400">아쉽네요...</h2>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6 mb-8">
                {type === 'incorrect' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-sm text-red-300 font-bold mb-1">정답</p>
                    <p className="text-xl text-white font-medium">{correctAnswer}</p>
                  </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2 text-blue-300">
                    <BookOpen size={18} />
                    <span className="font-bold text-sm">해설</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-lg break-keep">
                    {explanation}
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={onNext}
                className={`w-full py-4 rounded-xl text-xl font-display flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                  type === 'correct'
                    ? 'bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-900/50'
                    : 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-900/50'
                }`}
              >
                {isLastQuestion ? '결과 확인하기' : '다음 문제'} <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Effects;
