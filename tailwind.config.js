/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const presets = [require('nativewind/preset')];
export const theme = {
  extend: {
    colors: {
      primary: '#181818',
      secondary: '#EDE6D6',
    },
  },
};
export const plugins = [];

