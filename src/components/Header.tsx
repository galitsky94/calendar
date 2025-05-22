import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1eb980] text-white p-4 relative">
      <div className="flex items-center">
        <button className="mr-4 text-3xl">&larr;</button>
        <h1 className="text-3xl font-bold">Team</h1>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button className="text-3xl">⚙️</button>
      </div>
    </header>
  );
};

export default Header;
