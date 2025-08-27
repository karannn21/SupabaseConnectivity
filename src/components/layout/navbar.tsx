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
    <>
      <style>{`
        /* Pendulum animation for bell */
        @keyframes pendulum {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
        .bell-button:hover .bell-pendulum {
          animation: pendulum 0.8s ease-in-out infinite;
          transform-origin: top center;
        }

        /* Wiggle animation for calendar */
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .calendar-button:hover .calendar-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }

        /* Shake animation for upgrade sparkle */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1px); }
          75% { transform: translateX(1px); }
        }
        .upgrade-button:hover .sparkle-shake {
          animation: shake 0.4s ease-in-out infinite;
        }

        /* Float animation for upgrade text */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        .upgrade-button:hover .text-float {
          animation: float 1s ease-in-out infinite;
        }

        /* Pulse animation for theme icons */
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        .theme-button:hover .theme-pulse {
          animation: pulse 1.2s ease-in-out infinite;
        }

        /* Bounce animation for profile */
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .profile-button:hover .profile-bounce {
          animation: gentleBounce 0.6s ease-in-out infinite;
        }

        /* Settings spin animation */
        @keyframes settingsSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .settings-button:hover .settings-spin {
          animation: settingsSpin 1s ease-in-out infinite;
        }
      `}</style>

      <header className="h-16 backdrop-blur-md bg-gray-100 dark:bg-[#141414] bg-grunge-texture px-6">
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
          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              {/* Gradient border wrapper - same as button */}
              <div
                className={cn(
                  buttonVariants({
                    variant: "gradientBorder",
                    size: "default",
                  }),
                  "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 rounded-lg"
                )}
              >
                {/* Inner solid background, same as button inner */}
                <div className="flex items-center w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-lg px-3">
                  <Search
                    size={18}
                    className="text-gray-500 dark:text-gray-400 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    className="flex-1 bg-transparent focus:outline-none 
            text-sm text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions and Profile */}
          <div className="flex items-center space-x-3">
            {/* Bell Icon */}
            <Button
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10 bell-button"
              )}
            >
              <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                <Bell
                  size={18}
                  className="text-gray-700 dark:text-gray-300 transition-all duration-300 bell-pendulum"
                />
              </span>
            </Button>

            {/* Calendar Icon */}
            <Button
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10 calendar-button"
              )}
            >
              <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                <Calendar
                  size={18}
                  className="text-gray-700 dark:text-gray-300 calendar-wiggle transition-all duration-300"
                />
              </span>
            </Button>

            {/* Upgrade Button */}
            <Button
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 upgrade-button"
              )}
            >
              <span
                className="flex items-center justify-center w-full h-full 
                bg-black text-white 
                dark:bg-white dark:text-black
                rounded-lg px-4 py-2 gap-2 
                transition-all duration-300 text-sm font-medium shadow-lg"
              >
                <span className="text-yellow-400 sparkle-shake">✨</span>
                <span className="text-float">Upgrade</span>
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              onPress={toggleTheme}
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10 theme-button"
              )}
            >
              <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                {isDark ? (
                  <Sun
                    size={18}
                    className="text-yellow-500 dark:text-yellow-400 theme-pulse transition-all duration-300"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-blue-600 dark:text-blue-400 theme-pulse transition-all duration-300"
                  />
                )}
              </span>
            </Button>

            {/* Settings */}
            <Button
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "p-[1px] rainbow-border hover:border-transparent hover:scale-105 transition-all duration-300 w-10 settings-button"
              )}
            >
              <span className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-300">
                <Settings
                  size={18}
                  className="text-gray-700 dark:text-gray-300 settings-spin transition-all duration-300"
                />
              </span>
            </Button>

            {/* Profile Avatar */}
            <Button
              className={cn(
                buttonVariants({ variant: "gradientBorder", size: "default" }),
                "rounded-full p-[1px] rainbow-border hover:scale-110 transition-all duration-300 w-10 profile-button"
              )}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg profile-bounce">
                ST
              </div>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
