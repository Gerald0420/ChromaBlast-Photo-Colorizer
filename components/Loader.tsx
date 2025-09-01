
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mx-auto"></div>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-6">Colorizing Your Photo...</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">The AI is working its magic. This may take a moment.</p>
    </div>
  );
};

export default Loader;
