import React from "react";
import { ThemeToggler } from "../theme-toggler";
import { Bell, User } from "lucide-react";

const TopBar = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-lg">My App</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <ThemeToggler />

        {/* Notifications */}
        <button className="relative p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* User */}
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
