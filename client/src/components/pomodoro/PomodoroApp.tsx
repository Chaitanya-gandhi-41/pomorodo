import { usePomodoro } from "@/hooks/usePomodoro";
import { useTheme } from "@/hooks/useTheme";
import TimerCard from "./TimerCard";
import SettingsCard from "./SettingsCard";
import NotificationBanner from "./NotificationBanner";

export default function PomodoroApp() {
  const pomodoro = usePomodoro();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <header className="w-full max-w-md text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
          <p className="text-slate-600 dark:text-slate-400">Focus. Break. Repeat.</p>
        </header>

        <main className="w-full max-w-md">
          <TimerCard
            currentSession={pomodoro.currentSession}
            formattedTime={pomodoro.formattedTime}
            isRunning={pomodoro.isRunning}
            progress={pomodoro.progress}
            completedCycles={pomodoro.completedCycles}
            goalCycles={pomodoro.goalCycles}
            toggleTimer={pomodoro.toggleTimer}
            resetTimer={pomodoro.resetTimer}
          />

          <SettingsCard
            workDuration={pomodoro.workDuration}
            breakDuration={pomodoro.breakDuration}
            goalCycles={pomodoro.goalCycles}
            setWorkDuration={pomodoro.setWorkDuration}
            setBreakDuration={pomodoro.setBreakDuration}
            setGoalCycles={pomodoro.setGoalCycles}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />

          <NotificationBanner
            isVisible={pomodoro.notification.isVisible}
            message={pomodoro.notification.message}
            type={pomodoro.notification.type}
            onDismiss={pomodoro.dismissNotification}
          />
        </main>

        <footer className="w-full max-w-md text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
          <p>The Pomodoro Technique helps improve productivity through focused work sessions and regular breaks.</p>
          <p className="mt-2">© {new Date().getFullYear()} Pomodoro Timer</p>
        </footer>
      </div>
    </div>
  );
}
