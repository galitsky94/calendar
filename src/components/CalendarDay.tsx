import type React from 'react';
import { useState, useEffect } from 'react';
import type { Employee } from '../data/employees';

const getEmployeePhoto = (id: number): string => {
  if (id === 1) return '/faces/face1.jpg';
  if (id === 2) return '/faces/face2.jpg';
  if (id === 3) return '/faces/face3.jpg?priority=high';
  if (id === 4) return '/faces/face4.jpg';
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
  const [wednesdayImageLoaded, setWednesdayImageLoaded] = useState(false);
  const isWednesday = day === 4;

  // States for Day 4 animation
  const [showQuestion, setShowQuestion] = useState(isWednesday);
  const [dissolveQuestion, setDissolveQuestion] = useState(false);
  const [showFace, setShowFace] = useState(false);

  useEffect(() => {
    if (isWednesday) {
      const img = new Image();
      img.src = getEmployeePhoto(4);
      img.onload = () => {
        setWednesdayImageLoaded(true);
      };
    }
  }, [isWednesday]);

  useEffect(() => {
    if (isWednesday && isRevealed && wednesdayImageLoaded) {
      // Wait 2 seconds after image load, then start dissolving question mark
      const timerDissolveStart = setTimeout(() => {
        setDissolveQuestion(true);

        // After question mark starts dissolving (1.5s animation), show face
        const timerFaceRevealStart = setTimeout(() => {
          setShowQuestion(false); // Hide question mark completely
          setShowFace(true);      // Start revealing face
        }, 1500); // Duration of dissolve-question-effect

        return () => clearTimeout(timerFaceRevealStart);
      }, 2000); // 2-second delay before animation starts

      return () => clearTimeout(timerDissolveStart);
    }
  }, [isWednesday, isRevealed, wednesdayImageLoaded]);

  const showFaceForDays1to3 = day <= 3;

  if (isWednesday) {
    // Only apply animation if the day is revealed
    if (!isRevealed) {
      return (
        <div
          onClick={onClick}
          className={`bubble ${colorClass} flex items-center justify-center cursor-pointer`}
        >
          <span className="text-2xl font-bold">?</span>
        </div>
      );
    }

    return (
      <div
        onClick={onClick}
        // Apply the new .day4-pulsate class
        className={`bubble ${colorClass} flex items-center justify-center cursor-pointer relative overflow-hidden ${isRevealed && wednesdayImageLoaded ? 'day4-pulsate' : ''}`}
      >
        {showQuestion && (
          <div
            className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${dissolveQuestion ? 'question-dissolving' : ''}`}
            style={{ opacity: dissolveQuestion ? 0 : 1 }} // Ensure final state after animation
          >
            ?
          </div>
        )}
        {showFace && wednesdayImageLoaded && (
          <div
            className="face-appearing"
            style={{ backgroundImage: `url(${getEmployeePhoto(4)})` }}
          />
        )}
        {/* Fallback if somehow no image/question for revealed Wednesday - should not happen */}
        {!showQuestion && !showFace && wednesdayImageLoaded && (
            <div
                className="w-full h-full bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url(${getEmployeePhoto(4)})` }}
            />
        )}
        {!showQuestion && !showFace && !wednesdayImageLoaded && isRevealed && (
            <span className="text-4xl font-bold">?</span> // Still show Q if revealed but image not loaded
        )}
      </div>
    );
  }

  // Normal content for other days
  const normalContent = showFaceForDays1to3 ? (
    <div className="w-full h-full overflow-hidden rounded-full">
      {day === 3 ? (
        <div className="relative w-full h-full">
          <div className="face3-loading absolute inset-0 rounded-full" />
          <img
            src={getEmployeePhoto(day)}
            alt={`Employee face ${day}`}
            className="w-full h-full object-cover rounded-full face3-optimized"
            style={{ objectPosition: 'center 20%' }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      ) : (
        <div
          className="w-full h-full bg-cover bg-center rounded-full"
          style={{
            backgroundImage: `url(${getEmployeePhoto(day)})`,
            backgroundPosition: 'center 20%'
          }}
        />
      )}
    </div>
  ) : (
    <span className="text-2xl font-bold">?</span>
  );

  return (
    <div
      onClick={onClick}
      className={`bubble ${colorClass} flex items-center justify-center cursor-pointer ${isRevealed && !isWednesday ? 'revealed' : ''}`}
    >
      {normalContent}
    </div>
  );
};

export default CalendarDay;
