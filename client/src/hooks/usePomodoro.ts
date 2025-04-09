import { useState, useRef, useEffect } from 'react';

export type SessionType = 'work' | 'break';

interface PomodoroState {
  isRunning: boolean;
  currentSession: SessionType;
  timeRemaining: number;
  progress: number;
  workDuration: number;
  breakDuration: number;
  completedCycles: number;
  goalCycles: number;
  notification: {
    isVisible: boolean;
    message: string;
    type: 'success' | 'info';
  };
}

const DEFAULT_WORK_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;
const DEFAULT_GOAL_CYCLES = 4;

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>({
    isRunning: false,
    currentSession: 'work',
    timeRemaining: DEFAULT_WORK_DURATION * 60,
    progress: 0,
    workDuration: DEFAULT_WORK_DURATION,
    breakDuration: DEFAULT_BREAK_DURATION,
    completedCycles: 0,
    goalCycles: DEFAULT_GOAL_CYCLES,
    notification: {
      isVisible: false,
      message: '',
      type: 'info',
    },
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
    const totalDuration = state.currentSession === 'work' 
      ? state.workDuration * 60 
      : state.breakDuration * 60;
    
    const newProgress = 1 - (state.timeRemaining / totalDuration);
    setState(prev => ({ ...prev, progress: newProgress }));
  }, [state.timeRemaining, state.currentSession, state.workDuration, state.breakDuration]);

  // Start timer
  const startTimer = () => {
    if (timerRef.current !== null) return;

    timerRef.current = window.setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 0) {
          // Session completed
          const nextSession = prev.currentSession === 'work' ? 'break' : 'work';
          
          // Play sound
          if (prev.currentSession === 'work') {
            if (workSoundRef.current) workSoundRef.current.play();
          } else {
            if (breakSoundRef.current) breakSoundRef.current.play();
          }
          
          // Calculate new cycles if work session just ended
          const newCompletedCycles = 
            prev.currentSession === 'work' 
              ? prev.completedCycles 
              : prev.completedCycles + 1;
          
          // Show notification
          const message = nextSession === 'work'
            ? 'Work time! Focus on your task.'
            : 'Break time! Take some rest.';
            
          return {
            ...prev,
            currentSession: nextSession,
            timeRemaining: nextSession === 'work'
              ? prev.workDuration * 60
              : prev.breakDuration * 60,
            completedCycles: newCompletedCycles,
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
    setGoalCycles,
    dismissNotification,
  };
}
