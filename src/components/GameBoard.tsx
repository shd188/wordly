import Tile from './Tile';
import type { TileState } from '../types/game';
import { GAME_CONSTANTS } from '../types/game';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  currentRow: number;
  targetWord: string;
  isAnimating: boolean;
  animatingRow: number;
}

export default function GameBoard({
  guesses,
  currentGuess,
  currentRow,
  targetWord,
  isAnimating,
  animatingRow
}: GameBoardProps) {

  const getTileState = (rowIndex: number, colIndex: number, letter: string): TileState => {
    // If this is a completed guess row
    if (rowIndex < guesses.length) {
      const guess = guesses[rowIndex];
      const guessLetter = guess[colIndex];

      if (guessLetter === targetWord[colIndex]) {
        return 'correct';
      } else if (targetWord.includes(guessLetter)) {
        return 'present';
      } else {
        return 'absent';
      }
    }

    // If this is the current guess row
    if (rowIndex === currentRow) {
      if (colIndex < currentGuess.length) {
        return 'filled';
      }
    }

    return 'empty';
  };

  const getTileLetter = (rowIndex: number, colIndex: number): string => {
    // If this is a completed guess row
    if (rowIndex < guesses.length) {
      return guesses[rowIndex][colIndex] || '';
    }

    // If this is the current guess row
    if (rowIndex === currentRow) {
      return currentGuess[colIndex] || '';
    }

    return '';
  };

  return (
    <div className="grid grid-rows-6 gap-1.5 p-4 max-w-sm mx-auto">
      {Array.from({ length: GAME_CONSTANTS.MAX_GUESSES }, (_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: GAME_CONSTANTS.WORD_LENGTH }, (_, colIndex) => {
            const letter = getTileLetter(rowIndex, colIndex);
            const state = getTileState(rowIndex, colIndex, letter);
            const shouldAnimate = isAnimating && rowIndex === animatingRow;
            const animationDelay = shouldAnimate ? colIndex * 100 : 0;

            return (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                letter={letter}
                state={state}
                isAnimating={shouldAnimate}
                animationDelay={animationDelay}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
