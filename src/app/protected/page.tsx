"use client";

import { authService } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/protected-route";
import TwoLevelSidebar from "@/components/layout/sidebar/two-level-sidebar";
import { UnifiedButton } from "@/components/ui/unified-button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

export default function ProtectedPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <TwoLevelSidebar>
        <div className="max-w-4xl mx-auto p-6">
          <Card className="shadow-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to Dashboard
              </h1>
            </CardHeader>

            <CardBody>
              <p className="text-gray-600 dark:text-gray-300">
                This is your protected dashboard page.
              </p>
            </CardBody>

            <CardFooter>
              <UnifiedButton onClick={handleLogout} variant="danger" size="lg">
                Logout
              </UnifiedButton>
            </CardFooter>
          </Card>
        </div>
      </TwoLevelSidebar>
    </ProtectedRoute>
  );
}
