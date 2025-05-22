import React from 'react';
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

  if (!openModal || !currentEmployee) return null;

  // Create share URL and message
  const shareUrl = window.location.href;
  const shareTitle = `Today, we say goodbye to ${currentEmployee.name} from the ${currentEmployee.department} department! #AdventLayoffCalendar`;
  const shareDescription = `After ${currentEmployee.yearsOfService} years of service, ${currentEmployee.name} has been selected for the Advent Layoff Calendar. There are ${remainingDays} days left in the layoffs!`;

  // Get avatar URL based on employee ID
  const getAvatarUrl = () => {
    if (currentEmployee.id <= 3) {
      return `/faces/face${currentEmployee.id}.jpg`;
    }
    // For employees without specific photos, return a generic avatar or first face
    return '/faces/face1.jpg';
  };

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
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <img
              src={getAvatarUrl()}
              alt={`${currentEmployee.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Announcement */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2 text-gray-800">
            Today, we say goodbye to {currentEmployee.name}
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

export default LayoffModal;
