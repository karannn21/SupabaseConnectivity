"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button as HeroUIButton, ButtonProps } from "@heroui/button";
import {
  type ButtonSize,
  type ButtonVariant,
  getButtonClasses,
  getButtonSize,
} from "@/lib/button-config";

interface UnifiedButtonProps
  extends Omit<ButtonProps, "size" | "variant" | "children"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const UnifiedButton = React.forwardRef<
  HTMLButtonElement,
  UnifiedButtonProps
>(
  (
    {
      className,
      size = "md",
      variant = "primary",
      icon,
      iconPosition = "left",
      loading = false,
      fullWidth = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeConfig = getButtonSize(size);
    const buttonClasses = getButtonClasses(size, variant);
    const isIconOnly = size.includes("icon") && !children;

    const buttonContent = (
      <>
        {loading && (
          <svg
            className={cn(
              "animate-spin",
              sizeConfig.iconSize,
              children || icon ? "mr-2" : ""
            )}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className={cn(sizeConfig.iconSize, children ? "mr-2" : "")}>
            {icon}
          </span>
        )}
        {children && (
          <span className={cn("font-medium", isIconOnly ? "sr-only" : "")}>
            {children}
          </span>
        )}
        {!loading && icon && iconPosition === "right" && (
          <span className={cn(sizeConfig.iconSize, children ? "ml-2" : "")}>
            {icon}
          </span>
        )}
      </>
    );

    if (asChild) {
      return (
        <button
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            buttonClasses.full,
            fullWidth ? "w-full" : "w-auto",
            className
          )}
          {...props}
        >
          {buttonContent}
        </button>
      );
    }

    return (
      <HeroUIButton
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonClasses.base,
          buttonClasses.size,
          buttonClasses.variant,
          fullWidth ? "w-full" : "w-auto",
          className
        )}
        {...props}
      >
        {buttonContent}
      </HeroUIButton>
    );
  }
);

UnifiedButton.displayName = "UnifiedButton";

// Export helper functions for getting icon sizes
export const useButtonIconSize = (size: ButtonSize = "md") =>
  getButtonSize(size).iconSize;

// Export for backward compatibility
export { BUTTON_SIZES as buttonSizes } from "@/lib/button-config";
export type { ButtonSize, ButtonVariant } from "@/lib/button-config";
