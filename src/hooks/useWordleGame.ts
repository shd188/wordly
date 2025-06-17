import { useState, useEffect, useCallback } from 'react';
import type { GameData, GameState, KeyState } from '../types/game';
import { GAME_CONSTANTS } from '../types/game';
import { getTodaysWord, isValidWord } from '../data/words';

const STORAGE_KEY = 'Wordly-game-data';
const STATS_KEY = 'Wordly-stats';

export const useWordleGame = () => {
  const [gameData, setGameData] = useState<GameData>(() => {
    // Initialize with a fresh game
    return {
      targetWord: getTodaysWord(),
      guesses: [],
      currentGuess: '',
      gameState: 'playing',
      currentRow: 0,
      keyboardState: {},
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: [0, 0, 0, 0, 0, 0]
      }
    };
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingRow, setAnimatingRow] = useState(-1);
  const [showInvalidWord, setShowInvalidWord] = useState(false);
  const [message, setMessage] = useState('');

  // Load saved game and stats on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Check if it's today's game
        if (parsed.targetWord === getTodaysWord()) {
          setGameData(prev => ({
            ...parsed,
            stats: savedStats ? JSON.parse(savedStats) : prev.stats
          }));
          return;
        }
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }

    // Load just stats if no valid game data
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setGameData(prev => ({ ...prev, stats: parsedStats }));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // Save game data when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    localStorage.setItem(STATS_KEY, JSON.stringify(gameData.stats));
  }, [gameData]);

  const updateKeyboardState = useCallback((guess: string, targetWord: string) => {
    const newKeyboardState: Record<string, KeyState> = { ...gameData.keyboardState };

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const currentState = newKeyboardState[letter];

      // Don't downgrade a key state
      if (currentState === 'correct') continue;

      if (letter === targetWord[i]) {
        newKeyboardState[letter] = 'correct';
      } else if (targetWord.includes(letter) && (currentState === 'unused' || currentState === 'present' || currentState === 'absent')) {
        newKeyboardState[letter] = 'present';
// 原比较可能存在问题，根据提示进行修改，避免无意义的类型比较
      } else {
        newKeyboardState[letter] = 'absent';
      }
    }

    return newKeyboardState;
  }, [gameData.keyboardState]);

  const checkGameEnd = useCallback((newGuesses: string[], targetWord: string): GameState => {
    const lastGuess = newGuesses[newGuesses.length - 1];

    if (lastGuess === targetWord) {
      return 'won';
    }

    if (newGuesses.length >= GAME_CONSTANTS.MAX_GUESSES) {
      return 'lost';
    }

    return 'playing';
  }, []);

  const updateStats = useCallback((gameState: GameState, guessCount: number) => {
    setGameData(prev => {
      const newStats = { ...prev.stats };
      newStats.gamesPlayed++;

      if (gameState === 'won') {
        newStats.gamesWon++;
        newStats.currentStreak++;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.guessDistribution[guessCount - 1]++;
      } else if (gameState === 'lost') {
        newStats.currentStreak = 0;
      }

      return { ...prev, stats: newStats };
    });
  }, []);

  const submitGuess = useCallback(() => {
    if (gameData.currentGuess.length !== GAME_CONSTANTS.WORD_LENGTH) {
      setMessage('Not enough letters');
      return;
    }

    if (!isValidWord(gameData.currentGuess)) {
      setMessage('Not in word list');
      setShowInvalidWord(true);
      setTimeout(() => setShowInvalidWord(false), 500);
      return;
    }

    setMessage('');
    setIsAnimating(true);
    setAnimatingRow(gameData.currentRow);

    setTimeout(() => {
      setGameData(prev => {
        const newGuesses = [...prev.guesses, prev.currentGuess];
        const newKeyboardState = updateKeyboardState(prev.currentGuess, prev.targetWord);
        const newGameState = checkGameEnd(newGuesses, prev.targetWord);

        if (newGameState !== 'playing') {
          updateStats(newGameState, newGuesses.length);
        }

        return {
          ...prev,
          guesses: newGuesses,
          currentGuess: '',
          currentRow: prev.currentRow + 1,
          keyboardState: newKeyboardState,
          gameState: newGameState
        };
      });

      setIsAnimating(false);
      setAnimatingRow(-1);
    }, 600);
  }, [gameData.currentGuess, gameData.currentRow, gameData.guesses, gameData.targetWord, updateKeyboardState, checkGameEnd, updateStats]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameData.gameState !== 'playing' || isAnimating) return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      setGameData(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }));
    } else if (key.length === 1 && key.match(/[A-Z]/)) {
      if (gameData.currentGuess.length < GAME_CONSTANTS.WORD_LENGTH) {
        setGameData(prev => ({
          ...prev,
          currentGuess: prev.currentGuess + key
        }));
      }
    }
  }, [gameData.gameState, gameData.currentGuess, isAnimating, submitGuess]);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      event.preventDefault();

      if (event.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (event.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (event.key.match(/^[a-zA-Z]$/)) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeyPress]);

  const resetGame = useCallback(() => {
    setGameData(prev => ({
      targetWord: getTodaysWord(),
      guesses: [],
      currentGuess: '',
      gameState: 'playing',
      currentRow: 0,
      keyboardState: {},
      stats: prev.stats // Keep stats
    }));
    setMessage('');
  }, []);

  return {
    gameData,
    isAnimating,
    animatingRow,
    showInvalidWord,
    message,
    handleKeyPress,
    resetGame
  };
};
