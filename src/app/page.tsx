"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";
import { User } from "@supabase/supabase-js";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to Supa Auth 🚀
        </h1>
        {user && (
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Logged in as: {user.email}
          </p>
        )}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/protected")}
            className="w-full bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 dark:bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
