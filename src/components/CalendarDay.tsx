import React from 'react';
import { Employee } from '../data/employees';

interface CalendarDayProps {
  day: number;
  isRevealed: boolean;
  employee: Employee | undefined;
  colorClass: string;
  onClick: () => void;
}

// Function to get employee photo position from the team grid image
const getEmployeePhotoStyle = (id: number) => {
  // The team photo has people arranged in a 5x3 grid
  // We'll extract one face at a time based on their position
  const row = Math.floor((id - 1) / 3);
  const col = (id - 1) % 3;

  // Calculate percentage positions for background-position
  const xPos = col * 33.33;
  const yPos = row * 33.33;

  return {
    backgroundImage: 'url(/professional-team.jpg)',
    backgroundSize: '300%', // 300% makes each face about the right size
    backgroundPosition: `${xPos}% ${yPos}%`
  };
};

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isRevealed,
  employee,
  colorClass,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bubble ${colorClass} flex items-center justify-center cursor-pointer ${isRevealed ? 'revealed' : ''}`}
    >
      {isRevealed ? (
        // For revealed days, show the employee photo
        <div
          className="w-full h-full overflow-hidden rounded-full"
          style={getEmployeePhotoStyle(day)}
        >
          {/* Photo is shown via background image */}
        </div>
      ) : (
        // For unrevealed days, show the day number
        <span className="text-lg font-bold">{day}</span>
      )}
    </div>
  );
};

export default CalendarDay;
