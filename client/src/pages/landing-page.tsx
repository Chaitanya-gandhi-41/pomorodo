import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { 
  Timer, 
  BarChart2, 
  Clock,
  Users,
  Zap,
  Bell,
  Sparkles,
  Cloud,
  CheckCircle
} from "lucide-react";

export default function LandingPage() {
  const { user, isLoading } = useAuth();
  
  // If user is logged in, redirect to the main app
  if (user && !isLoading) {
    return <Redirect to="/" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Navigation */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white mr-2">
              <span className="font-bold text-lg">BP</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              BeProd
            </span>
          </div>
          
          <div className="space-x-2">
            <Link href="/auth">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="w-full py-16 px-4 sm:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Focus Better. Achieve More.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
            BeProd helps you stay focused and productive with a customizable Pomodoro timer,
            work session tracking, and detailed productivity insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600 px-8">
                Get Started — It's Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Screenshot Section */}
      <section className="w-full py-8 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-[16/9] rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-1">
              <div className="h-full w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <div className="w-full max-w-md p-4">
                    <div className="rounded-full w-full h-2.5 bg-gray-200 dark:bg-gray-700 mb-4">
                      <div className="bg-orange-500 h-2.5 rounded-full w-3/4"></div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 flex flex-col items-center">
                      <div className="rounded-full w-32 h-32 border-8 border-orange-500 mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold">25:00</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Work Session</h3>
                      <div className="flex space-x-2 mt-4">
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-md">Start</div>
                        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md">Reset</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Features designed to boost your productivity
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Timer</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Set work sessions, short breaks, and long breaks to match your optimal focus pattern.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track your productivity with comprehensive session history and visual reports.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Long Break Intervals</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Automatically get longer breaks after completing multiple work sessions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Accounts</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Create your account to sync and access your productivity data from anywhere.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Notifications</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get browser notifications when sessions end, even when BeProd is in the background.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Easily switch between light and dark themes to reduce eye strain during long sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Boosting Your Productivity Today
          </h2>
          <p className="text-white text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their focus and accomplished more with the BeProd Pomodoro timer.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="font-medium px-8">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white mr-2">
              <span className="font-bold text-xs">BP</span>
            </div>
            <span className="text-md font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              BeProd
            </span>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} BeProd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}