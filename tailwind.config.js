/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const presets = [require('nativewind/preset')];
export const theme = {
  extend: {
    colors: {
      primary: '#181818',
      secondary: '#EDE6D6',
    },
    fontFamily: {
      'nunito-regular': 'Nunito_400Regular',
      'nunito-italic': 'Nunito_400Regular_Italic',
      'nunito-bold': 'Nunito_700Bold',
    },
    fontSize: {
      lg: 24,
    },
  },
};
export const plugins = [];
