export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent';

export type KeyState = 'unused' | 'correct' | 'present' | 'absent';

export type GameState = 'playing' | 'won' | 'lost';

export interface Tile {
  letter: string;
  state: TileState;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // Index 0 = 1 guess, Index 5 = 6 guesses
}

export interface GameData {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  gameState: GameState;
  currentRow: number;
  keyboardState: Record<string, KeyState>;
  stats: GameStats;
}

export const GAME_CONSTANTS = {
  MAX_GUESSES: 6,
  WORD_LENGTH: 5,
  KEYBOARD_ROWS: [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ]
};
