import { useState, useRef, useEffect } from 'react';

export type SessionType = 'work' | 'break' | 'longBreak';

interface PomodoroState {
  isRunning: boolean;
  currentSession: SessionType;
  sessionName: string;
  timeRemaining: number;
  progress: number;
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  completedCycles: number;
  goalCycles: number;
  cyclesBeforeLongBreak: number;
  notification: {
    isVisible: boolean;
    message: string;
    type: 'success' | 'info';
  };
  sessionHistory: {
    type: SessionType;
    name: string;
    duration: number;
    completed: boolean;
    timestamp: number;
  }[];
}

const DEFAULT_WORK_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;
const DEFAULT_LONG_BREAK_DURATION = 15;
const DEFAULT_GOAL_CYCLES = 4;
const DEFAULT_CYCLES_BEFORE_LONG_BREAK = 4;

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>({
    isRunning: false,
    currentSession: 'work',
    sessionName: 'Work Session',
    timeRemaining: DEFAULT_WORK_DURATION * 60,
    progress: 0,
    workDuration: DEFAULT_WORK_DURATION,
    breakDuration: DEFAULT_BREAK_DURATION,
    longBreakDuration: DEFAULT_LONG_BREAK_DURATION,
    completedCycles: 0,
    goalCycles: DEFAULT_GOAL_CYCLES,
    cyclesBeforeLongBreak: DEFAULT_CYCLES_BEFORE_LONG_BREAK,
    notification: {
      isVisible: false,
      message: '',
      type: 'info',
    },
    sessionHistory: [],
  });

  const timerRef = useRef<number | null>(null);
  const workSoundRef = useRef<HTMLAudioElement | null>(null);
  const breakSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    workSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
    breakSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Calculate progress
  useEffect(() => {
    const totalDuration = 
      state.currentSession === 'work' 
        ? state.workDuration * 60 
        : state.currentSession === 'break'
          ? state.breakDuration * 60
          : state.longBreakDuration * 60;
    
    const newProgress = 1 - (state.timeRemaining / totalDuration);
    setState(prev => ({ ...prev, progress: newProgress }));
  }, [state.timeRemaining, state.currentSession, state.workDuration, state.breakDuration, state.longBreakDuration]);

  // Get session duration based on type
  const getSessionDuration = (sessionType: SessionType): number => {
    switch(sessionType) {
      case 'work':
        return state.workDuration;
      case 'break':
        return state.breakDuration;
      case 'longBreak':
        return state.longBreakDuration;
      default:
        return state.workDuration;
    }
  };

  // Get session name based on type
  const getDefaultSessionName = (sessionType: SessionType): string => {
    switch(sessionType) {
      case 'work':
        return 'Work Session';
      case 'break':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Session';
    }
  };

  // Start timer
  const startTimer = () => {
    if (timerRef.current !== null) return;

    timerRef.current = window.setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 0) {
          // Record completed session in history
          const completedSession = {
            type: prev.currentSession,
            name: prev.sessionName,
            duration: getSessionDuration(prev.currentSession) * 60 - prev.timeRemaining,
            completed: true,
            timestamp: Date.now()
          };
          
          // Determine next session type
          let nextSession: SessionType = 'work';
          let newCompletedCycles = prev.completedCycles;
          
          if (prev.currentSession === 'work') {
            // If work just finished, increment completed cycles
            newCompletedCycles = prev.completedCycles + 1;
            
            // Check if it's time for a long break
            if (newCompletedCycles > 0 && newCompletedCycles % prev.cyclesBeforeLongBreak === 0) {
              nextSession = 'longBreak';
            } else {
              nextSession = 'break';
            }
          } else {
            // After any break, go back to work
            nextSession = 'work';
          }
          
          // Play sound
          if (prev.currentSession === 'work') {
            if (breakSoundRef.current) breakSoundRef.current.play();
          } else {
            if (workSoundRef.current) workSoundRef.current.play();
          }
          
          // Create notification message
          let message = '';
          if (nextSession === 'work') {
            message = 'Work time! Focus on your task.';
          } else if (nextSession === 'break') {
            message = 'Break time! Take a short rest.';
          } else {
            message = 'Long break time! Take a good rest.';
          }
          
          // Get the appropriate duration for the next session
          const nextSessionDuration = getSessionDuration(nextSession);
          const nextSessionName = getDefaultSessionName(nextSession);
            
          return {
            ...prev,
            currentSession: nextSession,
            sessionName: nextSessionName,
            timeRemaining: nextSessionDuration * 60,
            completedCycles: newCompletedCycles,
            sessionHistory: [...prev.sessionHistory, completedSession],
            notification: {
              isVisible: true,
              message,
              type: nextSession === 'work' ? 'info' : 'success',
            },
          };
        }
        
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);
    
    setState(prev => ({ ...prev, isRunning: true }));
  };

  // Pause timer
  const pauseTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setState(prev => ({ ...prev, isRunning: false }));
  };

  // Reset timer
  const resetTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setState(prev => ({
      ...prev,
      isRunning: false,
      currentSession: 'work',
      sessionName: getDefaultSessionName('work'),
      timeRemaining: prev.workDuration * 60,
      completedCycles: 0,
      notification: {
        isVisible: false,
        message: '',
        type: 'info',
      },
    }));
  };

  // Toggle timer (start/pause)
  const toggleTimer = () => {
    if (state.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  // Update work duration
  const setWorkDuration = (duration: number) => {
    if (duration < 1) duration = 1;
    if (duration > 60) duration = 60;
    
    setState(prev => {
      // If timer is not running and current session is work, update time remaining
      const newTimeRemaining = 
        !prev.isRunning && prev.currentSession === 'work'
          ? duration * 60
          : prev.timeRemaining;
          
      return {
        ...prev,
        workDuration: duration,
        timeRemaining: newTimeRemaining,
      };
    });
  };

  // Update break duration
  const setBreakDuration = (duration: number) => {
    if (duration < 1) duration = 1;
    if (duration > 30) duration = 30;
    
    setState(prev => {
      // If timer is not running and current session is break, update time remaining
      const newTimeRemaining = 
        !prev.isRunning && prev.currentSession === 'break'
          ? duration * 60
          : prev.timeRemaining;
          
      return {
        ...prev,
        breakDuration: duration,
        timeRemaining: newTimeRemaining,
      };
    });
  };

  // Update goal cycles
  const setGoalCycles = (cycles: number) => {
    if (cycles < 1) cycles = 1;
    if (cycles > 10) cycles = 10;
    
    setState(prev => ({
      ...prev,
      goalCycles: cycles,
    }));
  };
  
  // Update long break duration
  const setLongBreakDuration = (duration: number) => {
    if (duration < 5) duration = 5;
    if (duration > 60) duration = 60;
    
    setState(prev => {
      // If timer is not running and current session is longBreak, update time remaining
      const newTimeRemaining = 
        !prev.isRunning && prev.currentSession === 'longBreak'
          ? duration * 60
          : prev.timeRemaining;
          
      return {
        ...prev,
        longBreakDuration: duration,
        timeRemaining: newTimeRemaining,
      };
    });
  };
  
  // Update cycles before long break
  const setCyclesBeforeLongBreak = (cycles: number) => {
    if (cycles < 1) cycles = 1;
    if (cycles > 10) cycles = 10;
    
    setState(prev => ({
      ...prev,
      cyclesBeforeLongBreak: cycles,
    }));
  };
  
  // Update session name
  const setSessionName = (name: string) => {
    setState(prev => ({
      ...prev,
      sessionName: name,
    }));
  };

  // Dismiss notification
  const dismissNotification = () => {
    setState(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        isVisible: false,
      },
    }));
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    ...state,
    formattedTime: formatTime(state.timeRemaining),
    toggleTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
    setLongBreakDuration,
    setGoalCycles,
    setCyclesBeforeLongBreak,
    setSessionName,
    dismissNotification,
    getDefaultSessionName,
  };
}
