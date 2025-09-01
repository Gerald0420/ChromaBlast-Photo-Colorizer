
import React, { useRef } from 'react';
import type { FormState } from '../types';
import { YEARS, SEASONS, TIMES_OF_DAY, LIGHT_CONDITIONS, SATURATION_LEVELS, PHOTO_TYPES } from '../constants';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onSubmit: () => void;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  originalImage: string | null;
}

const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onSubmit, formState, setFormState, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 mt-8">
      <div>
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="dropzone-file" 
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors"
            style={{ 
              backgroundImage: `url(${originalImage})`, 
              backgroundSize: 'contain', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat'
            }}
          >
            {!originalImage && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
              </div>
            )}
            <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} ref={fileInputRef} />
          </label>
        </div>
        {originalImage && (
          <button onClick={triggerFileSelect} className="w-full mt-4 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Change Photo
          </button>
        )}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-800 dark:text-blue-200 text-sm flex items-start">
        <InfoIcon />
        <span className="ml-2">Provide as much context as you can for the best results. The AI uses these details to create more accurate colors.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Approximate Year</label>
          <select id="year" name="year" value={formState.year} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="photoType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Original Photo Type</label>
          <select id="photoType" name="photoType" value={formState.photoType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {PHOTO_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="saturation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color Saturation</label>
          <select id="saturation" name="saturation" value={formState.saturation} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {SATURATION_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="season" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Season</label>
          <select id="season" name="season" value={formState.season} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Setting Details</label>
          <textarea id="details" name="details" rows={3} value={formState.details} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Beach in Normandy, a family picnic, a 1950s diner"></textarea>
        </div>

        <div>
          <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time of Day</label>
          <select id="timeOfDay" name="timeOfDay" value={formState.timeOfDay} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {TIMES_OF_DAY.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="lightConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Light Conditions</label>
          <select id="lightConditions" name="lightConditions" value={formState.lightConditions} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {LIGHT_CONDITIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      
      <button
        onClick={onSubmit}
        disabled={!originalImage}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        Colorize Photo
      </button>
    </div>
  );
};

export default ImageUploader;