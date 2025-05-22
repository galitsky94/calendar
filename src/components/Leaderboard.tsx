import React from 'react';
import { useCalendar } from '../context/CalendarContext';

const Leaderboard: React.FC = () => {
  const { leaderboard } = useCalendar();

  // If there are no PTO claims yet, show an empty state
  if (leaderboard.length === 0) {
    return (
      <div className="card p-6 rounded-xl shadow bg-white mb-6">
        <h3 className="text-xl font-bold text-[#1eb980] mb-4">PTO Vulture Leaderboard</h3>
        <div className="text-center py-6 text-gray-500">
          <p>No PTO has been claimed yet.</p>
          <p className="text-sm mt-2">Be the first to swoop in when a colleague is laid off!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 rounded-xl shadow bg-white mb-6">
      <h3 className="text-xl font-bold text-[#1eb980] mb-4">PTO Vulture Leaderboard</h3>

      <div className="overflow-hidden">
        <div className="grid grid-cols-12 pb-3 border-b border-gray-100">
          <div className="col-span-1 font-semibold text-gray-500">#</div>
          <div className="col-span-7 font-semibold text-gray-500">Name</div>
          <div className="col-span-4 font-semibold text-gray-500 text-right">PTO Days</div>
        </div>

        {leaderboard.map((entry, index) => (
          <div
            key={`leaderboard-${index}`}
            className={`grid grid-cols-12 py-3 border-b border-gray-50 ${index === 0 ? 'bg-yellow-50' : ''}`}
          >
            <div className="col-span-1 font-bold text-gray-700">
              {index + 1}
              {index === 0 && <span className="ml-1">🏆</span>}
              {index === 1 && <span className="ml-1">🥈</span>}
              {index === 2 && <span className="ml-1">🥉</span>}
            </div>
            <div className="col-span-7 font-medium text-gray-800">{entry.name}</div>
            <div className="col-span-4 font-bold text-right text-green-600">
              {entry.ptoClaimed} {entry.ptoClaimed === 1 ? 'day' : 'days'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 italic text-center">
        A true corporate vulture knows the best opportunities come from others' misfortune!
      </div>
    </div>
  );
};

export default Leaderboard;
