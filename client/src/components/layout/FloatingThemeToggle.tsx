import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function FloatingThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-orange-500" />
      ) : (
        <Moon className="h-6 w-6 text-slate-700" />
      )}
    </button>
  );
}