import { cva } from "class-variance-authority";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  GRADIENT_VARIANTS,
} from "@/lib/button-config";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none",
  {
    variants: {
      variant: {
        default: BUTTON_VARIANTS.secondary,
        primary: BUTTON_VARIANTS.primary,
        secondary: BUTTON_VARIANTS.secondary,
        outline: BUTTON_VARIANTS.outline,
        ghost: BUTTON_VARIANTS.ghost,
        danger: BUTTON_VARIANTS.danger,
        success: BUTTON_VARIANTS.success,
        warning: BUTTON_VARIANTS.warning,
        info: BUTTON_VARIANTS.info,

        // Special gradient variants for navbar buttons
        rainbow: GRADIENT_VARIANTS.rainbow,
        gradientBorder: GRADIENT_VARIANTS.gradientBorder,
      },
      size: {
        default: `${BUTTON_SIZES.md.padding} ${BUTTON_SIZES.md.text}`,
        xs: `${BUTTON_SIZES.xs.padding} ${BUTTON_SIZES.xs.text}`,
        sm: `${BUTTON_SIZES.sm.padding} ${BUTTON_SIZES.sm.text}`,
        lg: `${BUTTON_SIZES.lg.padding} ${BUTTON_SIZES.lg.text}`,
        xl: `${BUTTON_SIZES.xl.padding} ${BUTTON_SIZES.xl.text}`,
        icon: `${BUTTON_SIZES.icon.height} flex items-center justify-center`,
        "icon-sm": `${BUTTON_SIZES["icon-sm"].height} flex items-center justify-center`,
        "icon-lg": `${BUTTON_SIZES["icon-lg"].height} flex items-center justify-center`,
        "sidebar-main": `${BUTTON_SIZES["sidebar-main"].padding} ${BUTTON_SIZES["sidebar-main"].text}`,
        "sidebar-nested": `${BUTTON_SIZES["sidebar-nested"].padding} ${BUTTON_SIZES["sidebar-nested"].text}`,
        "sidebar-toggle": `${BUTTON_SIZES["sidebar-toggle"].height} flex items-center justify-center`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
