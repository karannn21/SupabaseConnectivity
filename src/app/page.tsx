"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";
import { User } from "@supabase/supabase-js";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { UnifiedButton } from "@/components/ui/unified-button";
import { Heading, Paragraph } from "@/components/ui/text";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await authService.getUser();
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/login");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 transition-colors duration-200">
        <Heading
          level={1}
          size="2xl"
          className="text-gray-900 dark:text-gray-100 mb-4"
        >
          Welcome to Supa Auth 🚀
        </Heading>
        {user && (
          <Paragraph
            size="base"
            className="text-gray-600 dark:text-gray-300 mb-6"
          >
            Logged in as: {user.email}
          </Paragraph>
        )}
        <div className="space-y-4">
          <UnifiedButton
            onClick={() => router.push("/protected")}
            variant="info"
            size="lg"
            fullWidth
          >
            Go to Dashboard
          </UnifiedButton>
          <UnifiedButton
            onClick={handleLogout}
            variant="danger"
            size="lg"
            fullWidth
          >
            Logout
          </UnifiedButton>
        </div>
      </div>
    </div>
  );
}
