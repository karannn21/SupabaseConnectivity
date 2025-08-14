"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TwoLevelSidebar from "./components/TwoLevelSidebar";

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <TwoLevelSidebar>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to Dashboard
        </h1>

        <div className="mt-8">
          {/* HeroUI-styled Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-6 py-2 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </TwoLevelSidebar>
  );
}
