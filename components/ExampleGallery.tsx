import React from 'react';

const ExampleGallery: React.FC = () => {
  const beforeImageUrl = 'https://images.pexels.com/photos/597928/pexels-photo-597928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const afterImageUrl = 'https://images.pexels.com/photos/2088019/pexels-photo-2088019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center">
            <p className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">1. Upload a B&W Photo</p>
            <img 
              src={beforeImageUrl} 
              alt="Black and white example of a lighthouse on a rocky shore" 
              className="rounded-lg shadow-md aspect-[4/3] object-cover"
            />
        </div>
        <div className="text-center">
            <p className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">2. Get a Colorized Version</p>
            <img 
              src={afterImageUrl} 
              alt="Colorized example of a lighthouse on a rocky shore" 
              className="rounded-lg shadow-md aspect-[4/3] object-cover"
            />
        </div>
      </div>
    </div>
  );
};

export default ExampleGallery;