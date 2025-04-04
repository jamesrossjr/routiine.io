// config-parts.js
const content = [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ];
  
  const safelist = [
    'text-slate-green',
    'bg-ivory',
    'text-text-light',
    'bg-brand-dark',
    'text-muted-gray',
    'bg-surface-dark',
    'text-brand-gold',
    'hover:text-signal-teal',
    'dark:hover:text-brand-gold',
  ];
  
  const theme = {
    extend: {
      colors: {
        brand: '#C79C60',
        accent: '#3BA3A3',
        ivory: '#F5F2E7',
        'slate-green': '#28322E',
        'brand-dark': '#1A1A1A',
        'surface-dark': '#232323',
        'text-light': '#E2E2E2',
        'muted-gray': '#A0A0A0',
        'accent-dark': '#C79C60',
        'signal-teal': '#3BA3A3',
        'text-dark': '#1A1A1A',
        'text-brand-gold': '#C79C60',
        'text-signal-teal': '#3BA3A3',
        'bg-surface-light': '#F5F2E7',
        'brandGold': '#C79C60',
        'signalTeal': '#3BA3A3',
        'brandDark': '#1A1A1A',
        'surfaceDark': '#232323',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
    },
  };
  
  const darkMode = 'class';
  const plugins = [];
  
  module.exports = {
    content,
    safelist,
    theme,
    darkMode,
    plugins,
  };
  