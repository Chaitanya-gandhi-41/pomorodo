import { usePomodoro } from "@/hooks/usePomodoro";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";

export default function Settings() {
  const pomodoro = usePomodoro();
  const [workDuration, setWorkDuration] = useState(pomodoro.workDuration);
  const [breakDuration, setBreakDuration] = useState(pomodoro.breakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(pomodoro.longBreakDuration);
  const [goalCycles, setGoalCycles] = useState(pomodoro.goalCycles);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(pomodoro.cyclesBeforeLongBreak);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Handle immediate update of timer settings
  const handleWorkDurationChange = (value: number) => {
    setWorkDuration(value);
    pomodoro.setWorkDuration(value);
  };

  const handleBreakDurationChange = (value: number) => {
    setBreakDuration(value);
    pomodoro.setBreakDuration(value);
  };

  const handleLongBreakDurationChange = (value: number) => {
    setLongBreakDuration(value);
    pomodoro.setLongBreakDuration(value);
  };

  const handleGoalCyclesChange = (value: number) => {
    setGoalCycles(value);
    pomodoro.setGoalCycles(value);
  };

  const handleCyclesBeforeLongBreakChange = (value: number) => {
    setCyclesBeforeLongBreak(value);
    pomodoro.setCyclesBeforeLongBreak(value);
  };

  // Handler for requesting notification permissions
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
      return;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        // Show a test notification
        new Notification("BeProd", {
          body: "Notifications are now enabled!",
          icon: "/favicon.ico"
        });
      } else {
        setNotificationsEnabled(false);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Timer Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration Settings */}
          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle>Session Duration</CardTitle>
              <CardDescription>Configure your work and break intervals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Work Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="workDuration">Work Duration</Label>
                  <span className="text-orange-500 font-medium">{workDuration} minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Slider
                    id="workDuration"
                    min={1}
                    max={60}
                    step={1}
                    value={[workDuration]}
                    onValueChange={(value) => handleWorkDurationChange(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>
              
              {/* Short Break Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="breakDuration">Short Break Duration</Label>
                  <span className="text-green-500 font-medium">{breakDuration} minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Slider
                    id="breakDuration"
                    min={1}
                    max={30}
                    step={1}
                    value={[breakDuration]}
                    onValueChange={(value) => handleBreakDurationChange(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>
              
              {/* Long Break Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="longBreakDuration">Long Break Duration</Label>
                  <span className="text-blue-500 font-medium">{longBreakDuration} minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Slider
                    id="longBreakDuration"
                    min={5}
                    max={60}
                    step={1}
                    value={[longBreakDuration]}
                    onValueChange={(value) => handleLongBreakDurationChange(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Cycle Settings */}
          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle>Pomodoro Cycles</CardTitle>
              <CardDescription>Configure your cycle goals and long breaks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily Goal Cycles */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="goalCycles">Daily Goal Cycles</Label>
                  <span className="text-orange-500 font-medium">{goalCycles} cycles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Slider
                    id="goalCycles"
                    min={1}
                    max={10}
                    step={1}
                    value={[goalCycles]}
                    onValueChange={(value) => handleGoalCyclesChange(value[0])}
                    className="flex-1"
                  />
                </div>
              </div>
              
              {/* Cycles Before Long Break */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="cyclesBeforeLongBreak">Cycles Before Long Break</Label>
                  <span className="text-blue-500 font-medium">{cyclesBeforeLongBreak} cycles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Slider
                    id="cyclesBeforeLongBreak"
                    min={1}
                    max={10}
                    step={1}
                    value={[cyclesBeforeLongBreak]}
                    onValueChange={(value) => handleCyclesBeforeLongBreakChange(value[0])}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  After completing {cyclesBeforeLongBreak} work sessions, you'll get a {longBreakDuration} minute long break.
                </p>
              </div>
              
              {/* Notifications */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <Label htmlFor="notifications">Browser Notifications</Label>
                  <button
                    onClick={requestNotificationPermission}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      notificationsEnabled 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                    }`}
                  >
                    {notificationsEnabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Get notified when a session ends, even if this tab is in the background.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}