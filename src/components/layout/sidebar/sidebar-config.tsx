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
  UserCog, // Replaced UserStar with UserCog
  UserRoundSearch,
  UsersRound,
  AreaChart, // Changed from ChartNoAxesColumnIncreasing
  Bell,
  User,
  Folder,
  Cloud,
  File,
  Trash2,
} from "lucide-react";
import { SidebarItem } from "@/types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    iconOutline: Home,
    iconSolid: Home,
    label: "Dashboard",
    subItems: [
      {
        label: "Analytics Overview",
        icon: AreaChart,
        href: "/protected/analytics-overview",
      },
      {
        label: "Recent Activity",
        icon: AreaChart,
        href: "/dashboard/recent-activity",
      },
      { label: "Quick Stats", icon: AreaChart, href: "/dashboard/quick-stats" },
      {
        label: "Performance Metrics",
        icon: AreaChart,
        href: "/dashboard/performance-metrics",
      },
      { label: "Reports", icon: FileText, href: "/dashboard/reports" },
    ],
  },
  {
    id: "users",
    iconOutline: Users,
    iconSolid: Users,
    label: "ATS",
    subItems: [
      { label: "Overview", icon: ScrollText, href: "/ats/overview" },
      { label: "Job Posting", icon: NotebookPen, href: "/ats/job-posting" },
      { label: "Assessment", icon: BookOpenText, href: "/ats/assessment" },
      { label: "Interview Plan", icon: UserCog, href: "/ats/interview-plan" },
      { label: "Recruiter", icon: UserRoundSearch, href: "/ats/recruiter" },
      {
        label: "Candidates",
        icon: UsersRound,
        subItems: [
          { label: "Leads", icon: UsersRound, href: "/ats/candidates/leads" },
          {
            label: "Interviewing",
            icon: UsersRound,
            href: "/ats/candidates/interviewing",
          },
        ],
      },
      { label: "Reporting", icon: AreaChart, href: "/ats/reporting" },
    ],
  },
  {
    id: "documents",
    iconOutline: FileText,
    iconSolid: FileText,
    label: "Documents",
    subItems: [
      { label: "My Documents", icon: File, href: "/documents/my" },
      { label: "Shared Files", icon: Folder, href: "/documents/shared" },
      { label: "Recent Files", icon: File, href: "/documents/recent" },
      { label: "Upload New", icon: Plus, href: "/documents/upload" },
      { label: "Trash", icon: Trash2, href: "/documents/trash" },
      { label: "Cloud Storage", icon: Cloud, href: "/documents/cloud" },
    ],
  },
  {
    id: "ecommerce",
    iconOutline: ShoppingCart,
    iconSolid: ShoppingCart,
    label: "E-commerce",
    subItems: [
      { label: "Orders", icon: ShoppingCart, href: "/ecommerce/orders" },
      { label: "Products", icon: ShoppingCart, href: "/ecommerce/products" },
      { label: "Customers", icon: Users, href: "/ecommerce/customers" },
      {
        label: "Sales Reports",
        icon: AreaChart,
        href: "/ecommerce/sales-reports",
      },
      { label: "Coupons", icon: FileText, href: "/ecommerce/coupons" },
      { label: "Marketing", icon: AreaChart, href: "/ecommerce/marketing" },
    ],
  },
  {
    id: "settings",
    iconOutline: Settings,
    iconSolid: Settings,
    label: "Settings",
    subItems: [
      { label: "Profile Settings", icon: User, href: "/settings/profile" },
      { label: "Account Settings", icon: Settings, href: "/settings/account" },
      { label: "Privacy", icon: Settings, href: "/settings/privacy" },
      { label: "Notifications", icon: Bell, href: "/settings/notifications" },
      { label: "Security", icon: Settings, href: "/settings/security" },
      { label: "Appearance", icon: Settings, href: "/settings/appearance" },
      { label: "Language", icon: Settings, href: "/settings/language" },
    ],
  },
];
