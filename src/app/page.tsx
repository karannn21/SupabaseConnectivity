"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in
  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(data.user);
      }
    }
    getUserData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Home Page 🚀</h1>
      {user && <p>Logged in as: {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
