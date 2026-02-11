export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string; // The correct answer string
  explanation: string;
}

export type GameStatus = 'intro' | 'playing' | 'result';

export type CharacterStage = 'egg' | 'baby' | 'knight' | 'god';

export interface EvolutionStage {
  stage: CharacterStage;
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  description: string;
}