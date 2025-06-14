import type { KeyState } from '../types/game';
import { GAME_CONSTANTS } from '../types/game';

interface KeyboardProps {
  keyboardState: Record<string, KeyState>;
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

interface KeyProps {
  letter: string;
  state: KeyState;
  onClick: () => void;
  disabled?: boolean;
  isWide?: boolean;
}

function Key({ letter, state, onClick, disabled = false, isWide = false }: KeyProps) {
  const getKeyClasses = () => {
    const baseClasses = `font-semibold rounded-md transition-all duration-200 select-none cursor-pointer text-sm ${
      isWide ? 'px-3 py-3' : 'px-2 py-3'
    } ${isWide ? 'min-w-[4rem]' : 'min-w-[2.5rem]'} h-12 flex items-center justify-center`;

    if (disabled) {
      return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }

    switch (state) {
      case 'correct':
        return `${baseClasses} bg-[#6aaa64] hover:bg-[#5a9a54] text-white`;
      case 'present':
        return `${baseClasses} bg-[#c9b458] hover:bg-[#b9a448] text-white`;
      case 'absent':
        return `${baseClasses} bg-[#787c7e] hover:bg-[#686b6e] text-white`;
      default:
        return `${baseClasses} bg-[#d3d6da] hover:bg-[#c3c7ca] active:bg-[#b3b7ba] text-[#1a1a1a]`;
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={getKeyClasses()}
      onClick={handleClick}
      disabled={disabled}
    >
      {letter === 'BACKSPACE' ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
        </svg>
      ) : (
        letter
      )}
    </button>
  );
}

export default function Keyboard({ keyboardState, onKeyPress, disabled = false }: KeyboardProps) {
  return (
    <div className="px-4 pb-4">
      <div className="max-w-lg mx-auto space-y-2">
        {GAME_CONSTANTS.KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((key) => (
              <Key
                key={key}
                letter={key}
                state={keyboardState[key] || 'unused'}
                onClick={() => onKeyPress(key)}
                disabled={disabled}
                isWide={key === 'ENTER' || key === 'BACKSPACE'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
