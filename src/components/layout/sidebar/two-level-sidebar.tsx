"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { sidebarItems } from "./sidebar-config";
import Navbar from "../navbar";
import { SubItem } from "@/types/sidebar";

export default function TwoLevelSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  const handleIconClick = (itemId: string) => {
    if (activeItem === itemId && isSecondaryOpen) {
      setIsSecondaryOpen(false);
      setActiveItem(null);
      setActiveSecondary(null);
      setExpandedSubItem(null);
    } else {
      setActiveItem(itemId);
      setIsSecondaryOpen(true);
      setActiveSecondary(null);
      setExpandedSubItem(null);
    }
  };

  const toggleSecondary = () => {
    if (!isSecondaryOpen) {
      // Opening sidebar → default to Dashboard
      if (!activeItem) {
        const dashboardItem = sidebarItems.find(
          (item) => item.label.toLowerCase() === "dashboard"
        );
        if (dashboardItem) {
          setActiveItem(dashboardItem.id);
        }
      }
    }
    setIsSecondaryOpen((prev) => !prev);
  };

  const handleSubItemClick = (sub: SubItem) => {
    if (sub.subItems) {
      // If clicking on Candidate again → toggle expand/collapse
      if (expandedSubItem === sub.label) {
        setExpandedSubItem(null);
        // Don't clear activeSecondary, keep showing the previously selected nested item
      } else {
        setExpandedSubItem(sub.label);
        // Auto-select the first sub-item when expanding
        if (sub.subItems.length > 0) {
          setActiveSecondary(sub.subItems[0].label);
        }
      }
    } else {
      // When clicking on other items (Overview, Jobs, Settings), close expanded sub-items
      setActiveSecondary(sub.label);
      setExpandedSubItem(null);
    }
  };

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Primary Sidebar - Fixed width, no layout shifts */}
      <div className="w-16 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 flex flex-col items-center py-4 shadow-sm relative z-20 flex-shrink-0 transition-colors duration-200">
        {/* Logo */}
        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 flex items-center justify-center transition-colors duration-200">
          <Image
            src="/talent.png"
            alt="Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>

        {/* Navigation Icons */}
        <div className="space-y-2 mt-8">
          {sidebarItems.map((item) => {
            const Icon =
              activeItem === item.id ? item.iconSolid : item.iconOutline;
            return (
              <button
                key={item.id}
                onClick={() => handleIconClick(item.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 border-2 ${
                  activeItem === item.id
                    ? "border-blue-500 text-blue-500 bg-transparent"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={item.label}
              >
                <Icon
                  className="h-5 w-5"
                  fill={activeItem === item.id ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Sidebar Container - Always reserves space */}
      <div
        className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSecondaryOpen ? "w-64" : "w-0"
        }`}
      >
        {/* Secondary Sidebar Content - Slides in/out */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out overflow-hidden shadow-lg z-10 ${
            isSecondaryOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
        >
          {activeItemData && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-start p-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {activeItemData.label}
                </h1>
              </div>

              <div className="flex-1 overflow-y-auto p-4 text-gray-800 dark:text-gray-200 text-lg">
                {activeItemData.subItems.map((sub) => {
                  const isActiveParent = activeSecondary === sub.label;
                  const hasActiveNestedChild = sub.subItems?.some(
                    (nested) => activeSecondary === nested.label
                  );
                  const shouldShowAsActive =
                    isActiveParent || hasActiveNestedChild;

                  const isExpanded = expandedSubItem === sub.label;

                  return (
                    <div key={sub.label} className="mb-1">
                      {/* Parent Subitem - Fixed border to prevent layout shifts */}
                      <div
                        className={`cursor-pointer p-2 flex items-center justify-between transition-all duration-200 rounded-lg border-2 ${
                          shouldShowAsActive
                            ? "border-blue-500 text-blue-500 bg-transparent"
                            : "border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => handleSubItemClick(sub)}
                      >
                        <div className="flex items-center">
                          <sub.icon className="inline-block mr-2 h-5 w-5 flex-shrink-0" />
                          <span className="truncate">{sub.label}</span>
                        </div>
                        {sub.subItems && (
                          <div className="ml-2 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDownIcon className="h-4 w-4 text-current transition-transform duration-200" />
                            ) : (
                              <ChevronRightIcon className="h-4 w-4 text-current transition-transform duration-200" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Nested Children - Smooth height animation */}
                      {sub.subItems && (
                        <div
                          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={{
                            transitionProperty: "max-height, opacity",
                          }}
                        >
                          <div className="py-1">
                            {sub.subItems.map((nested, index) => {
                              const isNestedActive =
                                activeSecondary === nested.label;
                              const isLast = index === sub.subItems!.length - 1;
                              const hasActiveItemBelow = sub
                                .subItems!.slice(index + 1)
                                .some((item) => activeSecondary === item.label);

                              return (
                                <div
                                  key={nested.label}
                                  className="relative flex items-center"
                                >
                                  {/* Vertical line above */}
                                  {!isLast && (
                                    <>
                                      <div
                                        className={`absolute left-0 top-0 w-0.5 h-[50%] transition-colors duration-200 ${
                                          isNestedActive || hasActiveItemBelow
                                            ? "bg-blue-500"
                                            : "bg-gray-400 dark:bg-gray-500"
                                        }`}
                                      />

                                      <div
                                        className={`absolute left-0 top-[50%] w-0.5 h-[50%] transition-colors duration-200 ${
                                          hasActiveItemBelow
                                            ? "bg-blue-500"
                                            : "bg-gray-400 dark:bg-gray-500"
                                        }`}
                                      />
                                    </>
                                  )}

                                  {isLast && (
                                    <div
                                      className={`absolute left-0 top-0 w-0.5 h-[40%] transition-colors duration-200 ${
                                        isNestedActive
                                          ? "bg-blue-500"
                                          : "bg-gray-400 dark:bg-gray-500"
                                      }`}
                                    />
                                  )}

                                  {/* Rounded corner with increased spacing */}
                                  <div
                                    className={`absolute left-0 top-[0.1rem] w-7 h-6 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-200 ${
                                      isNestedActive || hasActiveItemBelow
                                        ? "border-l-blue-500"
                                        : "border-l-gray-400 dark:border-l-gray-500"
                                    } ${
                                      isNestedActive
                                        ? "border-b-blue-500"
                                        : "border-b-gray-400 dark:border-b-gray-500"
                                    }`}
                                  />

                                  {/* Text with consistent padding */}
                                  <button
                                    type="button"
                                    className={`cursor-pointer p-2 pl-10 transition-all duration-200 rounded flex-1 min-w-0 text-left w-full ${
                                      isNestedActive
                                        ? "text-blue-500 font-medium bg-transparent"
                                        : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    }`}
                                    onClick={() =>
                                      setActiveSecondary(nested.label)
                                    }
                                  >
                                    <span className="truncate block">
                                      {nested.label}
                                    </span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button - Positioned on the border of secondary sidebar */}
      <div
        className={`absolute top-6 z-30 transition-all duration-300 ease-in-out ${
          isSecondaryOpen ? "left-[319px]" : "left-16"
        }`}
      >
        <button
          onClick={toggleSecondary}
          className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded-full p-1 shadow-md hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-400 transition-all duration-200 transform -translate-x-1/2 group"
          title={isSecondaryOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ArrowLeftIcon
            className={`h-3 w-3 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-all duration-300 ${
              isSecondaryOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Main Content - No layout shifts */}
      <div className="flex-1 flex flex-col min-w-0 relative z-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSecondary ? (
            <div className="text-gray-800 dark:text-gray-200 text-lg">
              Welcome to {activeSecondary} page!
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
