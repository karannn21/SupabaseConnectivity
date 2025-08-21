"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { sidebarItems } from "./sidebar-config";
import Navbar from "../navbar";
import { SubItem } from "@/types/sidebar";
import { Button } from "@heroui/button";

export default function TwoLevelSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  // Set active states when on Analytics Overview page (but don't auto-open sidebar)
  useEffect(() => {
    const analyticsOverviewPath = "/protected/analytics-overview";
    if (pathname === analyticsOverviewPath) {
      setActiveSecondary("Analytics Overview");
      // DON'T auto-open sidebar: setIsSecondaryOpen(true);

      // Find and set the parent item (Dashboard)
      const parentItem = sidebarItems.find((item) =>
        item.subItems.some((sub) => sub.label === "Analytics Overview")
      );

      if (parentItem) {
        setActiveItem(parentItem.id);
        // Also set the expanded sub-item so it shows when sidebar opens
        setExpandedSubItem("Overview");
      }
    }
  }, [pathname]);

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
      // Opening sidebar → default to Dashboard if no active item
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
      if (expandedSubItem === sub.label) {
        setExpandedSubItem(null);
      } else {
        setExpandedSubItem(sub.label);
        if (sub.subItems.length > 0) {
          setActiveSecondary(sub.subItems[0].label);
          if (
            sub.subItems[0].label === "Analytics Overview" &&
            sub.subItems[0].href
          ) {
            router.push(sub.subItems[0].href);
          }
        }
      }
    } else {
      setActiveSecondary(sub.label);
      setExpandedSubItem(null);

      if (sub.label === "Analytics Overview" && sub.href) {
        router.push(sub.href);
      }
    }
  };

  const handleAnalyticsOverviewClick = (href: string) => {
    setActiveSecondary("Analytics Overview");
    // Close sidebar after navigation
    setIsSecondaryOpen(false);
    setActiveItem(null);
    setExpandedSubItem(null);
    router.push(href);
  };

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Primary Sidebar */}
      <div className="w-16 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 flex flex-col items-center py-4 shadow-sm relative z-20 flex-shrink-0 transition-colors duration-200">
        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 flex items-center justify-center transition-colors duration-200">
          <Image
            src="/talent.png"
            alt="Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>

        <div className="space-y-0.5 mt-5">
          {sidebarItems.map((item) => {
            const Icon =
              activeItem === item.id ? item.iconSolid : item.iconOutline;

            return (
              <Button
                key={item.id}
                onClick={() => handleIconClick(item.id)}
                variant="ghost"
                className={`w-13 h-13 flex items-center justify-center rounded-lg transition-all duration-200 border-2 ${
                  activeItem === item.id
                    ? "border-blue-500 text-blue-500 bg-transparent"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={item.label}
              >
                <Icon
                  className="w-5 h-5" // ✅ bigger Tailwind size
                  fill={activeItem === item.id ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Secondary Sidebar */}
      <div
        className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSecondaryOpen ? "w-64" : "w-0"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out overflow-hidden shadow-lg z-10 ${
            isSecondaryOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
        >
          {activeItemData && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-start p-4 border-gray-200 dark:border-gray-600 flex-shrink-0">
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
                      {sub.href &&
                      !sub.subItems &&
                      sub.label === "Analytics Overview" ? (
                        <Button
                          variant="ghost"
                          className={`w-full flex items-center justify-between rounded-lg text-sm mb-4 ${
                            shouldShowAsActive
                              ? "p-[1px] rainbow-border border-2 border-blue-500 hover:border-transparent text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "p-2 border-2 border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                          }`}
                          onClick={() =>
                            handleAnalyticsOverviewClick(sub.href!)
                          }
                        >
                          {shouldShowAsActive ? (
                            <span className="flex items-center justify-between w-full h-full bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 transition-colors duration-200">
                              <div className="flex items-center">
                                <sub.icon className="inline-block mr-2 h-5 w-5 flex-shrink-0" />
                                <span className="truncate">{sub.label}</span>
                              </div>
                            </span>
                          ) : (
                            <div className="flex items-center">
                              <sub.icon className="inline-block mr-2 h-5 w-5 flex-shrink-0" />
                              <span className="truncate">{sub.label}</span>
                            </div>
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          className={`w-full flex items-center justify-between rounded-lg text-sm mb-4 ${
                            shouldShowAsActive
                              ? "p-[1px] rainbow-border border-2 border-blue-500 hover:border-transparent text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "p-2 border-2 border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
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
                        </Button>
                      )}

                      {sub.subItems && (
                        <div
                          className={`ml-4 -mt-5.5 overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={{ transitionProperty: "max-height, opacity" }}
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
                                  {/* Vertical line */}
                                  {!isLast && (
                                    <>
                                      <div
                                        className={`absolute left-0 top-1 w-0.5 h-[50%] transition-colors duration-200 ${
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
                                  {nested.label === "Analytics Overview" &&
                                  nested.href ? (
                                    <Link
                                      href={nested.href}
                                      onClick={() =>
                                        setActiveSecondary(nested.label)
                                      }
                                      className={`cursor-pointer p-2 pl-10 transition-all duration-200 rounded flex-1 min-w-0 text-left w-full block ${
                                        isNestedActive
                                          ? "text-blue-500 font-medium bg-transparent"
                                          : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                      }`}
                                    >
                                      <span className="truncate block">
                                        {nested.label}
                                      </span>
                                    </Link>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveSecondary(nested.label)
                                      }
                                      className={`cursor-pointer p-2 pl-10 transition-all duration-200 rounded flex-1 min-w-0 text-left w-full ${
                                        isNestedActive
                                          ? "text-blue-500 font-medium bg-transparent"
                                          : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                      }`}
                                    >
                                      <span className="truncate block">
                                        {nested.label}
                                      </span>
                                    </button>
                                  )}
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

      {/* Toggle Button */}
      <div
        className={`absolute top-6 z-30 transition-all duration-300 ease-in-out ${
          isSecondaryOpen ? "left-[319px]" : "left-16"
        }`}
      >
        <Button
          variant="ghost"
          onClick={toggleSecondary}
          className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded-full p-1 shadow-md hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-400 transition-all duration-200 transform -translate-x-1/2 group"
          title={isSecondaryOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ArrowLeftIcon
            className={`h-3 w-3 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-all duration-300 ${
              isSecondaryOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSecondary && activeSecondary !== "Analytics Overview" ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Welcome to {activeSecondary}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {` This page is coming soon. We're working hard to bring you amazing features!`}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Page under development
                  </div>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
