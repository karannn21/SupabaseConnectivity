/**
 * Centralized Button Configuration
 *
 * This file contains all button size and text size configurations
 * used throughout the application. Update values here to change
 * button appearances globally.
 */

// Button Size Configurations
export const BUTTON_SIZES = {
  xs: {
    padding: "px-2 py-1",
    text: "text-xs",
    height: "h-7",
    iconSize: "w-3 h-3",
    borderRadius: "rounded-md",
    fontSize: "12px",
    lineHeight: "16px",
  },
  sm: {
    padding: "px-2.5 py-1.5",
    text: "text-sm",
    height: "h-8",
    iconSize: "w-4 h-4",
    borderRadius: "rounded-md",
    fontSize: "14px",
    lineHeight: "20px",
  },
  md: {
    padding: "px-3.5 py-2",
    text: "text-base",
    height: "h-10",
    iconSize: "w-5 h-5",
    borderRadius: "rounded-lg",
    fontSize: "16px",
    lineHeight: "24px",
  },
  lg: {
    padding: "px-5 py-2.5",
    text: "text-lg",
    height: "h-12",
    iconSize: "w-6 h-6",
    borderRadius: "rounded-lg",
    fontSize: "18px",
    lineHeight: "28px",
  },
  xl: {
    padding: "px-6 py-3",
    text: "text-xl",
    height: "h-14",
    iconSize: "w-7 h-7",
    borderRadius: "rounded-xl",
    fontSize: "20px",
    lineHeight: "28px",
  },
  icon: {
    padding: "p-0",
    text: "text-base",
    height: "h-12 w-12", // Square buttons
    iconSize: "w-5 h-5", // Smaller icons for better proportion
    borderRadius: "rounded-lg",
    fontSize: "16px",
    lineHeight: "24px",
  },
  "icon-sm": {
    padding: "p-0",
    text: "text-sm",
    height: "h-8 w-8",
    iconSize: "w-4 h-4",
    borderRadius: "rounded-md",
    fontSize: "14px",
    lineHeight: "20px",
  },
  "icon-lg": {
    padding: "p-0",
    text: "text-lg",
    height: "h-12 w-12",
    iconSize: "w-6 h-6",
    borderRadius: "rounded-lg",
    fontSize: "18px",
    lineHeight: "28px",
  },
  // Sidebar specific sizes
  "sidebar-main": {
    padding: "px-2 py-2",
    text: "text-sm",
    height: "h-auto",
    iconSize: "w-5 h-5",
    borderRadius: "rounded-md",
    fontSize: "14px",
    lineHeight: "20px",
  },
  "sidebar-nested": {
    padding: "pl-4 py-2",
    text: "text-xs",
    height: "h-auto",
    iconSize: "w-4 h-4",
    borderRadius: "rounded-xl",
    fontSize: "12px",
    lineHeight: "16px",
  },
  "sidebar-toggle": {
    padding: "p-0",
    text: "text-sm",
    height: "h-8 w-8",
    iconSize: "w-4 h-4",
    borderRadius: "rounded-full",
    fontSize: "14px",
    lineHeight: "20px",
  },
} as const;

// Text Size Configurations (for consistency across the app)
export const TEXT_SIZES = {
  xs: {
    className: "text-xs",
    fontSize: "12px",
    lineHeight: "16px",
  },
  sm: {
    className: "text-sm",
    fontSize: "14px",
    lineHeight: "20px",
  },
  base: {
    className: "text-base",
    fontSize: "16px",
    lineHeight: "24px",
  },
  lg: {
    className: "text-lg",
    fontSize: "18px",
    lineHeight: "28px",
  },
  xl: {
    className: "text-xl",
    fontSize: "20px",
    lineHeight: "28px",
  },
  "2xl": {
    className: "text-2xl",
    fontSize: "24px",
    lineHeight: "32px",
  },
  "3xl": {
    className: "text-3xl",
    fontSize: "30px",
    lineHeight: "36px",
  },
} as const;

// Button Variant Configurations
// Button Variant Configurations
export const BUTTON_VARIANTS = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
  outline:
    "bg-transparent border-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",

  // 🔥 New variant for active sidebar buttons
  sidebarActive:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-500 dark:text-gray-100 dark:hover:bg-gray-600 [&_svg]:text-gray-900 dark:[&_svg]:text-gray-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
  success:
    "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600",
  warning:
    "bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600",
  info: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
} as const;

// Gradient Border Variants (for special buttons like in navbar)
export const GRADIENT_VARIANTS = {
  rainbow: "relative p-[1px] rounded-lg group overflow-hidden",
  gradientBorder: "relative z-0 p-[1px] rounded-lg overflow-hidden group",
} as const;

// Type definitions for better TypeScript support
export type ButtonSize = keyof typeof BUTTON_SIZES;
export type TextSize = keyof typeof TEXT_SIZES;
export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type GradientVariant = keyof typeof GRADIENT_VARIANTS;

// Helper functions
export const getButtonSize = (size: ButtonSize) => BUTTON_SIZES[size];
export const getTextSize = (size: TextSize) => TEXT_SIZES[size];
export const getButtonVariant = (variant: ButtonVariant) =>
  BUTTON_VARIANTS[variant];
export const getGradientVariant = (variant: GradientVariant) =>
  GRADIENT_VARIANTS[variant];

// Utility function to get button classes
export const getButtonClasses = (
  size: ButtonSize = "md",
  variant: ButtonVariant = "primary"
) => {
  const sizeConfig = getButtonSize(size);
  const variantConfig = getButtonVariant(variant);

  return {
    base: "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    size: `${sizeConfig.padding} ${sizeConfig.text} ${sizeConfig.height} ${sizeConfig.borderRadius}`,
    variant: variantConfig,
    full: `inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeConfig.padding} ${sizeConfig.text} ${sizeConfig.height} ${sizeConfig.borderRadius} ${variantConfig}`,
  };
};
