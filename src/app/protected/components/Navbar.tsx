import React from "react";
import { Input } from "@heroui/input";
import { ChevronDown, Bell, Moon, Settings } from "lucide-react";
import { Button } from "@heroui/button";
import { Badge, Avatar } from "@heroui/react"; // import Badge and Avatar

export default function Navbar() {
  return (
    <div>
      <header className="h-14 bg-white border-b border-gray-300 flex items-center px-6 space-x-4">
        {/* Name & Date section */}
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-sm font-semibold text-gray-800">
            Hi, Sachin
          </span>
          <span className="text-xs text-gray-500 -mt-0.5">13/08/2025</span>
        </div>

        {/* Inputs and buttons */}
        <div className="flex items-center space-x-3 text-xs flex-1">
          {/* First Input */}
          <div className="relative w-48">
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <Input
              label="Position"
              type="email"
              className="bg-gray-100 border border-gray-400 rounded-md pl-3 w-full text-xs h-8"
            />
            <style jsx global>{`
              label {
                color: #a3a3a3 !important;
                font-size: 0.75rem !important;
              }
            `}</style>
          </div>

          {/* Second Input */}
          <div className="relative w-48">
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <Input
              label="Search"
              type="email"
              className="bg-gray-100 border border-gray-400 rounded-md pl-3 w-full text-xs h-8"
            />
          </div>

          {/* Buttons */}
          <Button color="primary" className="rounded-md text-sm px-3 h-8">
            Upgrade
          </Button>

          <Button
            color="primary"
            className="flex items-center space-x-2 rounded-md bg-white border border-gray-400 text-gray-800 px-2 h-8"
          >
            <Bell size={16} />
          </Button>

          <Button
            color="primary"
            className="flex items-center space-x-2 rounded-md bg-white border border-gray-400 text-gray-800 px-2 h-8"
          >
            <Moon size={16} />
          </Button>

          <Button
            color="primary"
            className="flex items-center space-x-2 rounded-md bg-white border border-gray-400 text-gray-800 px-2 h-8"
          >
            <Settings size={16} />
          </Button>

          {/* Avatar with Badge at the far right */}
          <Badge color="primary" size="md" className="ml-4">
            <Avatar
              radius="full"
              size="md"
              src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
            />
          </Badge>
        </div>
      </header>
    </div>
  );
}
