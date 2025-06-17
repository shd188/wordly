import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
// 尝试不同的相对路径导入，可能文件路径有误
import GameModal from './GameModal';
import HelpModal from './HelpModal';
import { useWordleGame } from '../hooks/useWordleGame';

interface GameProps {
  onBackToHome: () => void;
}

export default function Game({ onBackToHome }: GameProps) {
  const {
    gameData,
    isAnimating,
    animatingRow,
    showInvalidWord,
    message,
    handleKeyPress,
    resetGame
  } = useWordleGame();

  const [showModal, setShowModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Show modal when game ends
  useEffect(() => {
    if (gameData.gameState !== 'playing') {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000); // Wait for animations to complete

      return () => clearTimeout(timer);
    }
  }, [gameData.gameState]);

  const handlePlayAgain = () => {
    setShowModal(false);
    resetGame();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get today's date and puzzle number
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const epoch = new Date('2021-06-19');
  const daysSinceEpoch = Math.floor((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Helmet>
        <title>Play Wordly - Daily Word Puzzle Game | Guess the 5-Letter Word</title>
        <meta name="description" content="Play today's Wordly puzzle! Guess the 5-letter word in 6 tries and track your statistics. Free online word game with daily challenges and unlimited gameplay." />
        <meta name="keywords" content="Wordly game, daily word puzzle, 5-letter word challenge, online word game, Wordle alternative, word guessing game" />
      </Helmet>
      {/* Header */}
      <header className="bg-white border-b border-[#d3d6da] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="text-[#787c7e] hover:text-[#1a1a1a] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Wordly Clone - Daily Word Puzzle Game</h1>
            <p className="text-xs text-[#787c7e]">{formattedDate} • No. {daysSinceEpoch}</p>
          </div>

          <button
            onClick={() => setShowHelpModal(true)}
            className="text-[#787c7e] hover:text-[#1a1a1a] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Message Display */}
      {message && (
        <div className="text-center py-2">
          <span className="inline-block bg-[#1a1a1a] text-white px-4 py-2 rounded-md text-sm font-medium">
            {message}
          </span>
        </div>
      )}

      {/* Game Board */}
      <div className="flex-1 flex flex-col justify-center py-4">
        <div className={showInvalidWord ? 'animate-shake' : ''}>
          <GameBoard
            guesses={gameData.guesses}
            currentGuess={gameData.currentGuess}
            currentRow={gameData.currentRow}
            targetWord={gameData.targetWord}
            isAnimating={isAnimating}
            animatingRow={animatingRow}
          />
        </div>
      </div>

      {/* Keyboard */}
      <div className="pb-safe">
        <Keyboard
          keyboardState={gameData.keyboardState}
          onKeyPress={handleKeyPress}
          disabled={gameData.gameState !== 'playing' || isAnimating}
        />
      </div>

      {/* Game Completion Modal */}
      <GameModal
        isOpen={showModal}
        gameState={gameData.gameState}
        targetWord={gameData.targetWord}
        guesses={gameData.guesses}
        stats={gameData.stats}
        onPlayAgain={handlePlayAgain}
        onClose={handleCloseModal}
      />

      {/* Help Modal */}
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
