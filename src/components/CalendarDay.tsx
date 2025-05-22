import React, { useState, useEffect } from 'react';
import { Employee } from '../data/employees';

// Function to get employee photo based on ID
const getEmployeePhoto = (id: number): string => {
  // We have specific faces from the user
  if (id === 1) return '/faces/face1.jpg';
  if (id === 2) return '/faces/face2.jpg';
  if (id === 3) return '/faces/face3.jpg';
  if (id === 4) return '/faces/face4.jpg';

  // For other days, show colored bubbles with question marks
  return '';
};

interface CalendarDayProps {
  day: number;
  isRevealed: boolean;
  employee: Employee | undefined;
  colorClass: string;
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isRevealed,
  employee,
  colorClass,
  onClick
}) => {
  // State to control Wednesday animation
  const [showWednesdayAnimation, setShowWednesdayAnimation] = useState(false);

  // Is it Wednesday (day 4)?
  const isWednesday = day === 4;

  // For days 1-3, always show faces regardless of revealed state
  const showFace = day <= 3;

  // Pretend it's Wednesday and automatically show the animation after a delay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isWednesday) {
      // Delay the animation to make it more noticeable
      timer = setTimeout(() => {
        setShowWednesdayAnimation(true);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isWednesday]);

  // Handle click for Wednesday's special case
  const handleClick = () => {
    // For Wednesday, trigger the animation if not already shown
    if (isWednesday && !showWednesdayAnimation) {
      setShowWednesdayAnimation(true);
    } else {
      // For other days, just call the regular onClick handler
      onClick();
    }
  };

  // Wednesday special animation content
  const wednesdayContent = (
    <div className="relative w-full h-full rounded-full overflow-hidden">
      <span
        className={`flex items-center justify-center absolute inset-0 text-2xl font-bold transition-all duration-1000 ease-in-out ${
          showWednesdayAnimation ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        ?
      </span>

      {showWednesdayAnimation && (
        <div
          className="absolute inset-0 animate-fadeIn bg-cover bg-center"
          style={{
            backgroundImage: `url(${getEmployeePhoto(4)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'fadeIn 1s ease-in-out'
          }}
        />
      )}
    </div>
  );

  // Normal content for other days
  const normalContent = showFace ? (
    // Days 1-3 show specific employee photos
    <div className="w-full h-full overflow-hidden rounded-full">
      <div
        className="w-full h-full bg-cover bg-center rounded-full"
        style={{
          backgroundImage: `url(${getEmployeePhoto(day)})`,
          backgroundPosition: 'center 20%'
        }}
      />
    </div>
  ) : (
    // Other days (5+) show a question mark in the colorful bubble
    <span className="text-2xl font-bold">?</span>
  );

  return (
    <div
      onClick={handleClick}
      className={`bubble ${colorClass} flex items-center justify-center cursor-pointer
        ${isRevealed ? 'revealed' : ''}
        ${isWednesday && showWednesdayAnimation ? 'wednesday-bubble' : ''}`}
    >
      {isWednesday ? wednesdayContent : normalContent}
    </div>
  );
};

export default CalendarDay;
