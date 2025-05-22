import React from 'react';
import { Employee } from '../data/employees';

// Function to get employee photo based on ID
const getEmployeePhoto = (id: number): string => {
  // We have 3 specific faces from the user
  if (id === 1) return '/faces/face1.jpg';
  if (id === 2) return '/faces/face2.jpg';
  if (id === 3) return '/faces/face3.jpg';

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
  // For days 1-3, always show faces regardless of revealed state
  const showFace = day <= 3;
  const dayContent = showFace ? (
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
    // Other days show a question mark in the colorful bubble instead of the day number
    <span className="text-2xl font-bold">?</span>
  );

  return (
    <div
      onClick={onClick}
      className={`bubble ${colorClass} flex items-center justify-center cursor-pointer ${isRevealed ? 'revealed' : ''}`}
    >
      {dayContent}
    </div>
  );
};

export default CalendarDay;
