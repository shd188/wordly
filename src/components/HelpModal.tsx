interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">How to Play</h2>
          <button
            onClick={onClose}
            className="text-[#787c7e] hover:text-[#1a1a1a] transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Game Rules */}
        <div className="space-y-6">
          <div>
            <p className="text-[#1a1a1a] mb-4">
              Guess the <strong>Wordly</strong> in 6 tries.
            </p>
            <ul className="text-[#1a1a1a] space-y-2 text-sm">
              <li>• Each guess must be a valid 5-letter word.</li>
              <li>• Hit the enter button to submit.</li>
              <li>• After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Examples</h3>

            {/* Example 1 - Correct letter */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <div className="w-10 h-10 border-2 border-[#6aaa64] bg-[#6aaa64] flex items-center justify-center text-white font-bold text-lg">
                  W
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  E
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  A
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  R
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  Y
                </div>
              </div>
              <p className="text-sm text-[#1a1a1a]">
                The letter <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>

            {/* Example 2 - Wrong position */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  P
                </div>
                <div className="w-10 h-10 border-2 border-[#c9b458] bg-[#c9b458] flex items-center justify-center text-white font-bold text-lg">
                  I
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  L
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  L
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  S
                </div>
              </div>
              <p className="text-sm text-[#1a1a1a]">
                The letter <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>

            {/* Example 3 - Not in word */}
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  V
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  A
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  G
                </div>
                <div className="w-10 h-10 border-2 border-[#787c7e] bg-[#787c7e] flex items-center justify-center text-white font-bold text-lg">
                  U
                </div>
                <div className="w-10 h-10 border-2 border-[#d3d6da] bg-white flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                  E
                </div>
              </div>
              <p className="text-sm text-[#1a1a1a]">
                The letter <strong>U</strong> is not in the word in any spot.
              </p>
            </div>
          </div>

          {/* Strategy Tips */}
          <div className="border-t border-[#d3d6da] pt-4">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Game Strategy Tips</h3>
            <ul className="text-[#1a1a1a] space-y-2 text-sm">
              <li>• Start with words containing common vowels (A, E, I, O, U) to quickly identify which vowels are in the target word.</li>
              <li>• Consider using words with repeated letters in later guesses to test for duplicate letters.</li>
              <li>• Pay attention to letter frequency - letters like S, T, R, N, and L appear more frequently in English words.</li>
              <li>• If you identify a correct letter but wrong position, try placing it in different positions in subsequent guesses.</li>
              <li>• Keep track of letters you've already tried to avoid repeating guesses with the same letters.</li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="border-t border-[#d3d6da] pt-4">
            <p className="text-sm text-[#787c7e] text-center">
              <strong>A new Wordly will be available each day!</strong>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
