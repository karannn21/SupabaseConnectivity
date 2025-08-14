"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { sidebarItems } from "./sidebarConfig";
import Navbar from "./Navbar";

// Define proper types
interface SubItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}

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
    if (isSecondaryOpen) setIsSecondaryOpen(false);
    else if (activeItem) setIsSecondaryOpen(true);
  };

  const handleSubItemClick = (sub: SubItem) => {
    if (sub.subItems) {
      // When parent clicked, highlight it
      setActiveSecondary(sub.label);
      setExpandedSubItem(expandedSubItem === sub.label ? null : sub.label);
    } else {
      setActiveSecondary(sub.label);
    }
  };

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Primary Sidebar */}
      <div className="w-16 bg-gray-200 border-r border-gray-300 flex flex-col items-center py-4 shadow-sm">
        {/* Logo */}
        <div className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
          <Image src="/talent.png" alt="Logo" width={24} height={24} className="w-6 h-6" />
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
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition
                  ${
                    activeItem === item.id
                      ? "border-2 border-blue-500 text-blue-500"
                      : "border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-900"
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

      {/* Toggle Button */}
      {activeItem && (
        <div
          className={`absolute top-5 transition-all duration-300 ${
            isSecondaryOpen ? "left-78" : "left-14"
          }`}
        >
          <button
            onClick={toggleSecondary}
            className="bg-white border border-gray-300 rounded-full p-1 shadow hover:shadow-md"
            title={isSecondaryOpen ? "Collapse" : "Expand"}
          >
            <ArrowLeftIcon
              className={`h-2 w-2 text-gray-700 transition-transform ${
                isSecondaryOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      )}

      {/* Secondary Sidebar */}
      <div
        className={`bg-gray-200 border-r border-gray-300 transition-all duration-300 overflow-hidden shadow-sm ${
          isSecondaryOpen ? "w-64" : "w-0"
        }`}
      >
        {isSecondaryOpen && activeItemData && (
          <div className="h-full flex flex-col animate-fadeIn">
            <div className="flex items-center justify-start p-4 border-b border-gray-200">
              <h1 className="text-1_5xl font-semibold text-gray-800">
                {activeItemData.label}
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 text-gray-800 text-lg">
              {activeItemData.subItems.map((sub) => {
                const isActiveParent =
                  activeSecondary === sub.label ||
                  sub.subItems?.some(
                    (nested) => activeSecondary === nested.label
                  );

                const isExpanded = expandedSubItem === sub.label;

                return (
                  <div key={sub.label}>
                    {/* Parent Subitem */}
                    <div
                      className={`cursor-pointer p-2 flex items-center justify-between transition
                        ${
                          isActiveParent
                            ? "border-2 border-blue-500 text-blue-500 rounded-lg "
                            : "hover:bg-gray-300 text-gray-800 rounded"
                        }`}
                      style={{
                        borderRadius: isActiveParent ? "8px" : undefined,
                      }}
                      onClick={() => handleSubItemClick(sub)}
                    >
                      <div className="flex items-center">
                        <sub.icon className="inline-block mr-2 h-5 w-5" />
                        {sub.label}
                      </div>
                      {sub.subItems && (
                        <span className="text-gray-500 text-sm">
                          {isExpanded ? "−" : "+"}
                        </span>
                      )}
                    </div>

                    {/* Nested Children with Rounded L-shaped Connectors */}
                    {sub.subItems && isExpanded && (
                      <div className="ml-4 relative">
                        {sub.subItems.map((nested, index) => {
                          const isNestedActive =
                            activeSecondary === nested.label;
                          const isLast = index === sub.subItems.length - 1;
                          const hasActiveItemBelow = sub.subItems
                            .slice(index + 1)
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
                                    className={`absolute left-0 top-0 w-0.5 h-[50%] ${
                                      isNestedActive || hasActiveItemBelow
                                        ? "bg-blue-500"
                                        : "bg-gray-400"
                                    }`}
                                  ></div>

                                  <div
                                    className={`absolute left-0 top-[50%] w-0.5 h-[50%] ${
                                      hasActiveItemBelow
                                        ? "bg-blue-500"
                                        : "bg-gray-400"
                                    }`}
                                  ></div>
                                </>
                              )}

                              {isLast && (
                                <div
                                  className={`absolute left-0 top-0 w-0.5 h-[40%] ${
                                    isNestedActive
                                      ? "bg-blue-500"
                                      : "bg-gray-400"
                                  }`}
                                ></div>
                              )}

                              {/* Rounded corner with increased spacing */}
                              <div
                                className={`absolute left-0 top-[0.1rem] w-7 h-6 border-l-2 border-b-2 rounded-bl-lg ${
                                  isNestedActive || hasActiveItemBelow
                                    ? "border-l-blue-500"
                                    : "border-l-gray-400"
                                } ${
                                  isNestedActive
                                    ? "border-b-blue-500"
                                    : "border-b-gray-400"
                                }`}
                              />

                              {/* Text with increased left padding for spacing */}
                              <div
                                className={`cursor-pointer p-2 pl-10 transition ${
                                  isNestedActive
                                    ? "text-blue-500 font-medium"
                                    : "hover:bg-gray-300 text-gray-800 rounded"
                                }`}
                                onClick={() => setActiveSecondary(nested.label)}
                              >
                                {nested.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSecondary ? (
            <div className="text-gray-800 text-lg">
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
