import { type SessionType } from "@/hooks/usePomodoro";
import CycleCounter from "./CycleCounter";
import CircularProgressIndicator from "./CircularProgressIndicator";
import TimerControls from "./TimerControls";

interface TimerCardProps {
  currentSession: SessionType;
  formattedTime: string;
  isRunning: boolean;
  progress: number;
  completedCycles: number;
  goalCycles: number;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export default function TimerCard({
  currentSession,
  formattedTime,
  isRunning,
  progress,
  completedCycles,
  goalCycles,
  toggleTimer,
  resetTimer,
}: TimerCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
      {/* Session indicator */}
      <div className="flex justify-between items-center mb-4">
        <span 
          className={`text-lg font-medium px-3 py-1 rounded-full ${
            currentSession === 'work' 
              ? 'bg-work/10 text-work' 
              : 'bg-break/10 text-break'
          }`}
        >
          {currentSession === 'work' ? 'Work Session' : 'Break Session'}
        </span>
        
        <CycleCounter 
          completedCycles={completedCycles} 
          goalCycles={goalCycles} 
        />
      </div>

      {/* Timer display */}
      <div className="relative flex justify-center items-center my-8">
        <CircularProgressIndicator 
          progress={progress} 
          sessionType={currentSession}
          formattedTime={formattedTime}
          sessionLabel={currentSession === 'work' ? 'Focus Time' : 'Break Time'}
        />
      </div>

      {/* Timer controls */}
      <TimerControls 
        isRunning={isRunning} 
        onStartPause={toggleTimer} 
        onReset={resetTimer} 
      />
    </div>
  );
}
