"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
import {
  SidebarButton,
  SidebarMainButton,
  SidebarToggleButton,
} from "@/components/ui/sidebar-button";
import HeroCard from "@/components/ui/hero-card";
import { cn } from "@/lib/utils";

export default function TwoLevelSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  useEffect(() => {
    const analyticsOverviewPath = "/protected/analytics-overview";
    if (pathname === analyticsOverviewPath) {
      setActiveSecondary("Analytics Overview");
      const parentItem = sidebarItems.find((item) =>
        item.subItems.some((sub) => sub.label === "Analytics Overview")
      );
      if (parentItem) {
        setActiveItem(parentItem.id);
        setExpandedSubItem("Overview");
      }
    }
  }, [pathname]);

  // ✅ Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + B → Toggle sidebar
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSecondary();
      }

      // Alt + ArrowRight → Next primary item
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!activeItem) return;
        const currentIndex = sidebarItems.findIndex((i) => i.id === activeItem);
        const nextIndex = (currentIndex + 1) % sidebarItems.length;
        handleIconClick(sidebarItems[nextIndex].id);
      }

      // Alt + ArrowLeft → Previous primary item
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!activeItem) return;
        const currentIndex = sidebarItems.findIndex((i) => i.id === activeItem);
        const prevIndex =
          (currentIndex - 1 + sidebarItems.length) % sidebarItems.length;
        handleIconClick(sidebarItems[prevIndex].id);
      }

      // Alt + ArrowDown → Next subItem (inside activeItem)
      if (e.key === "ArrowDown" && activeItem) {
        const activeData = sidebarItems.find((i) => i.id === activeItem);
        if (activeData?.subItems?.length) {
          const currentIndex = activeData.subItems.findIndex(
            (s) => s.label === activeSecondary
          );
          const nextIndex = (currentIndex + 1) % activeData.subItems.length;
          setActiveSecondary(activeData.subItems[nextIndex].label);
          setExpandedSubItem(activeData.subItems[nextIndex].label);
        }
      }

      // Alt + ArrowUp → Previous subItem
      if (e.key === "ArrowUp" && activeItem) {
        const activeData = sidebarItems.find((i) => i.id === activeItem);
        if (activeData?.subItems?.length) {
          const currentIndex = activeData.subItems.findIndex(
            (s) => s.label === activeSecondary
          );
          const prevIndex =
            (currentIndex - 1 + activeData.subItems.length) %
            activeData.subItems.length;
          setActiveSecondary(activeData.subItems[prevIndex].label);
          setExpandedSubItem(activeData.subItems[prevIndex].label);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleIconClick = (itemId: string) => {
    if (activeItem === itemId && isSecondaryOpen) {
      setIsSecondaryOpen(false);
      setActiveItem(null);
      setActiveSecondary(null);
      setExpandedSubItem(null);
    } else {
      setActiveItem(itemId);
      setIsSecondaryOpen(true);

      const clickedItem = sidebarItems.find((i) => i.id === itemId);
      if (clickedItem?.label === "Candidates") {
        const leadsSub = clickedItem.subItems.find(
          (sub) => sub.label === "Leads"
        );
        if (leadsSub) {
          setExpandedSubItem("Leads");
          setActiveSecondary("Leads");
        }
      } else {
        setActiveSecondary(null);
        setExpandedSubItem(null);
      }
    }
  };

  const toggleSecondary = () => {
    if (!isSecondaryOpen && !activeItem) {
      const dashboardItem = sidebarItems.find(
        (item) => item.label.toLowerCase() === "dashboard"
      );
      if (dashboardItem) {
        setActiveItem(dashboardItem.id);
      }
    }
    setIsSecondaryOpen((prev) => !prev);
  };

  const handleSubItemClick = (sub: SubItem) => {
    if (sub.subItems) {
      setExpandedSubItem(sub.label);
      setActiveSecondary(sub.label);
    } else {
      setActiveSecondary(sub.label);
      setExpandedSubItem(null);
    }
  };

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-200">
      {/* Primary Sidebar */}
      <div className="w-16 bg-gray-100 dark:bg-[#141414] border-r border-gray-300 dark:border-white/10 flex flex-col items-center py-4 bg-grunge-texture">
        <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg">
          <Image
            src="/talent.png"
            alt="Logo"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </div>

        <div className="flex flex-col items-center space-y-1 mt-9 w-full px-2">
          {sidebarItems.map((item) => {
            const Icon =
              activeItem === item.id ? item.iconSolid : item.iconOutline;

            return (
              <SidebarButton
                variant={activeItem === item.id ? "sidebarActive" : "ghost"}
                key={item.id}
                size="sidebar-main"
                active={activeItem === item.id}
                onClick={() => handleIconClick(item.id)}
                title={item.label}
                fullWidth={false}
                icon={
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      activeItem === item.id
                        ? "text-gray-900 dark:text-gray-100 drop-shadow-lg stroke-2"
                        : "text-gray-800 dark:text-gray-300 stroke-1"
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={activeItem === item.id ? "2" : "1.5"}
                  />
                }
              />
            );
          })}
        </div>
      </div>

      {/* Secondary Sidebar */}
      <div
        className={`relative flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isSecondaryOpen ? "w-64" : "w-0"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-100 dark:bg-[#141414] bg-grunge-texture transition-all duration-300 ease-in-out overflow-hidden shadow-2xl z-10 ${
            isSecondaryOpen
              ? "transform translate-x-0 opacity-100"
              : "transform -translate-x-full opacity-0"
          }`}
        >
          {activeItemData && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-start p-6 flex-shrink-0">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">
                  {activeItemData.label}
                </h1>
              </div>

              <div className="flex-1 overflow-y-auto p-4 text-gray-800 dark:text-gray-200 space-y-1">
                {activeItemData.subItems.map((sub) => {
                  const isActiveParent = activeSecondary === sub.label;
                  const hasActiveNestedChild = sub.subItems?.some(
                    (nested) => activeSecondary === nested.label
                  );
                  const shouldShowAsActive =
                    isActiveParent || hasActiveNestedChild;
                  const isExpanded = expandedSubItem === sub.label;

                  return (
                    <div key={sub.label}>
                      <SidebarMainButton
                        variant={shouldShowAsActive ? "sidebarActive" : "ghost"}
                        active={shouldShowAsActive}
                        onClick={() => handleSubItemClick(sub)}
                        icon={
                          <sub.icon
                            className={cn(
                              "h-5 w-5 flex-shrink-0 transition-all duration-300",
                              shouldShowAsActive
                                ? "text-gray-900 dark:text-gray-100 drop-shadow-lg"
                                : ""
                            )}
                          />
                        }
                        iconPosition="left"
                      >
                        <div className="flex items-center w-full">
                          <span className="flex-1">{sub.label}</span>
                          {sub.subItems && (
                            <span className="ml-2 flex-shrink-0">
                              {isExpanded ? (
                                <ChevronDownIcon className="h-4 w-4 text-current transition-transform duration-300 rotate-0" />
                              ) : (
                                <ChevronRightIcon className="h-4 w-4 text-current transition-transform duration-300" />
                              )}
                            </span>
                          )}
                        </div>
                      </SidebarMainButton>

                      {/* Nested subItems */}
                      {sub.subItems && (
                        <div
                          className={`ml-3 overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={{ transitionProperty: "max-height, opacity" }}
                        >
                          <div className="relative">
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
                                  className="relative flex items-center mb-1"
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
                                        className={`absolute left-0 top-[60%] w-0.5 h-[50%] transition-colors duration-200 ${
                                          hasActiveItemBelow
                                            ? "bg-blue-500"
                                            : "bg-gray-400 dark:bg-gray-500"
                                        }`}
                                      />
                                    </>
                                  )}
                                  {isLast && (
                                    <div
                                      className={`absolute left-0 top-1  w-0.5  transition-colors duration-200 ${
                                        isNestedActive
                                          ? "bg-blue-500"
                                          : "bg-gray-400 dark:bg-gray-500"
                                      }`}
                                    />
                                  )}

                                  {/* Rounded corner */}
                                  <div
                                    className={`absolute left-0 top-0 w-7 h-6 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-200 ${
                                      isNestedActive || hasActiveItemBelow
                                        ? "border-l-blue-500"
                                        : "border-l-gray-400 dark:border-l-gray-500"
                                    } ${
                                      isNestedActive
                                        ? "border-b-blue-500"
                                        : "border-b-gray-400 dark:border-b-gray-500"
                                    }`}
                                  />

                                  {/* Text */}
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
      <SidebarToggleButton
        variant="ghost"
        onClick={toggleSecondary}
        title={isSecondaryOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        className={`absolute top-5 z-30 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400
    border border-gray-400 dark:border-gray-600 rounded-full
    ${isSecondaryOpen ? "left-[320px]" : "left-16"} transform -translate-x-1/2`}
        icon={
          <ArrowLeftIcon
            className={`h-4 w-4 transition-all duration-300 ${
              isSecondaryOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        }
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-0">
        <Navbar />
        <main
          className={`flex-1 overflow-y-auto ${
            activeSecondary ? "p-0" : "p-6"
          }`}
        >
          {(() => {
            return activeSecondary ? (
              <div className="h-full relative z-10">
                <HeroCard
                  variant="default"
                  title={activeSecondary}
                  subtitle="Dashboard"
                  description="Welcome to your dashboard section. This page is coming soon with exciting features!"
                  className="w-full h-full rounded-lg bg-gray-100 dark:bg-[#141414] border-2 border-gray-400 dark:border-gray-600"
                />
              </div>
            ) : (
              children
            );
          })()}
        </main>
      </div>
    </div>
  );
}
