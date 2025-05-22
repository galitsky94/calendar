import React, { useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import BiddingModal from './components/BiddingModal';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  // Preload images
  useEffect(() => {
    // Preload face4.jpg as it's used in an animation
    const img4 = new Image();
    img4.src = '/faces/face4.jpg';
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
      </div>
    </CalendarProvider>
  );
}

export default App;
