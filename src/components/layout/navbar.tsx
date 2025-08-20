"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@heroui/input";
import { ChevronDown, Bell, Moon, Sun, Settings } from "lucide-react";
import { Button } from "@heroui/button";
import { useTheme } from "@/components/providers/theme-provider";

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header
      className="h-14 relative overflow-hidden border-b border-white/8 dark:border-white/5 flex items-center px-6 transition-all duration-500
      bg-white/85 backdrop-blur-2xl backdrop-saturate-180
      dark:bg-gray-950/85 dark:backdrop-blur-2xl dark:backdrop-saturate-150
      before:absolute before:inset-0 before:bg-gradient-to-b
      before:from-white/15 before:via-white/8 before:to-white/3
      dark:before:from-white/6 dark:before:via-white/2 dark:before:to-transparent
      before:opacity-70 dark:before:opacity-90
      after:absolute after:inset-x-0 after:top-0 after:h-[0.5px]
      after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent
      dark:after:via-white/12
      shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      [backdrop-filter:blur(40px)_saturate(1.8)]
      dark:[backdrop-filter:blur(40px)_saturate(1.5)]
      supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:dark:bg-gray-950/75"
    >
      {/* Content wrapper to ensure everything is above the background effects */}
      <div className="relative z-10 flex items-center w-full">
        {/* Left section - Name & Position Input */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
              Hi, Sachin
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
              13/08/2025
            </span>
          </div>

          {/* Position Input */}
          <div className="relative w-48 flex-shrink-0">
            <Input
              label="Position"
              type="text"
              size="sm"
              classNames={{
                base: "h-8",
                mainWrapper: "h-8",
                input:
                  "text-xs h-full pr-8 text-gray-800 dark:text-gray-200 bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400",
                inputWrapper:
                  "h-8 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-400/80 dark:border-white/15 rounded-2xl min-h-8 shadow-md relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/50 before:via-white/25 before:to-transparent dark:before:from-white/15 dark:before:via-white/8 dark:before:to-transparent before:opacity-70 data-[hover=true]:bg-white/80 dark:data-[hover=true]:bg-white/15 data-[focus=true]:bg-white/80 dark:data-[focus=true]:bg-white/15 data-[focus=true]:border-gray-500/90 dark:data-[focus=true]:border-white/25",
                label: "text-xs text-gray-700 dark:text-gray-300 font-medium",
              }}
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-20">
              <ChevronDown
                size={12}
                className="text-gray-700 dark:text-gray-300 drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Center section - Search Input */}
        <div className="flex items-center flex-1 justify-center">
          <div className="relative w-48 flex-shrink-0">
            <Input
              label="Search"
              type="text"
              size="sm"
              classNames={{
                base: "h-8",
                mainWrapper: "h-8",
                input:
                  "text-xs h-full pr-8 text-gray-800 dark:text-gray-200 bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400",
                inputWrapper:
                  "h-8 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-400/80 dark:border-white/15 rounded-2xl min-h-8 shadow-md relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/50 before:via-white/25 before:to-transparent dark:before:from-white/15 dark:before:via-white/8 dark:before:to-transparent before:opacity-70 data-[hover=true]:bg-white/80 dark:data-[hover=true]:bg-white/15 data-[focus=true]:bg-white/80 dark:data-[focus=true]:bg-white/15 data-[focus=true]:border-gray-500/90 dark:data-[focus=true]:border-white/25",
                label: "text-xs text-gray-700 dark:text-gray-300 font-medium",
              }}
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-20">
              <ChevronDown
                size={12}
                className="text-gray-700 dark:text-gray-300 drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right section - Buttons and Avatar */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Upgrade Button */}
          <Button
            size="sm"
            className="rounded-2xl text-xs px-4 h-8 min-w-0 relative overflow-hidden
              bg-white/70 dark:bg-white/10
              backdrop-blur-xl border border-gray-400/80 dark:border-white/20
              text-gray-800 dark:text-white shadow-lg
              before:absolute before:inset-0 before:bg-gradient-to-tr
              before:from-white/60 before:via-white/30 before:to-transparent
              dark:before:from-white/20 dark:before:via-white/10 dark:before:to-transparent
              before:opacity-80
              after:absolute after:inset-x-0 after:top-0 after:h-[0.5px]
              after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent
              dark:after:via-white/30
              hover:bg-white/80 dark:hover:bg-white/15
              hover:border-gray-500/90 dark:hover:border-white/25
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300 ease-out"
          >
            <span className="relative z-10 font-medium">Upgrade</span>
          </Button>

          {/* Icon Buttons */}
          <Button
            variant="bordered"
            isIconOnly
            size="sm"
            className="rounded-2xl h-9 w-9 min-w-9 relative overflow-hidden
              bg-white/60 dark:bg-white/10
              backdrop-blur-xl border border-gray-400/80 dark:border-white/15
              text-gray-700 dark:text-gray-200 shadow-md
              before:absolute before:inset-0 before:bg-gradient-to-tr
              before:from-white/50 before:via-white/25 before:to-transparent
              dark:before:from-white/15 dark:before:via-white/8 dark:before:to-transparent
              before:opacity-70
              hover:bg-white/70 dark:hover:bg-white/15
              hover:border-gray-500/90 dark:hover:border-white/20
              hover:scale-[1.05] active:scale-[0.95]
              transition-all duration-300 ease-out"
          >
            <Bell size={16} className="relative z-10 drop-shadow-sm" />
          </Button>

          <Button
            variant="bordered"
            isIconOnly
            size="sm"
            onClick={toggleTheme}
            className="rounded-2xl h-9 w-9 min-w-9 relative overflow-hidden
              bg-white/60 dark:bg-white/10
              backdrop-blur-xl border border-gray-400/80 dark:border-white/15
              text-gray-700 dark:text-gray-200 shadow-md
              before:absolute before:inset-0 before:bg-gradient-to-tr
              before:from-white/50 before:via-white/25 before:to-transparent
              dark:before:from-white/15 dark:before:via-white/8 dark:before:to-transparent
              before:opacity-70
              hover:bg-white/70 dark:hover:bg-white/15
              hover:border-gray-500/90 dark:hover:border-white/20
              hover:scale-[1.05] active:scale-[0.95]
              transition-all duration-300 ease-out"
          >
            {isDark ? (
              <Sun size={16} className="relative z-10 drop-shadow-sm" />
            ) : (
              <Moon size={16} className="relative z-10 drop-shadow-sm" />
            )}
          </Button>

          <Button
            variant="bordered"
            isIconOnly
            size="sm"
            className="rounded-2xl h-9 w-9 min-w-9 relative overflow-hidden
              bg-white/60 dark:bg-white/10
              backdrop-blur-xl border border-gray-400/80 dark:border-white/15
              text-gray-700 dark:text-gray-200 shadow-md
              before:absolute before:inset-0 before:bg-gradient-to-tr
              before:from-white/50 before:via-white/25 before:to-transparent
              dark:before:from-white/15 dark:before:via-white/8 dark:before:to-transparent
              before:opacity-70
              hover:bg-white/70 dark:hover:bg-white/15
              hover:border-gray-500/90 dark:hover:border-white/20
              hover:scale-[1.05] active:scale-[0.95]
              transition-all duration-300 ease-out"
          >
            <Settings size={16} className="relative z-10 drop-shadow-sm" />
          </Button>

          {/* Avatar */}
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden
            bg-white/60 dark:bg-white/10
            backdrop-blur-xl border-2 border-gray-400/80 dark:border-white/20
            shadow-lg
            before:absolute before:inset-0 before:bg-gradient-to-tr
            before:from-white/50 before:via-white/25 before:to-transparent
            dark:before:from-white/20 dark:before:via-white/10 dark:before:to-transparent
            before:opacity-70 before:rounded-full
            after:absolute after:inset-0 after:rounded-full
            after:bg-gradient-radial after:from-white/30 after:to-transparent
            dark:after:from-white/10
            after:opacity-50
            hover:scale-[1.03] active:scale-[0.97]
            transition-all duration-300 ease-out"
          >
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                alt="Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
