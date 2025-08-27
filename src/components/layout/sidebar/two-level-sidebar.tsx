"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
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

// Help Modal Component
const KeyboardShortcutsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const shortcuts = [
    { key: "Ctrl + B", description: "Toggle sidebar open/close" },
    {
      key: "→ (Right Arrow)",
      description: "Navigate to next primary menu item",
    },
    {
      key: "← (Left Arrow)",
      description: "Navigate to previous primary menu item",
    },
    { key: "↓ (Down Arrow)", description: "Navigate to next sub-item" },
    { key: "↑ (Up Arrow)", description: "Navigate to previous sub-item" },
    { key: "? (Question Mark)", description: "Show this help dialog" },
    { key: "Escape", description: "Close help dialog" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              💡 <strong>Tip:</strong> Press{" "}
              <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">
                ?
              </kbd>{" "}
              anytime to open this help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [showHelpModal, setShowHelpModal] = useState(false);

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

  // ✅ Enhanced Keyboard shortcuts with help
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show help modal with "?" key
      if (e.key === "?" && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setShowHelpModal(true);
        return;
      }

      // Hide help modal with Escape
      if (e.key === "Escape" && showHelpModal) {
        e.preventDefault();
        setShowHelpModal(false);
        return;
      }

      // Don't process other shortcuts if help modal is open
      if (showHelpModal) return;

      // Ctrl + B → Toggle sidebar
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSecondary();
      }

      // ArrowRight → Next primary item
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!activeItem) return;
        const currentIndex = sidebarItems.findIndex((i) => i.id === activeItem);
        const nextIndex = (currentIndex + 1) % sidebarItems.length;
        handleIconClick(sidebarItems[nextIndex].id);
      }

      // ArrowLeft → Previous primary item
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!activeItem) return;
        const currentIndex = sidebarItems.findIndex((i) => i.id === activeItem);
        const prevIndex =
          (currentIndex - 1 + sidebarItems.length) % sidebarItems.length;
        handleIconClick(sidebarItems[prevIndex].id);
      }

      // ArrowDown → Next subItem (inside activeItem)
      if (e.key === "ArrowDown" && activeItem) {
        e.preventDefault();
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

      // ArrowUp → Previous subItem
      if (e.key === "ArrowUp" && activeItem) {
        e.preventDefault();
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
  }, [activeItem, activeSecondary, showHelpModal]);

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
      // Toggle expansion: close if already expanded, open if collapsed
      if (expandedSubItem === sub.label) {
        setExpandedSubItem(null);
        // Keep the parent active but clear nested selection
        setActiveSecondary(sub.label);
      } else {
        setExpandedSubItem(sub.label);
        setActiveSecondary(sub.label);
      }
    } else {
      setActiveSecondary(sub.label);
      setExpandedSubItem(null);
    }
  };

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-200 bg-grunge-texture">
      {/* Help Modal */}
      <KeyboardShortcutsModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

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

        <div className="flex flex-col items-center space-y-1 mt-9 w-full px-2 flex-1">
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
                title={`${item.label} (Arrow keys to navigate)`}
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

        {/* Help Button in Sidebar */}
        <div className="mt-auto mb-2 w-full px-2">
          <SidebarButton
            variant="ghost"
            size="sidebar-main"
            active={false}
            onClick={() => setShowHelpModal(true)}
            title="Keyboard Shortcuts (Press ?)"
            fullWidth={false}
            icon={
              <QuestionMarkCircleIcon
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  "text-gray-800 dark:text-gray-300 stroke-1"
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            }
          />
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

                                  {/* Text with Icon */}
                                  {nested.label === "Analytics Overview" &&
                                  nested.href ? (
                                    <Link
                                      href={nested.href}
                                      onClick={() =>
                                        setActiveSecondary(nested.label)
                                      }
                                      className={`cursor-pointer p-2 pl-8 transition-all duration-200 rounded flex-1 min-w-0 text-left w-full block flex items-center gap-2 ${
                                        isNestedActive
                                          ? "text-blue-500 font-medium bg-transparent"
                                          : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                      }`}
                                    >
                                      {nested.icon && (
                                        <nested.icon className="w-4 h-4 flex-shrink-0" />
                                      )}
                                      <span className="truncate">
                                        {nested.label}
                                      </span>
                                    </Link>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveSecondary(nested.label)
                                      }
                                      className={`cursor-pointer p-2 pl-8 transition-all duration-200 rounded flex-1 min-w-0 text-left w-full flex items-center gap-2 ${
                                        isNestedActive
                                          ? "text-blue-500 font-medium bg-transparent"
                                          : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                      }`}
                                    >
                                      {nested.icon && (
                                        <nested.icon className="w-4 h-4 flex-shrink-0" />
                                      )}
                                      <span className="truncate">
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
        title={`${isSecondaryOpen ? "Collapse" : "Expand"} Sidebar (Ctrl+B)`}
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
        <main className="flex-1 overflow-y-auto pt-0 pl-0 pb-6 pr-6">
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
