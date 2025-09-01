import type { FormState } from './types';

export const YEARS = Array.from({ length: (2000 - 1920) / 5 + 1 }, (_, i) => 1920 + i * 5);

export const SEASONS = ['Unknown', 'Spring', 'Summer', 'Autumn', 'Winter'];
export const TIMES_OF_DAY = ['Unknown', 'Morning', 'Mid-day', 'Afternoon', 'Evening', 'Night'];
export const LIGHT_CONDITIONS = ['Unknown', 'Sunny', 'Overcast', 'Cloudy', 'Rainy', 'Snowy', 'Studio', 'Indoors'];
export const SATURATION_LEVELS = ['Vibrant', 'Natural'];
export const PHOTO_TYPES = ['Black & White', 'Sepia'];

export const INITIAL_FORM_STATE: FormState = {
  year: '1950',
  details: '',
  season: 'Unknown',
  timeOfDay: 'Unknown',
  lightConditions: 'Unknown',
  saturation: 'Vibrant',
  photoType: 'Black & White'
};