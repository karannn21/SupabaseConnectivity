"use client";

import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/protected-route";
import TwoLevelSidebar from "@/components/layout/sidebar/two-level-sidebar";
import { UnifiedButton } from "@/components/ui/unified-button";

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
            <UnifiedButton onClick={handleLogout} variant="danger" size="lg">
              Logout
            </UnifiedButton>
          </div>
        </div>
      </TwoLevelSidebar>
    </ProtectedRoute>
  );
}
