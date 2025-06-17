# Wordle Clone - Daily Word Puzzle Game

A modern, open-source implementation of the popular word puzzle game Wordle. Challenge your vocabulary and strategic thinking with a new 5-letter word every day!

## 🎮 Game Features

- **Daily Challenges**: A new word puzzle available each day at midnight UTC
- **Color-Coded Feedback**: Green (correct letter, correct position), Yellow (correct letter, wrong position), Gray (letter not in word)
- **Keyboard Support**: Play using your physical keyboard for faster input
- **Responsive Design**: Enjoy on desktop, tablet, and mobile devices
- **Game Statistics**: Track your win streak and guess distribution
- **Share Results**: Easily share your daily results with friends

## 📝 How to Play

1. Guess the 5-letter word in 6 attempts
2. Each guess must be a valid English word
3. After each guess, the color of the tiles will change to show how close your guess was to the word:
   - 🟩 Green: The letter is correct and in the right position
   - 🟨 Yellow: The letter is correct but in the wrong position
   - ⬜ Gray: The letter is not in the word
4. A new word will be available tomorrow, so check back daily to maintain your streak!

## 💡 Strategy Tips

- Start with words containing common vowels (A, E, I, O, U) to quickly identify which vowels are in the target word
- Consider using words with repeated letters in later guesses to test for duplicates
- Pay attention to letter frequency - letters like S, T, R, N, and L appear more frequently in English words
- Keep track of letters you've already tried to avoid repeating guesses

## 🛠️ Technical Implementation

Built with React, TypeScript, and Vite for optimal performance. The game state is managed with custom hooks, and the UI is styled with Tailwind CSS for a clean, modern look.

## 🔄 Daily Updates

The game features a new word every 24 hours, ensuring fresh challenges for regular players. The word list is carefully curated to provide an optimal level of difficulty for all players.

## 📱 Supported Devices

The game works on all modern browsers and devices, including:
- Desktop (Chrome, Firefox, Safari, Edge)
- iOS (iPhone, iPad)
- Android (phones and tablets)

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request with improvements, bug fixes, or new features.
