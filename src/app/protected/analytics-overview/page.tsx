"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import TwoLevelSidebar from "@/components/layout/sidebar/two-level-sidebar";
import HeroCard from "@/components/ui/hero-card";

export default function AnalyticsOverviewPage() {
  return (
    <ProtectedRoute>
      <TwoLevelSidebar>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Analytics Overview
          </h1>

          {/* HeroUI Card with Rainbow Hover Border */}
          <div className="flex justify-center">
            <HeroCard
              variant="rainbow"
              title="Analytics Card"
              subtitle="Dashboard"
              description="Hover to see the rainbow border effect!"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </TwoLevelSidebar>
    </ProtectedRoute>
  );
}
