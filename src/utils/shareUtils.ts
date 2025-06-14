import { GAME_CONSTANTS } from '../types/game';

export const generateShareText = (
  gameNumber: number,
  guesses: string[],
  targetWord: string,
  gameWon: boolean
): string => {
  const guessCount = gameWon ? guesses.length : 'X';
  const maxGuesses = GAME_CONSTANTS.MAX_GUESSES;

  let shareText = `Wordle ${gameNumber} ${guessCount}/${maxGuesses}\n\n`;

  // Generate emoji grid
  guesses.forEach(guess => {
    let row = '';
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (letter === targetWord[i]) {
        row += '🟩'; // Green - correct position
      } else if (targetWord.includes(letter)) {
        row += '🟨'; // Yellow - wrong position
      } else {
        row += '⬛'; // Black - not in word
      }
    }
    shareText += row + '\n';
  });

  return shareText.trim();
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const getPuzzleNumber = (): number => {
  const today = new Date();
  const epoch = new Date('2021-06-19'); // Wordle epoch
  const daysSinceEpoch = Math.floor((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceEpoch;
};
