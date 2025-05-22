import React, { useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import BiddingModal from './components/BiddingModal';
import GoodbyeLetterModal from './components/GoodbyeLetterModal';
import CoinTossModal from './components/CoinTossModal';
import MiseryModal from './components/MiseryModal';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  // Preload images
  useEffect(() => {
    // Preload face4.jpg as it's used in an animation
    const img4 = new Image();
    img4.src = '/faces/face4.jpg';

    // Preload face5.jpg and face6.jpg for the bidding modal
    const img5 = new Image();
    img5.src = '/faces/face5.jpg';
    img5.loading = 'eager';
    img5.decoding = 'async';

    const img6 = new Image();
    img6.src = '/faces/face6.jpg';
    img6.loading = 'eager';
    img6.decoding = 'async';
  }, []);

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <CalendarGrid />
          </div>
        </div>

        <LayoffModal />
        <BiddingModal />
        <GoodbyeLetterModal />
        <CoinTossModal />
        <MiseryModal />
      </div>
    </CalendarProvider>
  );
}

export default App;
