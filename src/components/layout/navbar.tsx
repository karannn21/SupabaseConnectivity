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
    <header className="h-16 backdrop-blur-md bg-gray-100 dark:bg-[#141414] bg-grunge-texture  px-6 ">
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
          <div className="relative ">
            <Search
              className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10"
              size={18}
            />
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full h-10 pl-10 pr-4 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/50 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/70 dark:focus:bg-gray-800/70 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-3">
          {/* Bell Icon */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              <Bell size={18} className="text-gray-700 dark:text-gray-300" />
            </span>
          </Button>

          {/* Calendar Icon */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              <Calendar
                size={18}
                className="text-gray-700 dark:text-gray-300"
              />
            </span>
          </Button>

          {/* Upgrade Button */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300"
            )}
          >
            <span
              className="flex items-center justify-center w-full h-full 
              bg-black text-white 
              dark:bg-gray-900 dark:text-white
              rounded-lg px-4 py-2 gap-2 
              transition-all duration-300 text-sm font-medium shadow-lg"
            >
              <span className="text-yellow-400 animate-pulse">✨</span>
              <span>Upgrade</span>
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            onPress={toggleTheme}
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              {isDark ? (
                <Sun
                  size={18}
                  className="text-yellow-500 dark:text-yellow-400"
                />
              ) : (
                <Moon size={18} className="text-blue-600 dark:text-blue-400" />
              )}
            </span>
          </Button>

          {/* Settings */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10"
            )}
          >
            <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
              <Settings
                size={18}
                className="text-gray-700 dark:text-gray-300 hover:rotate-90 transition-transform duration-300"
              />
            </span>
          </Button>

          {/* Profile Avatar */}
          <Button
            className={cn(
              buttonVariants({ variant: "gradientBorder", size: "default" }),
              "rounded-full p-[1px] rainbow-border hover:scale-110 transition-all duration-300 w-10"
            )}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              ST
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
