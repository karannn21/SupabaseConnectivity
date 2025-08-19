"use client";

import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/protected-route";
import TwoLevelSidebar from "@/components/layout/sidebar/two-level-sidebar";

export default function ProtectedPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <TwoLevelSidebar>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to Dashboard
          </h1>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-6 py-2 rounded-lg bg-red-600 dark:bg-red-700 text-white font-medium shadow hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </TwoLevelSidebar>
    </ProtectedRoute>
  );
}
