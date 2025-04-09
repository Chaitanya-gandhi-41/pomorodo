interface CycleCounterProps {
  completedCycles: number;
  goalCycles: number;
}

export default function CycleCounter({ completedCycles, goalCycles }: CycleCounterProps) {
  return (
    <div className="flex items-center space-x-1" title="Completed Cycles">
      <span className="text-sm text-slate-600 dark:text-slate-400">Cycles:</span>
      <div className="flex space-x-1">
        {Array.from({ length: goalCycles }, (_, i) => (
          <div 
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i < completedCycles 
                ? 'bg-work' 
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
