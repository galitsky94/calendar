import React, { useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { Employee } from '../data/employees';
import CalendarDay from './CalendarDay';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import confetti from 'canvas-confetti';

const LayoffModal: React.FC = () => {
  const {
    openModal,
    setOpenModal,
    currentEmployee,
    remainingDays,
    revealedDays,
    bidOnPTO,
    signGoodbyeLetter
  } = useCalendar();

  if (!openModal) return null;

  // Get the correct employee photo or use a question mark for unrevealed days
  const getEmployeePhoto = (): string | undefined => {
    if (!currentEmployee) return undefined;

    // For days 1-4 with known employees, show their photos
    if (currentEmployee.id <= 4) {
      return `/faces/face${currentEmployee.id}.jpg`;
    }

    // For unrevealed days (5-25), we return undefined and will show a question mark
    return undefined;
  };

  // Fire confetti for revealed employees (days 1-4)
  useEffect(() => {
    if (openModal && currentEmployee && currentEmployee.id <= 4) {
      // Trigger confetti for revealed employees only
      const colors = ['#ffcdd2', '#c8e6c9', '#fff9c4', '#bbdefb'];

      const fireConfetti = () => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
          disableForReducedMotion: true
        });

        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
        }, 250);

        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });
        }, 400);
      };

      fireConfetti();
    }
  }, [openModal, currentEmployee]);

  if (!currentEmployee) return null;

  // Create share URL and message
  const shareUrl = window.location.href;
  const shareTitle = currentEmployee.id <= 4
    ? `Today, we say goodbye to ${currentEmployee.name} from the ${currentEmployee.department} department! #AdventLayoffCalendar`
    : "Another mystery employee has been laid off! #AdventLayoffCalendar";

  const shareDescription = currentEmployee.id <= 4
    ? `After ${currentEmployee.yearsOfService} years of service, ${currentEmployee.name} has been selected for the Advent Layoff Calendar. There are ${remainingDays} days left in the layoffs!`
    : `There are ${remainingDays} days left in the layoff advent calendar. Who will be next?`;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-overlay z-50">
      <div className="modal-content p-6 relative max-w-lg w-full">
        {/* Close button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-center text-[#1eb980] font-bold text-2xl pt-2 pb-6">
          ADVENT LAYOFF CALENDAR
        </h2>

        {/* Employee Avatar - prominently displayed */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg relative">
            {currentEmployee.id <= 4 ? (
              <img
                src={getEmployeePhoto()}
                alt={currentEmployee.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-600 font-bold">?</span>
              </div>
            )}
          </div>
        </div>

        {/* Announcement */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            {currentEmployee.id <= 4 ? (
              `Today, we say goodbye to ${currentEmployee.name}`
            ) : (
              'Today, we say goodbye to...'
            )}
          </h3>

          <p className="text-gray-600 text-lg mb-6">
            There are {remainingDays} days left in the layoff advent calendar.
            Next layoff drops tomorrow.
          </p>

          {/* Social Media Sharing */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="share-button-container">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <span className="text-xs text-gray-500 mt-1 block">Facebook</span>
            </div>

            <div className="share-button-container">
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <span className="text-xs text-gray-500 mt-1 block">Twitter</span>
            </div>

            <div className="share-button-container">
              <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareDescription}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <span className="text-xs text-gray-500 mt-1 block">LinkedIn</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <button
              onClick={bidOnPTO}
              className="btn-primary w-full"
            >
              {currentEmployee.id <= 4 ? (
                `Bid on ${currentEmployee.name}'s outstanding PTO`
              ) : (
                'Bid on outstanding PTO'
              )}
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

export default LayoffModal;
