import { useState } from 'react';
import type { GameStats, GameState } from '../types/game';
import { generateShareText, copyToClipboard, getPuzzleNumber } from '../utils/shareUtils';

interface GameModalProps {
  isOpen: boolean;
  gameState: GameState;
  targetWord: string;
  guesses: string[];
  stats: GameStats;
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function GameModal({
  isOpen,
  gameState,
  targetWord,
  guesses,
  stats,
  onPlayAgain,
  onClose
}: GameModalProps) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
  const gameWon = gameState === 'won';
  const guessCount = gameWon ? guesses.length : 'X';

  const handleShare = async () => {
    setShareStatus('copying');
    const puzzleNumber = getPuzzleNumber();
    const shareText = generateShareText(puzzleNumber, guesses, targetWord, gameWon);

    const success = await copyToClipboard(shareText);
    if (success) {
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } else {
      setShareStatus('idle');
      // Fallback: show the text in an alert
      alert('Share text copied to clipboard:\n\n' + shareText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
            {gameState === 'won' ? 'Congratulations!' : 'Game Over'}
          </h2>
          {gameState === 'won' ? (
            <p className="text-[#787c7e]">You guessed it in {guessCount} tries!</p>
          ) : (
            <p className="text-[#787c7e]">
              The word was: <span className="font-bold text-[#1a1a1a]">{targetWord}</span>
            </p>
          )}
        </div>

        {/* Statistics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 text-center">Statistics</h3>

          <div className="grid grid-cols-4 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">{stats.gamesPlayed}</div>
              <div className="text-xs text-[#787c7e]">Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">{winRate}</div>
              <div className="text-xs text-[#787c7e]">Win %</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">{stats.currentStreak}</div>
              <div className="text-xs text-[#787c7e]">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">{stats.maxStreak}</div>
              <div className="text-xs text-[#787c7e]">Max Streak</div>
            </div>
          </div>

          {/* Guess Distribution */}
          <div>
            <h4 className="text-sm font-medium text-[#1a1a1a] mb-2">Guess Distribution</h4>
            <div className="space-y-1">
              {stats.guessDistribution.map((count, index) => {
                const maxCount = Math.max(...stats.guessDistribution);
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

                return (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-[#1a1a1a] w-4">{index + 1}</span>
                    <div className="flex-1 bg-gray-200 rounded">
                      <div
                        className="bg-[#6aaa64] text-white text-xs px-2 py-1 rounded text-right min-w-[2rem]"
                        style={{ width: `${Math.max(percentage, 8)}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div className="mb-4">
          <button
            onClick={handleShare}
            disabled={shareStatus === 'copying'}
            className="w-full bg-[#6aaa64] hover:bg-[#5a9a54] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {shareStatus === 'copying' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Copying...
              </>
            ) : shareStatus === 'copied' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
                Share
              </>
            )}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#1a1a1a] font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
