import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";
import { SessionType } from "@/hooks/usePomodoro";

interface SessionNameInputProps {
  currentSession: SessionType;
  sessionName: string;
  onNameChange: (name: string) => void;
  getDefaultSessionName: (type: SessionType) => string;
}

export default function SessionNameInput({
  currentSession,
  sessionName,
  onNameChange,
  getDefaultSessionName
}: SessionNameInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(sessionName);
  
  useEffect(() => {
    // Update local state when session name changes (e.g., when session type changes)
    setInputValue(sessionName);
  }, [sessionName]);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveClick = () => {
    if (inputValue.trim() === '') {
      // If empty, set to default name
      const defaultName = getDefaultSessionName(currentSession);
      onNameChange(defaultName);
      setInputValue(defaultName);
    } else {
      onNameChange(inputValue);
    }
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(sessionName);
    }
  };
  
  return (
    <div className="flex items-center space-x-2 mb-2">
      {isEditing ? (
        <div className="flex items-center w-full">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={getDefaultSessionName(currentSession)}
            className="flex-1 border-gray-300 dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400"
            autoFocus
          />
          <button
            onClick={handleSaveClick}
            className="ml-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Check className="h-5 w-5 text-green-500" />
          </button>
        </div>
      ) : (
        <div className="flex items-center w-full justify-between">
          <h2 className="text-xl font-medium flex-1">{sessionName}</h2>
          <button
            onClick={handleEditClick}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Edit session name"
          >
            <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}