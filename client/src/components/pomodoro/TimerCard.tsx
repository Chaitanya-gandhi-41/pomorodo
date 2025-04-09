import { type SessionType } from "@/hooks/usePomodoro";
import CycleCounter from "./CycleCounter";
import CircularProgressIndicator from "./CircularProgressIndicator";
import TimerControls from "./TimerControls";
import SessionNameInput from "./SessionNameInput";

interface TimerCardProps {
  currentSession: SessionType;
  sessionName: string;
  formattedTime: string;
  isRunning: boolean;
  progress: number;
  completedCycles: number;
  goalCycles: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setSessionName: (name: string) => void;
  getDefaultSessionName: (type: SessionType) => string;
}

export default function TimerCard({
  currentSession,
  sessionName,
  formattedTime,
  isRunning,
  progress,
  completedCycles,
  goalCycles,
  toggleTimer,
  resetTimer,
  setSessionName,
  getDefaultSessionName,
}: TimerCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
      {/* Session indicator */}
      <div className="flex justify-between items-center mb-2">
        <span 
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            currentSession === 'work' 
              ? 'bg-work/10 text-work' 
              : currentSession === 'break'
                ? 'bg-break/10 text-break'
                : 'bg-long-break/10 text-long-break'
          }`}
        >
          {currentSession === 'work' 
            ? 'Work' 
            : currentSession === 'break'
              ? 'Short Break'
              : 'Long Break'
          }
        </span>
        
        <CycleCounter 
          completedCycles={completedCycles} 
          goalCycles={goalCycles} 
        />
      </div>

      {/* Session name input */}
      <SessionNameInput
        currentSession={currentSession}
        sessionName={sessionName}
        onNameChange={setSessionName}
        getDefaultSessionName={getDefaultSessionName}
      />

      {/* Timer display */}
      <div className="relative flex justify-center items-center my-8">
        <CircularProgressIndicator 
          progress={progress} 
          sessionType={currentSession}
          formattedTime={formattedTime}
          sessionLabel={
            currentSession === 'work' 
              ? 'Focus Time' 
              : currentSession === 'break'
                ? 'Break Time'
                : 'Long Break'
          }
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
