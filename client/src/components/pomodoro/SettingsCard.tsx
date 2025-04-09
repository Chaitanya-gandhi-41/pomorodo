import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface SettingsCardProps {
  workDuration: number;
  breakDuration: number;
  goalCycles: number;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  setGoalCycles: (cycles: number) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function SettingsCard({
  workDuration,
  breakDuration,
  goalCycles,
  setWorkDuration,
  setBreakDuration,
  setGoalCycles,
  isDarkMode,
  toggleTheme,
}: SettingsCardProps) {
  const [workInput, setWorkInput] = useState(workDuration.toString());
  const [breakInput, setBreakInput] = useState(breakDuration.toString());
  const [cyclesInput, setCyclesInput] = useState(goalCycles.toString());

  // Handlers for work duration
  const handleWorkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkInput(value);
    
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setWorkDuration(parsed);
    }
  };

  const incrementWorkDuration = () => {
    const newValue = Math.min(workDuration + 1, 60);
    setWorkDuration(newValue);
    setWorkInput(newValue.toString());
  };

  const decrementWorkDuration = () => {
    const newValue = Math.max(workDuration - 1, 1);
    setWorkDuration(newValue);
    setWorkInput(newValue.toString());
  };

  // Handlers for break duration
  const handleBreakDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBreakInput(value);
    
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setBreakDuration(parsed);
    }
  };

  const incrementBreakDuration = () => {
    const newValue = Math.min(breakDuration + 1, 30);
    setBreakDuration(newValue);
    setBreakInput(newValue.toString());
  };

  const decrementBreakDuration = () => {
    const newValue = Math.max(breakDuration - 1, 1);
    setBreakDuration(newValue);
    setBreakInput(newValue.toString());
  };

  // Handlers for goal cycles
  const handleGoalCyclesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCyclesInput(value);
    
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setGoalCycles(parsed);
    }
  };

  const incrementGoalCycles = () => {
    const newValue = Math.min(goalCycles + 1, 10);
    setGoalCycles(newValue);
    setCyclesInput(newValue.toString());
  };

  const decrementGoalCycles = () => {
    const newValue = Math.max(goalCycles - 1, 1);
    setGoalCycles(newValue);
    setCyclesInput(newValue.toString());
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Timer Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Work Duration Setting */}
        <div>
          <Label htmlFor="workDuration" className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Work Duration (minutes)
          </Label>
          <div className="flex items-center">
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-l-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              onClick={decrementWorkDuration}
              aria-label="Decrease work duration"
            >
              <Minus className="h-5 w-5" />
            </button>
            
            <Input 
              type="number" 
              id="workDuration" 
              min="1" 
              max="60" 
              value={workInput}
              onChange={handleWorkDurationChange}
              className="w-full h-10 text-center bg-white dark:bg-slate-800 border-y border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
            />
            
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-r-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              onClick={incrementWorkDuration}
              aria-label="Increase work duration"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Break Duration Setting */}
        <div>
          <Label htmlFor="breakDuration" className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Break Duration (minutes)
          </Label>
          <div className="flex items-center">
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-l-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              onClick={decrementBreakDuration}
              aria-label="Decrease break duration"
            >
              <Minus className="h-5 w-5" />
            </button>
            
            <Input 
              type="number" 
              id="breakDuration" 
              min="1" 
              max="30" 
              value={breakInput}
              onChange={handleBreakDurationChange}
              className="w-full h-10 text-center bg-white dark:bg-slate-800 border-y border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
            />
            
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-r-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              onClick={incrementBreakDuration}
              aria-label="Increase break duration"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="goalCycles" className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
          Goal Cycles
        </Label>
        <div className="flex items-center">
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-l-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            onClick={decrementGoalCycles}
            aria-label="Decrease goal cycles"
          >
            <Minus className="h-5 w-5" />
          </button>
          
          <Input 
            type="number" 
            id="goalCycles" 
            min="1" 
            max="10" 
            value={cyclesInput}
            onChange={handleGoalCyclesChange}
            className="w-full h-10 text-center bg-white dark:bg-slate-800 border-y border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
          />
          
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-r-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            onClick={incrementGoalCycles}
            aria-label="Increase goal cycles"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Dark Mode</span>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>
      </div>
    </div>
  );
}
