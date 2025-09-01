
import React from 'react';

interface ComparisonViewProps {
  originalImage: string;
  colorizedImage: string;
  onStartOver: () => void;
  onAdjustSettings: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ originalImage, colorizedImage, onStartOver, onAdjustSettings }) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = colorizedImage;
    link.download = 'chromablast-colorized.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold font-serif text-gray-800 dark:text-white">Colorization Complete!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">Original</h3>
          <img src={originalImage} alt="Original" className="rounded-lg shadow-lg mx-auto max-h-96" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">Colorized</h3>
          <img src={colorizedImage} alt="Colorized" className="rounded-lg shadow-lg mx-auto max-h-96" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          Download
        </button>
        <button
          onClick={onAdjustSettings}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Adjust Settings
        </button>
        <button
          onClick={onStartOver}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Colorize Another Photo
        </button>
      </div>
    </div>
  );
};

export default ComparisonView;
