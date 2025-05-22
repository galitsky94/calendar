import React from 'react';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  return (
    <CalendarProvider>
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
