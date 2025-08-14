# 🎯 Two-Level Sidebar Customization Guide

Your sidebar system is now set up with a **two-level design**:
- **Primary Sidebar**: Icon-only sidebar (always visible)
- **Secondary Sidebar**: Expands with detailed content when you click an icon

## 📁 Files Structure

```
src/app/protected/components/
├── TwoLevelSidebar.tsx          ← Main sidebar component (don't edit this)
├── sidebarConfig.tsx            ← ✨ EDIT THIS FILE for customization
├── SidebarLayout.tsx            ← Old simple layout (can delete)
└── Sidebar.tsx                  ← Old sidebar (can delete)
```

## 🎨 How to Customize Your Sidebar

### 1. **Add/Remove/Edit Sidebar Items**

Edit `sidebarConfig.tsx` and modify the `sidebarItems` array:

```tsx
export const sidebarItems = [
  {
    id: "your-unique-id",           // ← Unique identifier
    icon: YourIcon,                 // ← Import from lucide-react
    label: "Your Label",            // ← Tooltip text
    content: (                      // ← Content when clicked
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Your Title</h2>
        <div className="space-y-2">
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            Your Menu Item 1
          </div>
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            Your Menu Item 2
          </div>
        </div>
      </div>
    )
  },
  // Add more items...
];
```

### 2. **Add New Icons**

Import icons from `lucide-react` at the top of `sidebarConfig.tsx`:

```tsx
import {
  // Existing icons...
  YourNewIcon,      // ← Add your new icon here
  AnotherIcon,
} from "lucide-react";
```

**Popular Icons:**
- `Home` - Home/Dashboard
- `Users` - User management
- `Settings` - Settings
- `BarChart3` - Analytics
- `Mail` - Messages
- `Calendar` - Calendar
- `FileText` - Documents
- `ShoppingCart` - E-commerce
- `CreditCard` - Billing
- `Bell` - Notifications
- `Search` - Search
- `Plus` - Add/Create

### 3. **Customize Content**

Each sidebar item's `content` can contain:

```tsx
content: (
  <div className="p-4">
    <h2 className="text-lg font-semibold mb-4">Your Section</h2>
    
    {/* Simple menu items */}
    <div className="space-y-2">
      <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
        📊 Menu Item with Emoji
      </div>
    </div>
    
    {/* Menu items with icons */}
    <div className="space-y-2">
      <div className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center">
        <Plus size={16} className="mr-2" /> Add New Item
      </div>
    </div>
    
    {/* Menu items with badges */}
    <div className="space-y-2">
      <div className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
        <span>Inbox</span>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
      </div>
    </div>
    
    {/* Dividers */}
    <div className="border-t border-gray-200 my-4"></div>
    
    {/* Buttons */}
    <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Action Button
    </button>
  </div>
)
```

### 4. **Change Colors/Theme**

Edit the `sidebarTheme` object in `sidebarConfig.tsx`:

```tsx
export const sidebarTheme = {
  primary: {
    bg: "bg-gray-900",                    // ← Primary sidebar background
    iconActive: "bg-blue-600 text-white", // ← Active icon style
    iconInactive: "text-gray-400 hover:bg-gray-800 hover:text-white", // ← Inactive icon style
  },
  secondary: {
    bg: "bg-white",           // ← Secondary sidebar background
    border: "border-gray-200", // ← Border color
    header: "border-b border-gray-200", // ← Header border
  }
};
```

**Color Examples:**
- **Dark Theme**: `bg-slate-900`, `bg-slate-800`
- **Blue Theme**: `bg-blue-900`, `bg-blue-600`
- **Purple Theme**: `bg-purple-900`, `bg-purple-600`

### 5. **Adjust Sizes**

Edit the `sidebarConfig` object:

```tsx
export const sidebarConfig = {
  primaryWidth: "w-16",      // ← Icon sidebar width (w-12, w-16, w-20)
  secondaryWidth: "w-64",    // ← Content sidebar width (w-48, w-64, w-80)
  animationDuration: "duration-300", // ← Animation speed
  showTooltips: true,        // ← Show/hide tooltips
  autoClose: false,          // ← Auto close when clicking outside
};
```

## 🚀 Quick Examples

### Example 1: Add a "Reports" Section

```tsx
{
  id: "reports",
  icon: FileBarChart,  // Import this icon
  label: "Reports",
  content: (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Reports</h2>
      <div className="space-y-2">
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">📊 Sales Report</div>
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">👥 User Report</div>
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">💰 Revenue Report</div>
      </div>
    </div>
  )
}
```

### Example 2: Add a "Quick Actions" Section

```tsx
{
  id: "quick-actions",
  icon: Zap,
  label: "Quick Actions",
  content: (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <button className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
          <Plus size={16} className="mr-2" /> Create New
        </button>
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          📤 Export Data
        </button>
        <button className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          🔄 Sync Data
        </button>
      </div>
    </div>
  )
}
```

## 🎯 Usage in Your Pages

In any page, simply wrap your content:

```tsx
import TwoLevelSidebar from "./components/TwoLevelSidebar";

export default function YourPage() {
  return (
    <TwoLevelSidebar>
      <h1>Your page content here</h1>
      <p>The sidebar will appear on the left!</p>
    </TwoLevelSidebar>
  );
}
```

## ✨ Features

- ✅ **Icon-only primary sidebar** - Clean, space-efficient
- ✅ **Expandable secondary sidebar** - Rich content when needed  
- ✅ **Smooth animations** - Professional feel with 300ms transitions
- ✅ **Rotating arrow toggle** - 180° rotation with smooth transitions
- ✅ **Multiple ways to control** - Arrow button, X button, or click same icon
- ✅ **Tooltips** - Hover to see labels
- ✅ **Smart positioning** - Arrow slides out when sidebar is collapsed
- ✅ **Fade-in content** - Content slides in with subtle animation
- ✅ **Fully responsive** - Works on all screen sizes
- ✅ **Easy customization** - Just edit one config file
- ✅ **Reusable** - Use across multiple pages

## 🎮 How to Use the Sidebar

### **3 Ways to Control the Sidebar:**

1. **📱 Click Icons** - Click any icon to open/switch content
2. **➡️ Arrow Button** - Use the rotating arrow to collapse/expand
3. **❌ X Button** - Close sidebar completely (in header)

### **Arrow Button Behavior:**

- **When sidebar is open**: Arrow points left (←), click to collapse
- **When sidebar is collapsed**: Arrow points right (→), click to expand  
- **Smooth 180° rotation** - Professional animation feel
- **Smart positioning** - Slides out from sidebar edge

### **Animation Timeline:**

1. **Click icon** → Sidebar slides out (300ms)
2. **Content fades in** → Slight delay for smooth effect (100ms)
3. **Arrow rotates** → 180° rotation (300ms)
4. **Hover effects** → Shadow increases on arrow button

## 🔧 Troubleshooting

**Icons not showing?** Make sure to import them in `sidebarConfig.tsx`
**Colors not working?** Check Tailwind class names are correct  
**Content not updating?** Restart your dev server after config changes
**Arrow not rotating?** Check that CSS transitions are enabled
**Sidebar not sliding?** Verify Tailwind width classes are correct

---

**That's it!** Edit `sidebarConfig.tsx` to customize your sidebar exactly how you want it! 🎉
