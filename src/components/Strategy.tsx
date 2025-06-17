import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface StrategyProps {
  onBackToHome: () => void;
}

export default function Strategy({ onBackToHome }: StrategyProps) {
  // 设置页面标题以优化SEO
  useEffect(() => {
    document.title = 'Wordly Game Strategy - Tips and Tricks for Daily Word Puzzles';
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-8">
      <Helmet>
        <title>Wordly Game Strategy Guide | Expert Tips for Daily Word Puzzles</title>
        <meta name="description" content="Master Wordly with our expert strategy guide. Learn optimal starting words, letter frequency analysis, advanced tactics, and common mistakes to avoid. Improve your daily puzzle success rate!" />
        <meta name="keywords" content="Wordly strategy, Wordle tips, word puzzle solutions, 5-letter word game strategies, Wordly starting words, letter frequency analysis" />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* 返回按钮 */}
        <button
          onClick={onBackToHome}
          className="text-[#787c7e] hover:text-[#1a1a1a] transition-colors mb-6 inline-flex items-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Game
        </button>

        {/* 策略页面标题 */}
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">Wordly Game Strategy Guide</h1>

        {/* 介绍段落 */}
        <p className="text-[#333] mb-8 leading-relaxed">
          Mastering Wordly requires a combination of vocabulary knowledge, strategic thinking, and pattern recognition. This guide will help you improve your guessing skills and increase your daily win streak with proven tactics used by top players.
        </p>

        {/* 主要策略部分 */}
        <div className="space-y-8">
          {/* 开始单词策略 */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4 text-green-600">1. Optimal Starting Words</h2>
            <p className="text-[#333] mb-3">The first guess is critical as it sets the foundation for your entire game. Ideal starting words should:</p>
            <ul className="list-disc pl-6 text-[#333] space-y-2 mb-4">
              <li>Contain 2-3 common vowels (A, E, I, O, U)</li>
              <li>Include high-frequency consonants (S, T, R, N, L)</li>
              <li>Avoid repeating letters</li>
            </ul>
            <p className="text-[#333] font-medium">Top recommended starting words:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['CRANE', 'SLATE', 'TRACE', 'SAUCE', 'ADIEU'].map(word => (
                <span key={word} className="bg-[#e9ecef] px-3 py-1 rounded-md text-sm font-medium">{word}</span>
              ))}
            </div>
          </section>

          {/* 字母频率策略 */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4 text-yellow-600">2. Letter Frequency Analysis</h2>
            <p className="text-[#333] mb-4">English language letter frequency can guide your guesses. Most common letters in 5-letter words:</p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['S', 'E', 'A', 'R', 'O', 'I', 'L', 'T', 'N', 'C'].map(letter => (
                <div key={letter} className="bg-[#f8f9fa] text-center py-2 rounded-md font-medium">{letter}</div>
              ))}
            </div>
            <p className="text-[#333] text-sm italic">*Based on analysis of over 5,000 common 5-letter English words</p>
          </section>

          {/* 高级策略 */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4 text-blue-600">3. Advanced Tactics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Elimination Strategy</h3>
                <p className="text-[#333]">Use your first two guesses to eliminate as many letters as possible, rather than trying to guess the word immediately. This maximizes information gain for subsequent guesses.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Pattern Recognition</h3>
                <p className="text-[#333]">Look for common word patterns and letter combinations. For example, "ATION", "ING", "TION", and "ABLE" are common suffixes in English words.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Duplicate Letters</h3>
                <p className="text-[#333]">After your first two guesses, consider words with repeated letters (like "BALLS" or "WHEEL") if you suspect duplicates based on previous feedback.</p>
              </div>
            </div>
          </section>

          {/* 常见错误 */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4 text-red-600">4. Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 text-[#333] space-y-2">
              <li>Using obscure words that aren't in the Wordly dictionary</li>
              <li>Guessing words with letters you already know are not in the target word</li>
              <li>Focusing on specific positions too early</li>
              <li>Ignoring yellow letters (correct letters in wrong positions)</li>
            </ul>
          </section>
        </div>

        {/* 底部CTA */}
        <div className="mt-12 pt-6 border-t border-[#d3d6da] text-center">
          <p className="text-[#333] mb-4">Ready to test these strategies?</p>
          <button
            onClick={onBackToHome}
            className="bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Play Today's Wordly
          </button>
        </div>
      </div>

      {/* 相关资源 */}
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="#" className="text-blue-600 hover:underline flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>
            Wordly Dictionary: Valid 5-Letter Words
          </a>
          <a href="#" className="text-blue-600 hover:underline flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            Wordly Statistics Tracker
          </a>
        </div>
      </div>
    </div>
  );
}