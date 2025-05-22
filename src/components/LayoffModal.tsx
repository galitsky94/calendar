import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { Employee } from '../data/employees';

const LayoffModal: React.FC = () => {
  const {
    openModal,
    setOpenModal,
    currentEmployee,
    remainingDays,
    bidOnPTO,
    signGoodbyeLetter
  } = useCalendar();

  if (!openModal || !currentEmployee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-center text-[#1eb980] font-bold text-2xl pt-2 pb-2">
          ADVENT LAYOFF CALENDAR
        </h2>

        {/* Calendar */}
        <div className="p-4 pb-0">
          <CalendarDisplay employee={currentEmployee} />
        </div>

        {/* Announcement */}
        <div className="p-4 pt-3 text-center">
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            Today, we say goodbye to {currentEmployee.name}
          </h3>

          <p className="text-gray-600 text-lg mb-8">
            There are {remainingDays} days left in the layoff advent calendar.
            Next layoff drops tomorrow.
          </p>

          {/* Action buttons */}
          <div className="space-y-4">
            <button
              onClick={bidOnPTO}
              className="btn-primary w-full"
            >
              Bid on {currentEmployee.name}'s outstanding PTO
            </button>

            <button
              onClick={signGoodbyeLetter}
              className="btn-secondary w-full"
            >
              Sign goodbye letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smaller calendar display for the modal
const CalendarDisplay: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
      <div className="grid grid-cols-7 text-xs font-medium mb-1 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Just a simplified display showing the current day */}
        {[...Array(7)].map((_, i) => (
          <div
            key={`mini-day-${i+1}`}
            className={`w-6 h-6 flex items-center justify-center rounded-full
              ${i+1 === employee.id ? 'bubble-red' : ''}`}
          >
            {i+1 === employee.id ? employee.id : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoffModal;
