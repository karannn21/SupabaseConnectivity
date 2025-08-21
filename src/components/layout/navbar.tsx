"use client";

import React from "react";
import { Search, Bell, Calendar, Sun, Moon, Settings } from "lucide-react";
import { Button } from "@heroui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { useTheme } from "@/components/providers/theme-provider";

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6">
      <div className="flex items-center justify-between h-full max-w-full">
        {/* Left Section - Greeting */}
        <div className="flex items-center space-x-4 min-w-0">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hi, Sachin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {`Today's date January 01, 2025`}
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10"
              size={18}
            />
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-3">
          {/* Bell Icon */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "icon" }),
              "p-[1px] rainbow-border border border-gray-200 dark:border-gray-800 hover:border-transparent"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
              <Bell size={18} className="text-gray-700 dark:text-gray-300" />
            </span>
          </Button>

          {/* Calendar Icon */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "icon" }),
              "p-[1px] rainbow-border border border-gray-200 dark:border-gray-800 hover:border-transparent"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
              <Calendar
                size={18}
                className="text-gray-700 dark:text-gray-300"
              />
            </span>
          </Button>

          {/* Upgrade Button */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder" }),
              "p-[1px] rainbow-border border border-gray-200 dark:border-gray-800 hover:border-transparent"
            )}
          >
            <span
              className="flex items-center justify-center w-full h-full 
              bg-black text-white 
              dark:bg-gray-900 dark:text-white
              rounded-lg px-4 py-1.5 gap-2 
              transition-colors duration-200 text-sm font-medium"
            >
              <span className="text-yellow-500">✨</span>
              <span>Upgrade</span>
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "icon" }),
              "p-[1px] rainbow-border border border-gray-200 dark:border-gray-800 hover:border-transparent"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
              {isDark ? (
                <Sun size={18} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon size={18} className="text-gray-700 dark:text-gray-300" />
              )}
            </span>
          </Button>

          {/* Settings */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "icon" }),
              "p-[1px] rainbow-border border border-gray-200 dark:border-gray-800 hover:border-transparent"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900 rounded-lg transition-colors duration-200">
              <Settings
                size={18}
                className="text-gray-700 dark:text-gray-300"
              />
            </span>
          </Button>

          {/* Profile Avatar */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "icon" }),
              "rounded-full p-0 rainbow-border"
            )}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              ST
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
