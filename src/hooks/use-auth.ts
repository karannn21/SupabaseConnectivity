"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { authService } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data } = await authService.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();
  }, []);

  return {
    user,
    loading,
    signOut: authService.signOut,
  };
}
