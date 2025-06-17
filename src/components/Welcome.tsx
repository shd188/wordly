import React from 'react';
import { Helmet } from 'react-helmet-async';

interface WelcomeProps {
  onStartGame: () => void;
  onNavigateToStrategy: () => void;
}

export default function Welcome({ onStartGame, onNavigateToStrategy }: WelcomeProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate puzzle number (days since Wordly epoch)
  const epoch = new Date('2021-06-19');
  const daysSinceEpoch = Math.floor((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  const puzzleNumber = daysSinceEpoch;

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <Helmet>
        <title>Wordly - Daily Word Puzzle Game | Free Online Wordle Clone</title>
        <meta name="description" content="Play Wordly, the free daily word puzzle game inspired by Wordle. Guess the 5-letter word in 6 tries with unlimited gameplay. No account required - start playing today!" />
        <meta name="keywords" content="Wordly, Wordle clone, daily word puzzle, free online word game, 5-letter word game, word guessing game" />
      </Helmet>
      <div className="max-w-md w-full text-center">
        {/* Wordly Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1">
              {/* W */}
              <div className="w-2 h-2 bg-[#6aaa64] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#c9b458] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#787c7e] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#6aaa64] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#c9b458] rounded-sm"></div>

              {/* O */}
              <div className="w-2 h-2 bg-[#c9b458] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#6aaa64] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#787c7e] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#c9b458] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#6aaa64] rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 tracking-wide">
          Wordly
        </h1>

        {/* Subtitle */}
        <h2  className="text-lg text-[#787c7e] mb-4 font-medium">
          Get 6 chances to guess a 5-letter word.
        </h2>

        {/* Game Introduction */}
        <p className="text-[#333] mb-4 text-sm leading-relaxed max-w-md mx-auto">
          Wordly is a popular word puzzle game that challenges your vocabulary and strategic thinking. Each day brings a new 5-letter word to solve, with color-coded feedback to guide your guesses. Track your progress and improve your skills as you play daily.
        </p>

        {/* About Section */}
        <div className="bg-[#f0f0f0] rounded-lg p-4 text-sm text-[#555] mb-8 max-w-md mx-auto">
          <p className="mb-2"><strong>About This Game:</strong> This is a fan-made Wordly created to provide the same great word puzzle experience with additional features and improvements.</p>
          <p>New puzzles are released daily at midnight UTC. No account is required to play - just start guessing and enjoy!</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={onStartGame}
            className="w-full bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-lg"
          >
            Play
          </button>

          <button
            onClick={onNavigateToStrategy}
            className="w-full bg-white hover:bg-gray-50 text-[#1a1a1a] font-medium py-3 px-6 rounded-md border border-[#d3d6da] transition-colors duration-200"
          >
            Game Strategy Guide
          </button>
        </div>

        {/* Date and Puzzle Info */}
        <div className="text-center text-[#787c7e]">
          <h3 className="text-lg font-medium text-[#1a1a1a] mb-1">
            {formattedDate}
          </h3>
          <p className="text-sm mb-1">
            No. {puzzleNumber}
          </p>
          <p className="text-sm">
            Edited by Heidi
          </p>
        </div>
      </div>
    </div>
  );
}
