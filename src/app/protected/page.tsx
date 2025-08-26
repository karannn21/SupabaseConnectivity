"use client";

import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/protected-route";
import TwoLevelSidebar from "@/components/layout/sidebar/two-level-sidebar";
import { UnifiedButton } from "@/components/ui/unified-button";
import HeroCard from "@/components/ui/hero-card";

export default function ProtectedPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <TwoLevelSidebar>
        <div className="h-full relative z-10">
          <HeroCard
            variant="default"
            title="Welcome to Dashboard"
            subtitle="Dashboard"
            description="This is your protected dashboard page. Exciting features are coming soon!"
            className="w-full h-full rounded-lg bg-gray-100 dark:bg-[#141414] border-2 border-gray-400 dark:border-gray-600"
          />
          <div className="absolute bottom-6 left-6">
            <UnifiedButton
              onClick={handleLogout}
              variant="danger"
              size="lg"
              className="rounded-xl shadow-md"
            >
              Logout
            </UnifiedButton>
          </div>
        </div>
      </TwoLevelSidebar>
    </ProtectedRoute>
  );
}
