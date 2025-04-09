interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button 
      className="relative inline-flex items-center h-6 rounded-full w-11 bg-slate-200 dark:bg-blue-600 transition-colors duration-300 focus:outline-none"
      onClick={onToggle}
      aria-pressed={isDarkMode}
      role="switch"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span 
        className={`inline-block w-4 h-4 transform rounded-full bg-white transition duration-300 ${
          isDarkMode ? 'translate-x-6' : 'translate-x-1'
        }`}
      ></span>
    </button>
  );
}
