"use client";

import * as React from "react";
import { Button } from "@heroui/button";
import { cn } from "@/lib/utils";
import {
  type ButtonSize,
  type ButtonVariant,
  getButtonSize,
  getButtonVariant,
} from "@/lib/button-config";

interface SidebarButtonProps {
  size?: "sidebar-main" | "sidebar-nested" | "sidebar-toggle" | ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  active?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
}

export const SidebarButton = React.forwardRef<
  HTMLButtonElement,
  SidebarButtonProps
>(
  (
    {
      size = "sidebar-main",
      variant,
      icon,
      iconPosition = "left",
      active = false,
      fullWidth = true,
      children,
      onClick,
      className,
      title,
      ...props
    },
    ref
  ) => {
    const sizeConfig = getButtonSize(size as ButtonSize);

    // Auto-select variant based on size and active state if not provided
    const getAutoVariant = (): ButtonVariant => {
      if (variant) return variant;

      if (size === "sidebar-main" || size === "sidebar-nested") {
        return active ? "primary" : "secondary";
      } else if (size === "sidebar-toggle") {
        return active ? "primary" : "ghost";
      } else if (size.includes("icon")) {
        return active ? "primary" : "ghost";
      }

      return active ? "primary" : "secondary";
    };

    const variantConfig = getButtonVariant(getAutoVariant());
    const isIconOnly = size.includes("icon") || size === "sidebar-toggle";

    return (
      <Button
        ref={ref}
        onPress={onClick}
        title={title}
        className={cn(
          // Base HeroUI button reset
          "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          // Size configuration
          sizeConfig.padding,
          sizeConfig.text,
          sizeConfig.height,
          sizeConfig.borderRadius,
          // Variant
          variantConfig,
          // Full width or square for icons
          fullWidth && !isIconOnly
            ? "w-full"
            : isIconOnly
            ? "flex-shrink-0"
            : "w-auto",
          // Text alignment for sidebar buttons
          (size === "sidebar-main" || size === "sidebar-nested") &&
            "justify-start text-left",
          // Custom classes
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className={cn(sizeConfig.iconSize, children ? "mr-3" : "")}>
            {icon}
          </span>
        )}
        {children && (
          <span className={cn("truncate", isIconOnly ? "sr-only" : "flex-1")}>
            {children}
          </span>
        )}
        {icon && iconPosition === "right" && (
          <span className={cn(sizeConfig.iconSize, children ? "ml-2" : "")}>
            {icon}
          </span>
        )}
      </Button>
    );
  }
);

SidebarButton.displayName = "SidebarButton";

// Specific variants for common sidebar use cases
export const SidebarMainButton = React.forwardRef<
  HTMLButtonElement,
  Omit<SidebarButtonProps, "size">
>(({ ...props }, ref) => (
  <SidebarButton ref={ref} size="sidebar-main" {...props} />
));

SidebarMainButton.displayName = "SidebarMainButton";

export const SidebarNestedButton = React.forwardRef<
  HTMLButtonElement,
  Omit<SidebarButtonProps, "size">
>(({ ...props }, ref) => (
  <SidebarButton ref={ref} size="sidebar-nested" {...props} />
));

SidebarNestedButton.displayName = "SidebarNestedButton";

export const SidebarToggleButton = React.forwardRef<
  HTMLButtonElement,
  Omit<SidebarButtonProps, "size" | "fullWidth">
>(({ ...props }, ref) => (
  <SidebarButton ref={ref} size="sidebar-toggle" fullWidth={false} {...props} />
));

SidebarToggleButton.displayName = "SidebarToggleButton";
