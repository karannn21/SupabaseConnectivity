import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",

        // 🌈 Rainbow border on hover
        rainbow: "relative p-[1px] rounded-lg group overflow-hidden",

        // 🟢 Gradient Border variant
        gradientBorder: "relative z-0 p-[1px] rounded-lg overflow-hidden group",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-5 py-3 text-base",
        icon: "w-10 h-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
