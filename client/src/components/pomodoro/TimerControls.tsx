import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

export default function TimerControls({
  isRunning,
  onStartPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <Button 
        className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        onClick={onStartPause}
      >
        {isRunning ? (
          <>
            <PauseCircle className="h-5 w-5 mr-2" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <PlayCircle className="h-5 w-5 mr-2" />
            <span>Start</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="outline"
        className="flex items-center justify-center px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium rounded-lg transition-colors duration-200"
        onClick={onReset}
      >
        <RotateCcw className="h-5 w-5 mr-2" />
        Reset
      </Button>
    </div>
  );
}
