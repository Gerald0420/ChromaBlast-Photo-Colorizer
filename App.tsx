
import React, { useState } from 'react';
import type { FormState } from './types';
import { colorizeImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ComparisonView from './components/ComparisonView';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { INITIAL_FORM_STATE } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setColorizedImage(null);

    try {
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.split(';')[0].split(':')[1];
      
      const result = await colorizeImage(base64Data, mimeType, formState);
      setColorizedImage(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during colorization.";
      setError(`Colorization failed. ${errorMessage} Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartOver = () => {
    setOriginalImage(null);
    setColorizedImage(null);
    setError(null);
    setIsLoading(false);
    setFormState(INITIAL_FORM_STATE);
  };

  const handleAdjustSettings = () => {
    setColorizedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-300">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error} onRetry={handleSubmit} onStartOver={handleStartOver} />
          ) : colorizedImage && originalImage ? (
            <ComparisonView 
              originalImage={originalImage} 
              colorizedImage={colorizedImage} 
              onStartOver={handleStartOver} 
              onAdjustSettings={handleAdjustSettings} 
            />
          ) : (
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              onSubmit={handleSubmit} 
              formState={formState}
              setFormState={setFormState}
              originalImage={originalImage}
            />
          )}
        </div>
        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Gemini AI. Created for demonstration purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;