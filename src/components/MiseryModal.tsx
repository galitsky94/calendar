import React from 'react';
import { useCalendar } from '../context/CalendarContext';

const MiseryModal: React.FC = () => {
  const { miseryModalOpen, closeMiseryModal } = useCalendar();

  if (!miseryModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative max-w-md w-full overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-300/30 via-red-500/20 to-red-700/30 rounded-xl animate-gradient"></div>

        {/* Content with backdrop blur */}
        <div className="relative z-10 backdrop-blur-sm bg-white/80 rounded-xl p-6">
          {/* Close button */}
          <button
            onClick={closeMiseryModal}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header and Message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              Your lack of optimism has been noted. HR would like to see you... with your belongings.
            </h2>

            <div className="text-7xl my-6">
              ☝️
            </div>

            <p className="text-gray-600 text-sm italic mt-4">
              Negative employees like you are bad for company morale during our festive layoff season.
            </p>
          </div>

          {/* Action button */}
          <div className="mt-6 text-center">
            <button
              onClick={closeMiseryModal}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Accept your misery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiseryModal;
