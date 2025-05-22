import React, { useState, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import confetti from 'canvas-confetti';

const CoinTossModal: React.FC = () => {
  const { coinTossOpen, closeCoinToss, coinResult } = useCalendar();
  const [flipping, setFlipping] = useState(false);
  const [displayResult, setDisplayResult] = useState<boolean>(false);
  const [flipCount, setFlipCount] = useState(0);
  const [finalSide, setFinalSide] = useState<'heads' | 'tails' | null>(null);

  // Animation for the coin toss
  useEffect(() => {
    if (coinTossOpen && coinResult && !flipping) {
      // Start flipping animation when modal opens
      setDisplayResult(false);
      setFlipping(true);
      setFlipCount(0);
      setFinalSide(null);

      // Animate coin flips
      const flipDuration = 2000; // 2 seconds of flipping
      const flipInterval = 150; // Each flip takes 150ms
      const totalFlips = Math.floor(flipDuration / flipInterval);

      let currentFlip = 0;
      const flipTimer = setInterval(() => {
        currentFlip++;
        setFlipCount(prev => prev + 1);

        if (currentFlip >= totalFlips) {
          // Flipping complete
          clearInterval(flipTimer);
          setFlipping(false);
          setDisplayResult(true);

          // Set final side based on the last flip count
          // If heads shows when flipping ends (even count), but coinResult is tails
          // or if tails shows (odd count) but coinResult is heads
          // we need to flip once more
          const needsOneMoreFlip =
            (flipCount % 2 === 0 && coinResult === 'tails') ||
            (flipCount % 2 === 1 && coinResult === 'heads');

          if (needsOneMoreFlip) {
            setFlipCount(prev => prev + 1);
          }

          // Store the final side that's actually showing
          setFinalSide(coinResult);

          // Trigger confetti only for "heads" (keep your job)
          if (coinResult === 'heads') {
            const colors = ['#59CD90', '#83D483', '#C6E377', '#FFFFEA'];
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: colors,
              disableForReducedMotion: true
            });
          }
        }
      }, flipInterval);

      return () => clearInterval(flipTimer);
    }
  }, [coinTossOpen, coinResult]);

  // Determine what's actually showing based on flip count
  // Even flip count = heads side ("SAVED")
  // Odd flip count = tails side ("FIRED")
  const shownSide = flipCount % 2 === 0 ? 'heads' : 'tails';

  // Calculate the appropriate text and color based on what's actually SHOWING
  // not the internal coinResult variable
  const isSaved = !displayResult ? null : (shownSide === 'heads');

  if (!coinTossOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative max-w-md w-full overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d6ecff]/30 via-[#ffd6e0]/20 to-[#fff5d6]/30 rounded-xl animate-gradient"></div>

        {/* Content with backdrop blur */}
        <div className="relative z-10 backdrop-blur-sm bg-white/80 rounded-xl p-6">
          {/* Close button */}
          <button
            onClick={closeCoinToss}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#82b1ff]">Coin Toss</h2>
            {flipping && (
              <p className="text-gray-600 mt-2">
                Flipping the coin of fate...
              </p>
            )}
          </div>

          {/* Coin */}
          <div className="flex justify-center mb-8">
            <div
              className={`relative w-48 h-48 rounded-full shadow-lg transition-transform duration-150
                ${flipping ? 'animate-flip' : ''}`}
              style={{
                transform: `rotateY(${flipCount % 2 === 0 ? '0deg' : '180deg'})`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease'
              }}
            >
              {/* Heads side - SAVED */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="mt-2 text-xl font-bold text-yellow-800">SAVED</span>
                </div>
              </div>

              {/* Tails side - FIRED */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-300 to-red-500 rounded-full flex items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="mt-2 text-xl font-bold text-red-800">FIRED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          {!flipping && displayResult && (
            <div className={`text-center mt-8 p-4 rounded-lg ${isSaved ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-gray-800 text-lg font-bold">
                {isSaved
                  ? "Safe! Consider yourself lucky... for now."
                  : "Sorry, you've been fired, but we can help you update your LinkedIn..."}
              </p>
            </div>
          )}

          {/* Action button */}
          <div className="mt-6 text-center">
            <button
              onClick={closeCoinToss}
              className={`${
                isSaved
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={flipping}
            >
              {flipping ? "Flipping..." : (isSaved ? "Get back to work" : "I fucking knew it")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinTossModal;
