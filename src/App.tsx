import React from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-[#f8f7f4]">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#1eb980] mb-4 text-center">
              ADVENT LAYOFF CALENDAR
            </h2>
            <CalendarGrid />

            {/* Team listing placeholder to match the screenshot */}
            <div className="card overflow-hidden">
              <div className="border-b border-gray-100 p-4 flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-4">
                  <img src="/employee-avatars.png" alt="Ruby" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Ruby Brown</h3>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl text-gray-400">&rarr;</span>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-4">
                  <img src="/employee-avatars.png" alt="Barbara" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Barbara Millette</h3>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl text-gray-400">&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LayoffModal />
      </div>
    </CalendarProvider>
  );
}

export default App;
