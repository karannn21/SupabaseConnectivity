# Supa Auth - Next.js Authentication App

A modern, full-stack authentication application built with Next.js 15, Supabase, and HeroUI.

## ✨ Features

- 🔐 **Complete Authentication Flow** - Login, signup, logout with Supabase
- 🎨 **Modern UI** - Built with HeroUI and Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Two-Level Sidebar** - Advanced navigation with smooth animations
- 🔒 **Protected Routes** - Secure pages with authentication guards
- ⚡ **TypeScript** - Full type safety throughout the application
- 🎯 **Clean Architecture** - Well-organized, maintainable code structure

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── protected/               # Protected dashboard
│   │   └── analytics-overview/  # Analytics page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── auth/                    # Authentication components
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx          # Navigation bar
│   │   └── sidebar/            # Two-level sidebar system
│   ├── providers/               # React context providers
│   └── ui/                     # UI components & button system
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities and configurations
│   ├── auth.ts                 # Authentication service
│   ├── button-config.ts        # Centralized button configuration
│   ├── constants.ts            # App constants
│   ├── supabase.ts             # Supabase client
│   └── utils.ts                # Utility functions
└── types/                      # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd supa-auth
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Add these to your `.env.local` file

### Sidebar Customization

The sidebar is fully customizable through `src/components/layout/sidebar/sidebar-config.tsx`. See `SIDEBAR_CUSTOMIZATION_GUIDE.md` for detailed instructions.

## 📦 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Authentication:** Supabase Auth
- **UI Library:** HeroUI (NextUI v2)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React, Heroicons
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Font:** Geist Sans & Geist Mono

## 🎯 Key Improvements Made

### Architecture

- ✅ **Route Groups** - Organized auth pages with `(auth)` group
- ✅ **Component Organization** - Logical folder structure for components
- ✅ **TypeScript Migration** - Full TypeScript implementation
- ✅ **Custom Hooks** - Reusable authentication logic
- ✅ **Service Layer** - Centralized API calls

### Code Quality

- ✅ **Type Safety** - Comprehensive TypeScript types
- ✅ **Error Handling** - Proper error states and loading states
- ✅ **Separation of Concerns** - Clean component responsibilities
- ✅ **Reusable Components** - DRY principle implementation

### User Experience

- ✅ **Loading States** - Smooth loading indicators
- ✅ **Error Messages** - Clear user feedback
- ✅ **Protected Routes** - Secure navigation
- ✅ **Responsive Design** - Mobile-first approach

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
