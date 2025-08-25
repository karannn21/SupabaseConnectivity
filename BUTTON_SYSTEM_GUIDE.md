# 🎯 Centralized Button & Text System Guide

## Overview

This project now uses a **centralized configuration system** for all button sizes, text sizes, and styling. All button and text configurations are managed from a single file: `src/lib/button-config.ts`.

## 📁 File Structure

```
src/
├── lib/
│   └── button-config.ts          # 🎯 MAIN CONFIG FILE - Edit here to change all buttons
├── components/ui/
│   ├── unified-button.tsx        # Main unified button component
│   ├── text.tsx                  # Consistent text sizing components
│   ├── button-variants.ts        # CVA variants (updated to use config)
│   └── sidebar-button.tsx        # Sidebar-specific button variants
```

## 🎛️ Main Configuration File

### `src/lib/button-config.ts`

This is the **single source of truth** for all button and text sizes. Edit values here to change appearances globally.

#### Button Sizes Available:

- `xs` - Extra small buttons
- `sm` - Small buttons
- `md` - Medium buttons (default)
- `lg` - Large buttons
- `xl` - Extra large buttons
- `icon` - Square icon buttons
- `icon-sm` - Small icon buttons
- `icon-lg` - Large icon buttons

#### Button Variants Available:

- `primary` - Blue primary buttons
- `secondary` - Gray secondary buttons
- `outline` - Outlined buttons
- `ghost` - Transparent buttons with hover
- `danger` - Red danger buttons
- `success` - Green success buttons
- `warning` - Yellow warning buttons
- `info` - Indigo info buttons

#### Text Sizes Available:

- `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`

## 🚀 How to Use

### 1. Using the New UnifiedButton Component

```tsx
import { UnifiedButton } from "@/components/ui/unified-button";

// Basic usage
<UnifiedButton variant="primary" size="md">
  Click me
</UnifiedButton>

// With icon
<UnifiedButton variant="success" size="lg" icon={<CheckIcon />}>
  Save Changes
</UnifiedButton>

// Loading state
<UnifiedButton variant="primary" loading={isLoading}>
  {isLoading ? "Saving..." : "Save"}
</UnifiedButton>

// Icon only button
<UnifiedButton variant="ghost" size="icon" icon={<SettingsIcon />} />

// Full width button
<UnifiedButton variant="danger" fullWidth>
  Delete Account
</UnifiedButton>
```

### 2. Using Text Components

```tsx
import { Text, Heading, Paragraph } from "@/components/ui/text";

// Headings
<Heading level={1} size="3xl">Main Title</Heading>
<Heading level={2} size="2xl">Section Title</Heading>

// Paragraphs
<Paragraph size="base">Regular paragraph text</Paragraph>
<Paragraph size="sm">Small paragraph text</Paragraph>

// Custom text
<Text size="lg" as="span">Custom text element</Text>
```

### 3. Using CVA Button Variants

For advanced styling needs, use the CVA variants:

```tsx
// buttonVariants with CVA
<Button className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
  CVA Button
</Button>
```

## 🎨 Customizing Button Sizes

To change button sizes globally, edit `src/lib/button-config.ts`:

```typescript
export const BUTTON_SIZES = {
  md: {
    padding: "px-4 py-3", // Change padding
    text: "text-lg", // Change text size
    height: "h-12", // Change height
    iconSize: "w-6 h-6", // Change icon size
    borderRadius: "rounded-xl", // Change border radius
    fontSize: "18px", // CSS font size
    lineHeight: "28px", // CSS line height
  },
  // ... other sizes
};
```

## 🎨 Customizing Button Colors

To change button colors globally, edit the variants:

```typescript
export const BUTTON_VARIANTS = {
  primary: "bg-purple-600 text-white hover:bg-purple-700", // Change primary color
  // ... other variants
};
```

## 🔄 Migration Guide

### From Regular HTML Buttons

**Before:**

```tsx
<button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
  Submit
</button>
```

**After:**

```tsx
<UnifiedButton variant="primary" size="lg" fullWidth>
  Submit
</UnifiedButton>
```

### From Regular Button with Classes

**Before:**

```tsx
<button className="px-4 py-2 bg-blue-600 text-white rounded">Click me</button>
```

**After:**

```tsx
<UnifiedButton variant="primary" size="md">
  Click me
</UnifiedButton>
```

### From HeroUI Button

**Before:**

```tsx
<Button className="px-4 py-2 bg-blue-600 text-white">Click me</Button>
```

**After:**

```tsx
<UnifiedButton variant="primary" size="md">
  Click me
</UnifiedButton>
```

## 📋 Component Comparison

| Component              | Use Case                     | Pros                               | Cons                             |
| ---------------------- | ---------------------------- | ---------------------------------- | -------------------------------- |
| `UnifiedButton`        | **Recommended for new code** | Centralized config, consistent API | None                             |
| `SidebarButton`        | Sidebar navigation           | Sidebar-optimized variants         | Specific use case                |
| `buttonVariants` (CVA) | Special styling needs        | Flexible, composable               | Requires manual class management |
| HeroUI `Button`        | Direct HeroUI features       | Full HeroUI features               | Manual styling                   |

## 🎯 Best Practices

1. **Use UnifiedButton for new components**
2. **Edit `button-config.ts` to change sizes/colors globally**
3. **Use Text components for consistent typography**
4. **Prefer semantic variants** (`primary`, `danger`) over colors
5. **Use `fullWidth` prop instead of `w-full` class**

## 🔧 Advanced Usage

### Custom Button Classes

```tsx
// You can still add custom classes
<UnifiedButton
  variant="primary"
  size="md"
  className="shadow-lg transform hover:scale-105"
>
  Fancy Button
</UnifiedButton>
```

### Getting Button Styles Programmatically

```tsx
import { getButtonClasses, getButtonSize } from "@/lib/button-config";

const buttonStyles = getButtonClasses("lg", "primary");
const sizeConfig = getButtonSize("lg");

console.log(buttonStyles.full); // Complete button classes
console.log(sizeConfig.iconSize); // Icon size for this button size
```

## 🚨 Important Notes

1. **Single Source of Truth**: Only edit `src/lib/button-config.ts` to change button appearances
2. **Backward Compatibility**: Existing components still work but now use centralized config
3. **TypeScript Support**: Full type safety for all size and variant options
4. **Dark Mode**: All variants include dark mode support
5. **Performance**: No runtime overhead, all styles are compile-time

## 🎉 Benefits

✅ **Consistent Design**: All buttons follow the same design system  
✅ **Easy Maintenance**: Change one file to update all buttons  
✅ **Type Safety**: Full TypeScript support prevents errors  
✅ **Flexible**: Multiple ways to use buttons based on your needs  
✅ **Backward Compatible**: Existing code continues to work  
✅ **Performance**: Optimized for production builds

---

**Need to change button sizes or colors?** → Edit `src/lib/button-config.ts`  
**Need a new button?** → Use `<UnifiedButton>`  
**Need consistent text?** → Use `<Text>`, `<Heading>`, or `<Paragraph>`
