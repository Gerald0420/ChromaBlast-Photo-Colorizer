
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  onStartOver: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, onStartOver }) => {
  return (
    <div className="text-center py-10 px-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
       <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-500/20">
         <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
         </svg>
       </div>
      <h3 className="mt-4 text-xl font-semibold text-red-800 dark:text-red-200">Oops, something went wrong.</h3>
      <p className="mt-2 text-red-600 dark:text-red-300">{message}</p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        {onRetry && (
            <button
                onClick={onRetry}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Try Again
            </button>
        )}
        <button
          onClick={onStartOver}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
