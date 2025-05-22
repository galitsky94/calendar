import React from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import LayoffModal from './components/LayoffModal';
import Leaderboard from './components/Leaderboard';
import { CalendarProvider } from './context/CalendarContext';
import { employees } from './data/employees';

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

            {/* PTO Leaderboard */}
            <div className="mt-8">
              <Leaderboard />
            </div>

            {/* Team listing to match the screenshot */}
            <div className="card overflow-hidden rounded-xl shadow bg-white">
              {/* Ruby Brown */}
              <div className="border-b border-gray-100 p-4 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {/* Small avatar group */}
                  {[1, 2, 3].map((id) => (
                    <div key={`ruby-avatar-${id}`} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`/faces/face${id}.jpg`}
                        alt="Team member"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Ruby Brown</h3>
                  <div className="text-xs text-gray-400">Product Team</div>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl text-gray-400">&rarr;</span>
                </div>
              </div>

              {/* Barbara Millette */}
              <div className="p-4 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {/* Small avatar group - using the same faces */}
                  {[1, 2, 3].map((id) => (
                    <div key={`barbara-avatar-${id}`} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`/faces/face${id}.jpg`}
                        alt="Team member"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Barbara Millette</h3>
                  <div className="text-xs text-gray-400">Design Team</div>
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
