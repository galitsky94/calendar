import type React from 'react';
import CalendarDay from './CalendarDay';
import { useCalendar } from '../context/CalendarContext';
import { employees } from '../data/employees';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Color mapping for different days using pastel colors
const colorClasses: Record<number, string> = {
  4: 'bubble-red',
  5: 'bubble-green',
  6: 'bubble-yellow',
  7: 'bubble-blue',
  8: 'bubble-red',
  9: 'bubble-green',
  10: 'bubble-yellow',
  11: 'bubble-blue',
  12: 'bubble-red',
  13: 'bubble-green',
  14: 'bubble-yellow',
  15: 'bubble-blue',
  16: 'bubble-red',
  17: 'bubble-green',
  18: 'bubble-yellow',
  19: 'bubble-blue',
  20: 'bubble-red',
  21: 'bubble-green',
  22: 'bubble-yellow',
  23: 'bubble-blue',
  24: 'bubble-red',
  25: 'bubble-green',
};

const CalendarGrid: React.FC = () => {
  const { revealedDays, revealDay } = useCalendar();

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold text-[#1eb980] mb-8 text-center">
        ADVENT LAYOFF CALENDAR
      </h2>
      <div className="p-10 card mb-8 rounded-xl shadow bg-white max-w-3xl mx-auto">
        <div className="grid grid-cols-7 mb-8">
          {daysOfWeek.map((day) => (
            <div key={`grid-day-${day}`} className="text-center font-semibold text-gray-500 text-xl">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-5 place-items-center">
          {[...Array(7)].map((_, index) => {
            const day = index + 1;
            const isRevealed = revealedDays.includes(day);
            const employee = employees.find(emp => emp.id === day);
            const colorClass = colorClasses[day] || 'bg-gray-100 text-gray-700';

            return (
              <CalendarDay
                key={day}
                day={day}
                isRevealed={isRevealed}
                employee={employee}
                colorClass={colorClass}
                onClick={() => revealDay(day)}
              />
            );
          })}

          {[...Array(7)].map((_, index) => {
            const day = index + 8;
            const isRevealed = revealedDays.includes(day);
            const employee = employees.find(emp => emp.id === day);
            const colorClass = colorClasses[day] || 'bg-gray-100 text-gray-700';

            return (
              <CalendarDay
                key={day}
                day={day}
                isRevealed={isRevealed}
                employee={employee}
                colorClass={colorClass}
                onClick={() => revealDay(day)}
              />
            );
          })}

          {[...Array(7)].map((_, index) => {
            const day = index + 15;
            const isRevealed = revealedDays.includes(day);
            const employee = employees.find(emp => emp.id === day);
            const colorClass = colorClasses[day] || 'bg-gray-100 text-gray-700';

            return (
              <CalendarDay
                key={day}
                day={day}
                isRevealed={isRevealed}
                employee={employee}
                colorClass={colorClass}
                onClick={() => revealDay(day)}
              />
            );
          })}

          {[...Array(7)].map((_, index) => {
            if (index > 3) return <div key={`empty-position-${index}`} />;
            const day = index + 22;
            const isRevealed = revealedDays.includes(day);
            const employee = employees.find(emp => emp.id === day);
            const colorClass = colorClasses[day] || 'bg-gray-100 text-gray-700';

            return (
              <CalendarDay
                key={day}
                day={day}
                isRevealed={isRevealed}
                employee={employee}
                colorClass={colorClass}
                onClick={() => revealDay(day)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
