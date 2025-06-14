interface WelcomeProps {
  onStartGame: () => void;
}

export default function Welcome({ onStartGame }: WelcomeProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate puzzle number (days since Wordle epoch)
  const epoch = new Date('2021-06-19');
  const daysSinceEpoch = Math.floor((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  const puzzleNumber = daysSinceEpoch;

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Wordle Logo */}
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
          Wordle
        </h1>

        {/* Subtitle */}
        <h2  className="text-lg text-[#787c7e] mb-8 font-medium">
          Get 6 chances to guess a 5-letter word.
        </h2>

        {/* Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={onStartGame}
            className="w-full bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-lg"
          >
            Play
          </button>

          {/* <div className="grid grid-cols-2 gap-3">
            <button className="bg-white hover:bg-gray-50 text-[#1a1a1a] font-medium py-2 px-4 rounded-md border border-[#d3d6da] transition-colors duration-200">
              Subscribe
            </button>
            <button className="bg-white hover:bg-gray-50 text-[#1a1a1a] font-medium py-2 px-4 rounded-md border border-[#d3d6da] transition-colors duration-200">
              Log in
            </button>
          </div> */}
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
            Edited by Tracy Bennett
          </p>
        </div>
      </div>
    </div>
  );
}
