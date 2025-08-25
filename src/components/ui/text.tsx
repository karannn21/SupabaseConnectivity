"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type TextSize, getTextSize } from "@/lib/button-config";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  size?: TextSize;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { className, size = "base", as: Component = "span", children, ...props },
    ref
  ) => {
    const textConfig = getTextSize(size);

    return (
      <Component
        ref={ref}
        className={cn(textConfig.className, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

// Specific text components for common use cases
export const Heading = React.forwardRef<
  HTMLHeadingElement,
  Omit<TextProps, "as"> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
>(({ level = 1, size = "2xl", className, children, ...props }, ref) => {
  const Component = `h${level}` as React.ElementType;
  return (
    <Text
      ref={ref}
      as={Component}
      size={size}
      className={cn("font-bold", className)}
      {...props}
    >
      {children}
    </Text>
  );
});

Heading.displayName = "Heading";

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<TextProps, "as">
>(({ size = "base", className, children, ...props }, ref) => {
  return (
    <Text ref={ref} as="p" size={size} className={className} {...props}>
      {children}
    </Text>
  );
});

Paragraph.displayName = "Paragraph";
