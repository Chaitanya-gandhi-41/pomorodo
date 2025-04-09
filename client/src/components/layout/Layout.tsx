import Navbar from "./Navbar";
import FloatingThemeToggle from "./FloatingThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans">
      <Navbar />
      {children}
      <FloatingThemeToggle />
    </div>
  );
}