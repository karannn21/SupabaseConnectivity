"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/lib/auth";
import { UnifiedButton } from "@/components/ui/unified-button";
import { Heading, Text } from "@/components/ui/text";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await authService.signIn({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/protected");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md transition-colors duration-200">
        <Heading
          level={1}
          size="2xl"
          className="mb-6 text-center text-gray-900 dark:text-gray-100"
        >
          Login
        </Heading>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
          <UnifiedButton
            type="submit"
            disabled={loading}
            variant="info"
            size="lg"
            fullWidth
            loading={loading}
            asChild
          >
            {loading ? "Signing in..." : "Login"}
          </UnifiedButton>
        </form>
        {errorMsg && (
          <p className="text-red-500 mt-4 text-center">{errorMsg}</p>
        )}
        <Text
          size="sm"
          className="text-center mt-4 text-gray-600 dark:text-gray-300"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign up
          </Link>
        </Text>
      </div>
    </div>
  );
}
