import React, { useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  // Preload images, prioritizing the third one
  useEffect(() => {
    // Prioritize the third image loading
    const img3 = new Image();
    img3.src = '/faces/face3.jpg';

    // Preload other images with a slight delay
    setTimeout(() => {
      const img1 = new Image();
      img1.src = '/faces/face1.jpg';

      const img2 = new Image();
      img2.src = '/faces/face2.jpg';

      const img4 = new Image();
      img4.src = '/faces/face4.jpg';
    }, 100);
  }, []);

  return (
    <CalendarProvider>
      {/* Hidden div for preloading images */}
      <div className="hidden">
        <img src="/faces/face3.jpg" alt="Preload 3" />
      </div>
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <CalendarGrid />
          </div>
        </div>

        <LayoffModal />
      </div>
    </CalendarProvider>
  );
}

export default App;
