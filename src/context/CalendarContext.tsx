import type React from 'react';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Employee, employees } from '../data/employees';
import confetti from 'canvas-confetti';

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
  ptoClaims: Record<string, number>;
  leaderboard: { name: string; ptoClaimed: number }[];
  biddingModalOpen: boolean;
  closeBiddingModal: () => void;
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

// Function to trigger confetti
const triggerConfetti = () => {
  const duration = 2000;
  const colors = ['#ffcdd2', '#c8e6c9', '#fff9c4', '#bbdefb'];

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors,
    disableForReducedMotion: true
  });

  // Fire a second burst for dramatic effect
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
  }, 250);

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
  }, 400);
};

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<number>(4); // Pretend it's day 4 (Wednesday)
  const [revealedDays, setRevealedDays] = useState<number[]>([1, 2, 3, 4]); // Days 1-4 already revealed
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [biddingModalOpen, setBiddingModalOpen] = useState<boolean>(false);
  const [ptoClaims, setPtoClaims] = useState<Record<string, number>>({});

  // Automatically show Wednesday employee in modal after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set this if you want to auto-show the modal for day 4
      // setOpenModal(true);
    }, 4000); // Give time for the animation to finish

    return () => clearTimeout(timer);
  }, []);

  const revealDay = (day: number) => {
    if (day <= currentDate + 1) {
      if (!revealedDays.includes(day)) {
        setRevealedDays([...revealedDays, day]);
        setCurrentDate(day);
        setOpenModal(true);
        triggerConfetti(); // Trigger confetti when a new day is revealed
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
    if (currentEmployee) {
      // Close the employee modal and open the bidding modal
      setOpenModal(false);
      setBiddingModalOpen(true);
    }
  };

  const closeBiddingModal = () => {
    setBiddingModalOpen(false);
  };

  const signGoodbyeLetter = () => {
    // Simulate signing goodbye letter
    console.log('Signing goodbye letter for', currentEmployee?.name);
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  // Generate leaderboard sorted by PTO claimed
  const leaderboard = Object.entries(ptoClaims)
    .map(([name, ptoClaimed]) => ({ name, ptoClaimed }))
    .sort((a, b) => b.ptoClaimed - a.ptoClaimed);

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
        signGoodbyeLetter,
        ptoClaims,
        leaderboard,
        biddingModalOpen,
        closeBiddingModal
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
