import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1eb980] p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <button className="mr-4 text-2xl">
          ←
        </button>
        <h1 className="text-3xl font-bold">ADVENT LAYOFF CALENDAR</h1>
      </div>
      <button className="text-2xl">
        ⚙️
      </button>
    </header>
  );
};

export default Header;
