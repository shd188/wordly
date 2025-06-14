import type { TileState } from '../types/game';

interface TileProps {
  letter: string;
  state: TileState;
  isAnimating?: boolean;
  animationDelay?: number;
}

export default function Tile({ letter, state, isAnimating = false, animationDelay = 0 }: TileProps) {
  const getTileClasses = () => {
    const baseClasses = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-300';

    switch (state) {
      case 'empty':
        return `${baseClasses} bg-white border-[#d3d6da] text-[#1a1a1a]`;
      case 'filled':
        return `${baseClasses} bg-white border-[#878a8c] text-[#1a1a1a] scale-110`;
      case 'correct':
        return `${baseClasses} bg-[#6aaa64] border-[#6aaa64] text-white`;
      case 'present':
        return `${baseClasses} bg-[#c9b458] border-[#c9b458] text-white`;
      case 'absent':
        return `${baseClasses} bg-[#787c7e] border-[#787c7e] text-white`;
      default:
        return `${baseClasses} bg-white border-[#d3d6da] text-[#1a1a1a]`;
    }
  };

  const animationStyle = isAnimating ? {
    animationDelay: `${animationDelay}ms`,
    animationDuration: '600ms',
    animationFillMode: 'both'
  } : {};

  return (
    <div
      className={`${getTileClasses()} ${isAnimating ? 'animate-flip' : ''}`}
      style={animationStyle}
    >
      {letter}
    </div>
  );
}
