import { X, CheckCircle, Bell } from "lucide-react";
import { useEffect } from "react";

interface NotificationBannerProps {
  isVisible: boolean;
  message: string;
  type: 'success' | 'info';
  onDismiss: () => void;
}

export default function NotificationBanner({
  isVisible,
  message,
  type,
  onDismiss,
}: NotificationBannerProps) {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-4 right-4 left-4 md:left-auto md:w-80 p-4 rounded-lg shadow-lg flex items-center justify-between animate-pulse-slow ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-500 text-white'
      }`}
    >
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : (
          <Bell className="h-5 w-5 mr-2" />
        )}
        <span>{message}</span>
      </div>
      <button 
        className="ml-4 text-white"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
