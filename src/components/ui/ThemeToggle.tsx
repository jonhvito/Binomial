import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label */}
      <span className="text-sm font-medium theme-text-secondary select-none">
        Tema
      </span>
      
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex items-center justify-center
          w-20 h-10 rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-4 focus:ring-offset-2 
          hover:scale-105 hover:shadow-lg group
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-purple-400/50' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 focus:ring-orange-400/50'
          }
          shadow-lg
        `}
        title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      >
        {/* Slider Circle */}
        <div
          className={`
            absolute w-8 h-8 bg-white rounded-full shadow-lg
            transform transition-all duration-300 ease-in-out
            flex items-center justify-center
            group-hover:shadow-xl border-2
            ${theme === 'dark' 
              ? 'translate-x-5 border-purple-200' 
              : '-translate-x-5 border-orange-200'
            }
          `}
        >
          {theme === 'light' ? (
            <Sun className="w-5 h-5 text-orange-500 drop-shadow-sm" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 drop-shadow-sm" />
          )}
        </div>
        
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Sun className={`w-4 h-4 transition-opacity duration-300 ${
            theme === 'light' ? 'text-white opacity-100' : 'text-yellow-300 opacity-40'
          }`} />
          <Moon className={`w-4 h-4 transition-opacity duration-300 ${
            theme === 'dark' ? 'text-white opacity-100' : 'text-indigo-300 opacity-40'
          }`} />
        </div>
      </button>
      
      {/* Status Text */}
      <span className="text-xs theme-text-secondary select-none capitalize">
        {theme === 'light' ? 'Claro' : 'Escuro'}
      </span>
    </div>
  );
};

export default ThemeToggle;