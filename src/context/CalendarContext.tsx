import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Employee, employees } from '../data/employees';

interface CalendarContextType {
  currentDate: number;
  currentEmployee: Employee | null;
  remainingDays: number;
  openModal: boolean;
  revealedDays: number[];
  revealDay: (day: number) => void;
  setOpenModal: (open: boolean) => void;
  bidOnPTO: () => void;
  signGoodbyeLetter: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<number>(3); // Day 3 is already revealed
  const [revealedDays, setRevealedDays] = useState<number[]>([1, 2, 3]); // Days 1-3 already revealed
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const revealDay = (day: number) => {
    if (day <= currentDate + 1) {
      if (!revealedDays.includes(day)) {
        setRevealedDays([...revealedDays, day]);
        setCurrentDate(day);
        setOpenModal(true);
      } else {
        // If day is already revealed, just show the modal for that employee
        setCurrentDate(day);
        setOpenModal(true);
      }
    }
  };

  const currentEmployee = employees.find(emp => emp.id === currentDate) || null;
  const remainingDays = 25 - revealedDays.length;

  const bidOnPTO = () => {
    // Simulate bidding on PTO
    console.log('Bidding on PTO of', currentEmployee?.name);
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  const signGoodbyeLetter = () => {
    // Simulate signing goodbye letter
    console.log('Signing goodbye letter for', currentEmployee?.name);
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        currentEmployee,
        remainingDays,
        openModal,
        revealedDays,
        revealDay,
        setOpenModal,
        bidOnPTO,
        signGoodbyeLetter
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
