"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeroCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  variant?: "default" | "rainbow" | "gradientBorder";
}

export default function HeroCard({
  title,
  subtitle,
  description,
  className,
  variant = "default",
}: HeroCardProps) {
  if (variant === "rainbow" || variant === "gradientBorder") {
    return (
      <div
        className={cn(
          "relative p-[1px] rounded-lg overflow-hidden rainbow-border hover:border-transparent",
          className
        )}
      >
        {/* Inner content wrapper with proper background */}
        <div
          className={cn(
            "w-full h-full bg-white dark:bg-[#141414] rounded-lg p-6 shadow-sm transition-colors duration-200",
            className?.includes("bg-") || className?.includes("border-")
              ? className
                  .split(" ")
                  .filter(
                    (c) =>
                      c.startsWith("bg-") ||
                      c.startsWith("dark:bg-") ||
                      c.startsWith("border")
                  )
                  .join(" ")
              : ""
          )}
        >
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          )}
          {subtitle && (
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
          {!title && !subtitle && !description && (
            <div className="h-16 flex items-center justify-center w-full">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Blank Card
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "w-full rounded-lg p-6 shadow-sm bg-white dark:bg-[#141414]",
        className
      )}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      {subtitle && (
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
          {subtitle}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>
      )}
      {!title && !subtitle && !description && (
        <div className="h-16 flex items-center justify-center w-full">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Blank Card</p>
        </div>
      )}
    </div>
  );
}
