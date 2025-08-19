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
    <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 flex items-center px-6 transition-colors duration-200">
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
              input: "text-xs h-full pr-8 dark:text-gray-200",
              inputWrapper:
                "h-8 bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-500 rounded-md min-h-8 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-gray-600",
              label: "text-xs text-gray-500 dark:text-gray-400",
            }}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
            <ChevronDown
              size={12}
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Center section - Search Input */}
      <div className="flex items-center flex-1 justify-center">
        {/* Search Input */}
        <div className="relative w-48 flex-shrink-0">
          <Input
            label="Search"
            type="text"
            size="sm"
            classNames={{
              base: "h-8",
              mainWrapper: "h-8",
              input: "text-xs h-full pr-8 dark:text-gray-200",
              inputWrapper:
                "h-8 bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-gray-500 rounded-md min-h-8 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-gray-600",
              label: "text-xs text-gray-500 dark:text-gray-400",
            }}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
            <ChevronDown
              size={12}
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Right section - Buttons and Avatar */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Upgrade Button */}
        <Button
          size="sm"
          className="rounded-md text-xs px-3 h-8 min-w-0 bg-black dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          Upgrade
        </Button>

        {/* Icon Buttons */}
        <Button
          variant="bordered"
          isIconOnly
          size="sm"
          className="rounded-md border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 h-8 w-8 min-w-8 bg-white dark:bg-gray-700 data-[hover=true]:bg-gray-50 dark:data-[hover=true]:bg-gray-600"
        >
          <Bell size={16} />
        </Button>

        <Button
          variant="bordered"
          isIconOnly
          size="sm"
          onClick={toggleTheme}
          className="rounded-md border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 h-8 w-8 min-w-8 bg-white dark:bg-gray-700 data-[hover=true]:bg-gray-50 dark:data-[hover=true]:bg-gray-600 transition-colors duration-200"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <Button
          variant="bordered"
          isIconOnly
          size="sm"
          className="rounded-md border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 h-8 w-8 min-w-8 bg-white dark:bg-gray-700 data-[hover=true]:bg-gray-50 dark:data-[hover=true]:bg-gray-600"
        >
          <Settings size={16} />
        </Button>

        {/* Avatar with Badge in circular form */}
        <div className="relative w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 flex items-center justify-center">
          <div className="relative">
            <Image
              src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
              alt="Avatar"
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
