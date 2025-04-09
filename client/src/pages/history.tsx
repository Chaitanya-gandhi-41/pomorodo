import { usePomodoro } from "@/hooks/usePomodoro";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { type PomodoroSession } from '@shared/schema';

export default function History() {
  const { completedCycles, goalCycles } = usePomodoro();
  
  // Fetch session history from database
  const { data: dbSessions = [], isLoading } = useQuery<PomodoroSession[]>({
    queryKey: ['/api/pomodoro-sessions'],
  });
  
  // Use the session history from state as fallback until DB data loads
  const { sessionHistory: localSessionHistory } = usePomodoro();
  
  // Use database sessions if available, otherwise use local sessions
  const sessionHistory = dbSessions.length > 0 ? 
    dbSessions.map(session => ({
      type: session.type as 'work' | 'break' | 'longBreak',
      name: session.name,
      duration: session.duration,
      completed: session.completed,
      timestamp: new Date(session.timestamp).getTime()
    })) : 
    localSessionHistory;

  // Prepare data for chart
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  }).reverse();

  const chartData = last7Days.map(date => {
    const dateStr = format(date, 'MM/dd');
    const dayStr = format(date, 'EEE');
    
    // Filter sessions for this date
    const sessionsOnDate = sessionHistory.filter(session => {
      const sessionDate = new Date(session.timestamp);
      return sessionDate.toDateString() === date.toDateString();
    });
    
    // Calculate total work and break minutes
    const totalWorkMinutes = sessionsOnDate
      .filter(s => s.type === 'work')
      .reduce((acc, s) => acc + Math.floor(s.duration / 60), 0);
      
    const totalBreakMinutes = sessionsOnDate
      .filter(s => s.type === 'break' || s.type === 'longBreak')
      .reduce((acc, s) => acc + Math.floor(s.duration / 60), 0);
    
    return {
      date: dateStr,
      day: dayStr,
      work: totalWorkMinutes,
      break: totalBreakMinutes
    };
  });
  
  // Sort sessions by most recent first
  const sortedSessions = [...sessionHistory].sort((a, b) => b.timestamp - a.timestamp);

  // Calculate statistics
  const totalWorkMinutes = sessionHistory
    .filter(s => s.type === 'work')
    .reduce((acc, s) => acc + Math.floor(s.duration / 60), 0);
    
  const totalSessions = sessionHistory.length;
  const totalCompletedCycles = completedCycles;
  
  const completionRate = goalCycles > 0 
    ? Math.round((completedCycles / goalCycles) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Productivity History</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Statistics Cards */}
        <Card className="bg-white dark:bg-slate-800 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-orange-500">{totalWorkMinutes}</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Minutes Focused</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-slate-800 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-green-500">{totalSessions}</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total Sessions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-slate-800 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-500">{completionRate}%</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Daily Goal Completion</p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {totalCompletedCycles} / {goalCycles} cycles
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Chart */}
      <Card className="bg-white dark:bg-slate-800 shadow-lg mb-8">
        <CardHeader>
          <CardTitle>7-Day Activity</CardTitle>
          <CardDescription>Your work/break balance over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.some(d => d.work > 0 || d.break > 0) ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }} 
                  />
                  <YAxis 
                    label={{ 
                      value: 'Minutes', 
                      angle: -90, 
                      position: 'insideLeft'
                    }} 
                    tick={{ fontSize: 12 }} 
                  />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="work" 
                    name="Work" 
                    stackId="a" 
                    fill="var(--work-color)" 
                  />
                  <Bar 
                    dataKey="break" 
                    name="Break" 
                    stackId="a" 
                    fill="var(--break-color)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">
              <p>Complete some sessions to see your activity chart.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Session History Table */}
      <Card className="bg-white dark:bg-slate-800 shadow-lg">
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>Recent completed sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedSessions.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Session Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSessions.map((session, index) => {
                    const sessionDate = new Date(session.timestamp);
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {format(sessionDate, 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              session.type === 'work'
                                ? 'bg-work/10 text-work'
                                : session.type === 'break'
                                  ? 'bg-break/10 text-break'
                                  : 'bg-long-break/10 text-long-break'
                            }`}
                          >
                            {session.type === 'work'
                              ? 'Work'
                              : session.type === 'break'
                                ? 'Short Break'
                                : 'Long Break'
                            }
                          </span>
                        </TableCell>
                        <TableCell>
                          {Math.floor(session.duration / 60)}:{(session.duration % 60).toString().padStart(2, '0')}
                        </TableCell>
                        <TableCell>{session.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">
              <p>No sessions completed yet. Start your first session!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}