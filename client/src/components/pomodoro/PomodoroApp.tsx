import { usePomodoro } from "@/hooks/usePomodoro";
import TimerCard from "./TimerCard";
import NotificationBanner from "./NotificationBanner";

export default function PomodoroApp() {
  const pomodoro = usePomodoro();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <header className="w-full max-w-md text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          BeProd Timer
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Focus. Break. Repeat.</p>
      </header>

      <main className="w-full max-w-md">
        <TimerCard
          currentSession={pomodoro.currentSession}
          sessionName={pomodoro.sessionName}
          formattedTime={pomodoro.formattedTime}
          isRunning={pomodoro.isRunning}
          progress={pomodoro.progress}
          completedCycles={pomodoro.completedCycles}
          goalCycles={pomodoro.goalCycles}
          toggleTimer={pomodoro.toggleTimer}
          resetTimer={pomodoro.resetTimer}
          setSessionName={pomodoro.setSessionName}
          getDefaultSessionName={pomodoro.getDefaultSessionName}
        />

        <NotificationBanner
          isVisible={pomodoro.notification.isVisible}
          message={pomodoro.notification.message}
          type={pomodoro.notification.type}
          onDismiss={pomodoro.dismissNotification}
        />

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Break down tasks into manageable 25-minute focused work sessions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Take short breaks to refresh your mind and rest your eyes.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>After completing 4 work sessions, take a longer break to recharge.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Name your sessions to track what you're working on in your history.</span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="w-full max-w-md text-center mt-8 mb-8 text-sm text-slate-600 dark:text-slate-400">
        <p>The Pomodoro Technique helps improve productivity through focused work sessions and regular breaks.</p>
        <p className="mt-2">© {new Date().getFullYear()} BeProd Timer</p>
      </footer>
    </div>
  );
}
