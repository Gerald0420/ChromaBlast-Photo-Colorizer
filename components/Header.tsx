
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        ChromaBlast
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Breathe Life into Old Photos with AI
      </p>
    </header>
  );
};

export default Header;
