import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

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
            <Link href="/">
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
            <Link href="/">
              <div className={`font-medium cursor-pointer ${isActive("/") ? "text-orange-500" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"}`}>
                Timer
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
            <Link href="/">
              <div 
                className={`block px-3 py-2 rounded-md font-medium cursor-pointer ${
                  isActive("/") 
                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-500" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/10 hover:text-orange-500"
                }`}
                onClick={closeMenu}
              >
                Timer
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
          </div>
        </div>
      )}
    </nav>
  );
}