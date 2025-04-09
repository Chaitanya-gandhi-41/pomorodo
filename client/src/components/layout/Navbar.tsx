import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={user ? "/app" : "/"}>
              <div className="flex items-center cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white mr-2">
                  <span className="font-bold text-lg">BP</span>
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  BeProd
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/app">
              <div className={`font-medium cursor-pointer ${isActive("/app") ? "text-orange-500" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"}`}>
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>Timer</span>
                </span>
              </div>
            </Link>
            <Link href="/settings">
              <div className={`font-medium cursor-pointer ${isActive("/settings") ? "text-orange-500" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"}`}>
                Settings
              </div>
            </Link>
            <Link href="/history">
              <div className={`font-medium cursor-pointer ${isActive("/history") ? "text-orange-500" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"}`}>
                History
              </div>
            </Link>
            
            <div className="flex items-center ml-4">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
              ) : user ? (
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {user.username}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    title="Logout"
                  >
                    {logoutMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/app">
              <div 
                className={`block px-3 py-2 rounded-md font-medium cursor-pointer ${
                  isActive("/app") 
                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/10 hover:text-orange-500"
                }`}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-1.5">
                  <Home className="h-4 w-4" />
                  <span>Timer</span>
                </span>
              </div>
            </Link>
            <Link href="/settings">
              <div 
                className={`block px-3 py-2 rounded-md font-medium cursor-pointer ${
                  isActive("/settings") 
                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/10 hover:text-orange-500"
                }`}
                onClick={closeMenu}
              >
                Settings
              </div>
            </Link>
            <Link href="/history">
              <div 
                className={`block px-3 py-2 rounded-md font-medium cursor-pointer ${
                  isActive("/history") 
                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/10 hover:text-orange-500"
                }`}
                onClick={closeMenu}
              >
                History
              </div>
            </Link>
            
            {/* Mobile auth section */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
              {isLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                </div>
              ) : user ? (
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Logged in as <span className="font-semibold">{user.username}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logoutMutation.mutate();
                        closeMenu();
                      }}
                      disabled={logoutMutation.isPending}
                      className="ml-2"
                    >
                      {logoutMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      <span className="ml-1">Logout</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/auth" onClick={closeMenu}>
                  <div className="px-3 py-2 flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>Login / Register</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}