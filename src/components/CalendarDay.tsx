import React from 'react';
import { Employee } from '../data/employees';

// Function to get employee photo based on ID
const getEmployeePhoto = (id: number): string => {
  // We have 3 specific faces from the user
  if (id === 1) return '/faces/face1.jpg';
  if (id === 2) return '/faces/face2.jpg';
  if (id === 3) return '/faces/face3.jpg';

  // For other days, show colored bubbles with numbers
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
  return (
    <div
      onClick={onClick}
      className={`bubble ${colorClass} flex items-center justify-center cursor-pointer ${isRevealed ? 'revealed' : ''}`}
    >
      {isRevealed ? (
        day <= 3 ? (
          // Days 1-3 show specific employee photos
          <div
            className="w-full h-full overflow-hidden rounded-full"
          >
            {/* We'll manually add these images to public/faces/ */}
            <div
              className="w-full h-full bg-cover bg-center rounded-full"
              style={{
                backgroundImage: `url(${getEmployeePhoto(day)})`,
                backgroundPosition: 'center 20%'
              }}
            />
          </div>
        ) : (
          // Other revealed days just show the day number in the colorful bubble
          <span className="text-lg font-bold">{day}</span>
        )
      ) : (
        // For unrevealed days, show the day number
        <span className="text-lg font-bold">{day}</span>
      )}
    </div>
  );
};

export default CalendarDay;
