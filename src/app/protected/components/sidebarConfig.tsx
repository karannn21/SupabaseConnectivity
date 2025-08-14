"use client";

import {
  Home,
  Users,
  Settings,
  FileText,
  ShoppingCart,
  Plus,
  ScrollText,
  NotebookPen,
  BookOpenText,
  UserStar,
  UserRoundSearch,
  UsersRound,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

// 🎯 HEROUI SIDEBAR ITEMS (refactored)
export const sidebarItems = [
  {
    id: "dashboard",
    iconOutline: Home,
    iconSolid: Home,
    label: "Dashboard",
    subItems: [
      { label: "Analytics Overview", icon: Home },
      { label: "Recent Activity", icon: ChartNoAxesColumnIncreasing },
      { label: "Quick Stats", icon: ChartNoAxesColumnIncreasing },
      { label: "Performance Metrics", icon: ChartNoAxesColumnIncreasing },
      { label: "Reports", icon: FileText },
    ],
  },
  {
    id: "users",
    iconOutline: Users,
    iconSolid: Users,
    label: "ATS",
    subItems: [
      { label: "Overview", icon: ScrollText },
      { label: "Job Posting", icon: NotebookPen },
      { label: "Assessment", icon: BookOpenText },
      { label: "Interview Plan", icon: UserStar },
      { label: "Recruiter", icon: UserRoundSearch },
      {
        label: "Candidates",
        icon: UsersRound,
        subItems: [
          { label: "Leads", icon: UsersRound },
          { label: "Interviewing", icon: UsersRound },
        ],
      },
      { label: "Reporting", icon: ChartNoAxesColumnIncreasing },
    ],
  },
  {
    id: "documents",
    iconOutline: FileText,
    iconSolid: FileText,
    label: "Documents",
    subItems: [
      { label: "My Documents", icon: FileText },
      { label: "Shared Files", icon: FileText },
      { label: "Recent Files", icon: FileText },
      { label: "Upload New", icon: Plus },
      { label: "Trash", icon: FileText },
      { label: "Cloud Storage", icon: FileText },
    ],
  },
  {
    id: "ecommerce",
    iconOutline: ShoppingCart,
    iconSolid: ShoppingCart,
    label: "E-commerce",
    subItems: [
      { label: "Orders", icon: ShoppingCart },
      { label: "Products", icon: ShoppingCart },
      { label: "Customers", icon: Users },
      { label: "Sales Reports", icon: ChartNoAxesColumnIncreasing },
      { label: "Coupons", icon: FileText },
      { label: "Marketing", icon: ChartNoAxesColumnIncreasing },
    ],
  },
  {
    id: "settings",
    iconOutline: Settings,
    iconSolid: Settings,
    label: "Settings",
    subItems: [
      { label: "Profile Settings", icon: Users },
      { label: "Account Settings", icon: Settings },
      { label: "Privacy", icon: Settings },
      { label: "Notifications", icon: Settings },
      { label: "Security", icon: Settings },
      { label: "Appearance", icon: Settings },
      { label: "Language", icon: Settings },
    ],
  },
];
