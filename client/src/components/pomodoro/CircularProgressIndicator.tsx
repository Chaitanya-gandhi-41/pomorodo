import { type SessionType } from "@/hooks/usePomodoro";

interface CircularProgressIndicatorProps {
  progress: number;
  sessionType: SessionType;
  formattedTime: string;
  sessionLabel: string;
}

export default function CircularProgressIndicator({
  progress,
  sessionType,
  formattedTime,
  sessionLabel,
}: CircularProgressIndicatorProps) {
  // Calculate stroke-dashoffset based on progress
  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative w-64 h-64">
      {/* Background circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r={circleRadius} 
          fill="none" 
          stroke="currentColor" 
          className="text-slate-200 dark:text-slate-700" 
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <circle 
          cx="50" 
          cy="50" 
          r={circleRadius} 
          fill="none" 
          stroke="currentColor" 
          className={`transition-all duration-1000 ease-in-out ${
            sessionType === 'work' 
              ? 'text-work' 
              : sessionType === 'break'
                ? 'text-break'
                : 'text-long-break'
          }`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      
      {/* Timer text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl md:text-6xl font-bold tabular-nums">
          {formattedTime}
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {sessionLabel}
        </span>
      </div>
    </div>
  );
}
